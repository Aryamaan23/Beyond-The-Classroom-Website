import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Readable } from 'node:stream';
import { readFileSync } from 'node:fs';

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
};

const DRIVE_FOLDER_ID = process.env.CASE_STUDIES_DRIVE_FOLDER_ID || '15weJWQB_XV1E8taXq9K8r07KEF-AabS1';
const LOCAL_KEY_FILE =
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE ||
  '/Users/rashikapandey/Downloads/hip-polymer-453117-d8-b0931aa8a1dc.json';
const DEFAULT_EDITOR_CREDENTIALS = [
  { username: 'AryamaanED@BTC', password: 'ED@1234567890$%#' },
  { username: 'HarsimranMD@BTC', password: 'MD@1234567890$%#' },
];

function json(res: VercelResponse, status: number, payload: unknown) {
  res.status(status).setHeader('Content-Type', 'application/json');
  return res.send(payload);
}

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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

async function getDriveClient() {
  const env = requiredEnv();
  if (!env) return null;

  const { google } = await import('googleapis');
  const auth = new google.auth.JWT({
    email: env.clientEmail,
    key: env.privateKey,
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

function getEditorCredentials() {
  const configured = process.env.CASE_STUDY_EDITORS_JSON;
  if (!configured) return DEFAULT_EDITOR_CREDENTIALS;
  try {
    const parsed = JSON.parse(configured) as Array<{ username: string; password: string }>;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // Fall back to default credentials
  }
  return DEFAULT_EDITOR_CREDENTIALS;
}

function validateEditor(editorEmail?: string, editorPassword?: string): boolean {
  if (!editorEmail || !editorPassword) return false;
  const allowed = getEditorCredentials();
  return allowed.some(
    (editor) => editor.username === editorEmail.trim() && editor.password === editorPassword
  );
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
      if (data?.id && data?.title && data?.fileUrl) {
        records.push(data);
      }
    } catch {
      // Skip malformed metadata files.
    }
  }

  return records.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const drive = await getDriveClient();
  if (!drive) {
    return json(res, 500, {
      success: false,
      error:
        'Google Drive credentials are not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.',
    });
  }

  if (req.method === 'GET') {
    try {
      const caseStudies = await listCaseStudies(drive);
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

    const {
      title,
      studentName,
      program,
      summary,
      fileName,
      mimeType,
      base64Data,
    } = body as Record<string, string>;

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

    const fileId = uploaded.data.id as string;
    const nowIso = new Date().toISOString();
    const id = `case-${Date.now()}`;

    try {
      await drive.permissions.create({
        fileId,
        supportsAllDrives: true,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
    } catch {
      // If permission fails, file remains in Drive for internal access.
    }

    const caseStudy: CaseStudyRecord = {
      id,
      title: title.trim(),
      studentName: studentName.trim(),
      program: program.trim(),
      summary: summary.trim(),
      submittedAt: nowIso,
      fileId,
      fileUrl: `https://drive.google.com/file/d/${fileId}/view`,
      fileName: fileName.trim(),
    };

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

    return json(res, 200, { success: true, caseStudy });
  } catch (error) {
    return json(res, 500, {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload case study',
    });
  }
}
