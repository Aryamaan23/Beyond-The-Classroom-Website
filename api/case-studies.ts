import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Readable } from 'node:stream';
import { readFileSync } from 'node:fs';
import { scryptSync, timingSafeEqual } from 'node:crypto';

type CaseStudyRecord = {
  id: string;
  title: string;
  studentName: string;
  program: string;
  summary: string;
  submittedAt: string;
  fileId: string;
  fileUrl: string;
  fileName: string;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    mimeType: string;
  }>;
};

type CaseStudyMetaFile = {
  id: string;
  name?: string;
  createdTime?: string;
};

type InMemoryStoredFile = {
  id: string;
  name: string;
  mimeType: string;
  data: Buffer;
};

const DRIVE_FOLDER_ID = process.env.CASE_STUDIES_DRIVE_FOLDER_ID || '15weJWQB_XV1E8taXq9K8r07KEF-AabS1';
const LOCAL_KEY_FILE =
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE ||
  '/Users/rashikapandey/Downloads/hip-polymer-453117-d8-b0931aa8a1dc.json';
type EditorCredential = {
  usernameHash: string;
  usernameSalt: string;
  passwordHash: string;
  passwordSalt: string;
};

const DEFAULT_EDITOR_CREDENTIALS: EditorCredential[] = [
  {
    usernameSalt: 'fba58489ec946936f8147f0f45b4ed1d',
    usernameHash:
      'e1f9bfbbf9750a43c4e64ca9f7fa7cf7bbcf97e1363e185ba1b48154c28e80f309a107aedbc067be376dfd128e878b26f242941139e1ad9aa0e066694c7bc4d7',
    passwordSalt: '099458992a80ea7f585939452705ffc2',
    passwordHash:
      '9cbb420aad84fd1c75549584a982d5c04c776ed67e6dee50ac2db7c08f208add02489da120d94d6e13e24948a3fa02f069f9b4f837698171bed8cf04008706a1',
  },
  {
    usernameSalt: 'c8f8f8f0ba53e5adf7f9d5f9daf3b8c2',
    usernameHash:
      '34867ca540fbd2a42a8bc8ea60990a2f7dbd167fe97276a376bdc92fac7a56221e2193c76adb96700cd0eaaff24cfcb43c8809e6fa89044ffa5e123fb12d198d',
    passwordSalt: '2974d82c60d96087c3b4dd5bddd71a95',
    passwordHash:
      '735258d1b3312e5dabada4624c05d3179086ee797543655bfeefd132f8a9c861975b5d1fa5bf0a25b60d63a22eb5938a097817489dc248fa76dfd0e815cff6c6',
  },
];

const inMemoryCaseStudies: CaseStudyRecord[] = [];
const inMemoryFiles = new Map<string, InMemoryStoredFile>();

function json(res: VercelResponse, status: number, payload: unknown) {
  res.status(status).setHeader('Content-Type', 'application/json');
  return res.send(payload);
}

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function makeDownloadUrl(caseStudyId: string, attachmentId?: string): string {
  if (attachmentId) {
    return `/api/case-studies?action=download&caseStudyId=${encodeURIComponent(
      caseStudyId
    )}&attachmentId=${encodeURIComponent(attachmentId)}`;
  }
  return `/api/case-studies?action=download&caseStudyId=${encodeURIComponent(caseStudyId)}`;
}

function requiredEnv() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (clientEmail && privateKeyRaw) {
    return {
      clientEmail,
      privateKey: privateKeyRaw.replace(/\\n/g, '\n'),
    };
  }

  // Local development fallback: read a service-account JSON file directly.
  if (process.env.NODE_ENV !== 'production') {
    try {
      const raw = readFileSync(LOCAL_KEY_FILE, 'utf8');
      const keyJson = JSON.parse(raw) as { client_email?: string; private_key?: string };
      if (keyJson.client_email && keyJson.private_key) {
        return {
          clientEmail: keyJson.client_email,
          privateKey: keyJson.private_key,
        };
      }
    } catch {
      // Ignore fallback errors and return null below.
    }
  }

  return null;
}

type OAuthDriveConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

function oauthEnv(): OAuthDriveConfig | null {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  return { clientId, clientSecret, refreshToken };
}

async function getDriveClient() {
  const { google } = await import('googleapis');
  const oauth = oauthEnv();
  if (oauth) {
    const auth = new google.auth.OAuth2({
      clientId: oauth.clientId,
      clientSecret: oauth.clientSecret,
    });
    auth.setCredentials({ refresh_token: oauth.refreshToken });
    return google.drive({ version: 'v3', auth });
  }

  const serviceAccount = requiredEnv();
  if (!serviceAccount) return null;

  const auth = new google.auth.JWT({
    email: serviceAccount.clientEmail,
    key: serviceAccount.privateKey,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  return google.drive({ version: 'v3', auth });
}

function normalizeBody(req: VercelRequest): any {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body || {};
}

function toHashedCredential(item: { username: string; password?: string; passwordHash?: string; salt?: string }): EditorCredential | null {
  if (!item.username) return null;
  if (item.passwordHash && item.salt) {
    const usernameSalt = scryptSync(item.username.toLowerCase(), 'editor-username-salt', 16).toString('hex');
    const usernameHash = scryptSync(item.username.trim().toLowerCase(), usernameSalt, 64).toString('hex');
    return {
      usernameSalt,
      usernameHash,
      passwordHash: item.passwordHash,
      passwordSalt: item.salt,
    };
  }
  if (item.password) {
    const usernameSalt = scryptSync(item.username.toLowerCase(), 'editor-username-salt', 16).toString('hex');
    const usernameHash = scryptSync(item.username.trim().toLowerCase(), usernameSalt, 64).toString('hex');
    const passwordSalt = scryptSync(item.username.toLowerCase(), 'editor-credential-salt', 16).toString('hex');
    const passwordHash = scryptSync(item.password, passwordSalt, 64).toString('hex');
    return {
      usernameSalt,
      usernameHash,
      passwordHash,
      passwordSalt,
    };
  }
  return null;
}

function getEditorCredentials(): EditorCredential[] {
  const configured = process.env.CASE_STUDY_EDITORS_JSON;
  if (!configured) return DEFAULT_EDITOR_CREDENTIALS;
  try {
    const parsed = JSON.parse(configured) as Array<{
      username: string;
      password?: string;
      passwordHash?: string;
      salt?: string;
    }>;
    if (Array.isArray(parsed) && parsed.length > 0) {
      const normalized = parsed
        .map((item) => toHashedCredential(item))
        .filter((item): item is EditorCredential => item !== null);
      if (normalized.length > 0) return normalized;
    }
  } catch {
    // Fall back to default credentials
  }
  return DEFAULT_EDITOR_CREDENTIALS;
}

function safePasswordMatch(password: string, credential: EditorCredential): boolean {
  const computedHash = scryptSync(password, credential.passwordSalt, 64).toString('hex');
  const computedBuffer = Buffer.from(computedHash, 'hex');
  const expectedBuffer = Buffer.from(credential.passwordHash, 'hex');
  if (computedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(computedBuffer, expectedBuffer);
}

function safeUsernameMatch(username: string, credential: EditorCredential): boolean {
  const normalized = username.trim().toLowerCase();
  const computedHash = scryptSync(normalized, credential.usernameSalt, 64).toString('hex');
  const computedBuffer = Buffer.from(computedHash, 'hex');
  const expectedBuffer = Buffer.from(credential.usernameHash, 'hex');
  if (computedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(computedBuffer, expectedBuffer);
}

function validateEditor(editorEmail?: string, editorPassword?: string): boolean {
  if (!editorEmail || !editorPassword) return false;
  const allowed = getEditorCredentials();
  return allowed.some((editor) => safeUsernameMatch(editorEmail, editor) && safePasswordMatch(editorPassword, editor));
}

async function listCaseStudies(drive: any): Promise<CaseStudyRecord[]> {
  const list = await drive.files.list({
    q: `'${DRIVE_FOLDER_ID}' in parents and mimeType = 'application/json' and name contains 'case-study-meta-' and trashed = false`,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: 'files(id,name,createdTime)',
    pageSize: 200,
    orderBy: 'createdTime desc',
  });

  const files = list.data.files || [];
  const records: CaseStudyRecord[] = [];

  for (const file of files) {
    try {
      const response = await drive.files.get(
        {
          fileId: file.id,
          alt: 'media',
          supportsAllDrives: true,
        },
        { responseType: 'json' }
      );
      const data = response.data as CaseStudyRecord;
      if (data?.id && data?.title && data?.fileId) {
        const attachments = Array.isArray(data.attachments) ? data.attachments : [];
        records.push({
          ...data,
          fileUrl: makeDownloadUrl(data.id),
          attachments: attachments.map((attachment) => ({
            ...attachment,
            url: makeDownloadUrl(data.id, attachment.id),
          })),
        });
      }
    } catch {
      // Skip malformed metadata files.
    }
  }

  return records.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

async function listMetaFiles(drive: any): Promise<CaseStudyMetaFile[]> {
  const list = await drive.files.list({
    q: `'${DRIVE_FOLDER_ID}' in parents and mimeType = 'application/json' and name contains 'case-study-meta-' and trashed = false`,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: 'files(id,name,createdTime)',
    pageSize: 200,
    orderBy: 'createdTime desc',
  });
  return (list.data.files || []) as CaseStudyMetaFile[];
}

async function findCaseStudyAndMeta(drive: any, caseStudyId: string): Promise<{ caseStudy: CaseStudyRecord; metaFileId: string } | null> {
  const metaFiles = await listMetaFiles(drive);
  for (const metaFile of metaFiles) {
    if (!metaFile.id) continue;
    try {
      const response = await drive.files.get(
        {
          fileId: metaFile.id,
          alt: 'media',
          supportsAllDrives: true,
        },
        { responseType: 'json' }
      );
      const data = response.data as CaseStudyRecord;
      if (data?.id === caseStudyId) {
        return { caseStudy: data, metaFileId: metaFile.id };
      }
    } catch {
      // Skip malformed metadata file
    }
  }
  return null;
}

function findInMemoryCaseStudy(caseStudyId: string): CaseStudyRecord | null {
  return inMemoryCaseStudies.find((item) => item.id === caseStudyId) || null;
}

function inMemoryDownload(res: VercelResponse, file: InMemoryStoredFile) {
  res.status(200);
  res.setHeader('Content-Type', file.mimeType || 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${file.name.replace(/"/g, '')}"`);
  return res.send(file.data);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const drive = await getDriveClient();
  const useInMemoryFallback = !drive;

  if (req.method === 'GET') {
    try {
      if (req.query.action === 'download') {
        const caseStudyId = String(req.query.caseStudyId || '').trim();
        const attachmentId = String(req.query.attachmentId || '').trim();
        if (!caseStudyId) {
          return json(res, 400, { success: false, error: 'Missing caseStudyId' });
        }

        if (useInMemoryFallback) {
          const caseStudy = findInMemoryCaseStudy(caseStudyId);
          if (!caseStudy) return json(res, 404, { success: false, error: 'Case study not found' });
          const attachments = Array.isArray(caseStudy.attachments) ? caseStudy.attachments : [];
          const targetAttachment = attachmentId ? attachments.find((item) => item.id === attachmentId) : null;
          const targetFileId = targetAttachment ? targetAttachment.id : caseStudy.fileId;
          const targetFile = inMemoryFiles.get(targetFileId);
          if (!targetFile) return json(res, 404, { success: false, error: 'File not found' });
          return inMemoryDownload(res, targetFile);
        } else {
          const matched = await findCaseStudyAndMeta(drive, caseStudyId);
          if (!matched) {
            return json(res, 404, { success: false, error: 'Case study not found' });
          }

          const { caseStudy } = matched;
          const attachments = Array.isArray(caseStudy.attachments) ? caseStudy.attachments : [];
          const targetAttachment = attachmentId ? attachments.find((item) => item.id === attachmentId) : null;

          const targetFileId = targetAttachment ? targetAttachment.id : caseStudy.fileId;
          const downloadName = targetAttachment?.name || caseStudy.fileName || 'case-study-file';

          const fileStreamResponse = await drive.files.get(
            {
              fileId: targetFileId,
              alt: 'media',
              supportsAllDrives: true,
            },
            { responseType: 'stream' }
          );

          res.status(200);
          res.setHeader('Content-Type', 'application/octet-stream');
          res.setHeader('Content-Disposition', `attachment; filename="${downloadName.replace(/"/g, '')}"`);
          fileStreamResponse.data.pipe(res);
          return;
        }
      }

      const caseStudies = useInMemoryFallback ? inMemoryCaseStudies : await listCaseStudies(drive);
      return json(res, 200, { success: true, caseStudies });
    } catch (error) {
      return json(res, 500, {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load case studies',
      });
    }
  }

  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: 'Method not allowed' });
  }

  try {
    const body = normalizeBody(req);
    const { action, editorEmail, editorPassword } = body as Record<string, string>;

    if (action === 'auth') {
      if (!validateEditor(editorEmail, editorPassword)) {
        return json(res, 401, {
          success: false,
          error: 'Invalid editor credentials',
        });
      }
      return json(res, 200, {
        success: true,
      });
    }

    if (!validateEditor(editorEmail, editorPassword)) {
      return json(res, 401, {
        success: false,
        error: 'Only authorized editors can upload case studies',
      });
    }

    if (action === 'delete') {
      const caseStudyId = String((body as any).caseStudyId || '').trim();
      if (!caseStudyId) {
        return json(res, 400, { success: false, error: 'Missing caseStudyId for delete' });
      }

      if (useInMemoryFallback) {
        const index = inMemoryCaseStudies.findIndex((item) => item.id === caseStudyId);
        if (index === -1) {
          return json(res, 404, { success: false, error: 'Case study not found' });
        }
        const existing = inMemoryCaseStudies[index];
        const attachments = Array.isArray(existing.attachments) ? existing.attachments : [];
        inMemoryFiles.delete(existing.fileId);
        attachments.forEach((item) => inMemoryFiles.delete(item.id));
        inMemoryCaseStudies.splice(index, 1);
      } else {
        const matched = await findCaseStudyAndMeta(drive, caseStudyId);
        if (!matched) {
          return json(res, 404, { success: false, error: 'Case study not found' });
        }

        const attachments = Array.isArray(matched.caseStudy.attachments) ? matched.caseStudy.attachments : [];
        const filesToDelete = [matched.caseStudy.fileId, ...attachments.map((item) => item.id), matched.metaFileId];

        for (const fileId of filesToDelete) {
          if (!fileId) continue;
          try {
            await drive.files.delete({
              fileId,
              supportsAllDrives: true,
            });
          } catch {
            // Continue deleting remaining files.
          }
        }
      }

      return json(res, 200, { success: true });
    }

    const {
      title,
      studentName,
      program,
      summary,
      fileName,
      mimeType,
      base64Data,
      attachments = [],
    } = body as any;

    if (!title || !studentName || !program || !summary || !fileName || !mimeType || !base64Data) {
      return json(res, 400, { success: false, error: 'Missing required fields for case study upload' });
    }

    if (summary.trim().length < 20) {
      return json(res, 400, { success: false, error: 'Summary should be at least 20 characters' });
    }

    const binary = Buffer.from(base64Data, 'base64');
    if (!binary.length) {
      return json(res, 400, { success: false, error: 'Uploaded file is empty or invalid' });
    }

    const nowIso = new Date().toISOString();
    const id = `case-${Date.now()}`;
    const fileId = `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    let persistedFileId = fileId;
    if (useInMemoryFallback) {
      inMemoryFiles.set(fileId, {
        id: fileId,
        name: fileName.trim(),
        mimeType: mimeType || 'application/octet-stream',
        data: binary,
      });
    } else {
      const uploadName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const uploaded = await drive.files.create({
        requestBody: {
          name: uploadName,
          parents: [DRIVE_FOLDER_ID],
        },
        supportsAllDrives: true,
        media: {
          mimeType,
          body: Readable.from(binary),
        },
        fields: 'id,name',
      });
      persistedFileId = uploaded.data.id as string;
      try {
        await drive.permissions.create({
          fileId: persistedFileId,
          supportsAllDrives: true,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          },
        });
      } catch {
        // If permission fails, file remains in Drive for internal access.
      }
    }

    const caseStudy: CaseStudyRecord = {
      id,
      title: title.trim(),
      studentName: studentName.trim(),
      program: program.trim(),
      summary: summary.trim(),
      submittedAt: nowIso,
      fileId: persistedFileId,
      fileUrl: makeDownloadUrl(id),
      fileName: fileName.trim(),
      attachments: [],
    };

    const normalizedAttachments = Array.isArray(attachments)
      ? attachments
          .map((item: any) => ({
            fileName: String(item?.fileName || '').trim(),
            mimeType: String(item?.mimeType || 'application/octet-stream').trim(),
            base64Data: String(item?.base64Data || '').trim(),
          }))
          .filter((item) => item.fileName && item.base64Data)
      : [];

    for (const attachment of normalizedAttachments) {
      const attachmentBinary = Buffer.from(attachment.base64Data, 'base64');
      if (!attachmentBinary.length) continue;

      let attachmentId = `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      if (useInMemoryFallback) {
        inMemoryFiles.set(attachmentId, {
          id: attachmentId,
          name: attachment.fileName,
          mimeType: attachment.mimeType || 'application/octet-stream',
          data: attachmentBinary,
        });
      } else {
        const attachmentName = `${Date.now()}-${attachment.fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const uploadedAttachment = await drive.files.create({
          requestBody: {
            name: attachmentName,
            parents: [DRIVE_FOLDER_ID],
          },
          supportsAllDrives: true,
          media: {
            mimeType: attachment.mimeType,
            body: Readable.from(attachmentBinary),
          },
          fields: 'id,name',
        });
        attachmentId = uploadedAttachment.data.id as string;
        try {
          await drive.permissions.create({
            fileId: attachmentId,
            supportsAllDrives: true,
            requestBody: {
              role: 'reader',
              type: 'anyone',
            },
          });
        } catch {
          // Keep attachments private if permission update fails.
        }
      }

      caseStudy.attachments?.push({
        id: attachmentId,
        name: attachment.fileName,
        url: makeDownloadUrl(id, attachmentId),
        mimeType: attachment.mimeType,
      });
    }

    if (useInMemoryFallback) {
      inMemoryCaseStudies.unshift(caseStudy);
    } else {
      await drive.files.create({
        requestBody: {
          name: `case-study-meta-${id}.json`,
          parents: [DRIVE_FOLDER_ID],
          mimeType: 'application/json',
        },
        supportsAllDrives: true,
        media: {
          mimeType: 'application/json',
          body: JSON.stringify(caseStudy),
        },
      });
    }

    return json(res, 200, { success: true, caseStudy });
  } catch (error) {
    return json(res, 500, {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload case study',
    });
  }
}
