import type { CaseStudy } from '../types';

const API_URL = import.meta.env.VITE_CASE_STUDIES_API_URL || '/api/case-studies';

type CaseStudyApiResponse = {
  success: boolean;
  error?: string;
  caseStudy?: CaseStudy;
  caseStudies?: CaseStudy[];
};

type UploadCaseStudyInput = {
  title: string;
  studentName: string;
  program: string;
  summary: string;
  file: File;
  attachments?: File[];
  editorEmail: string;
  editorPassword: string;
};

type EditorAuthInput = {
  editorEmail: string;
  editorPassword: string;
};

type DeleteCaseStudyInput = {
  caseStudyId: string;
  editorEmail: string;
  editorPassword: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Unable to read selected file'));
        return;
      }
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Unable to read selected file'));
    reader.readAsDataURL(file);
  });
}

export async function fetchCaseStudies(): Promise<CaseStudyApiResponse> {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to load case studies',
      };
    }
    return {
      success: true,
      caseStudies: result.caseStudies || [],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export async function uploadCaseStudy(data: UploadCaseStudyInput): Promise<CaseStudyApiResponse> {
  try {
    const base64Data = await fileToBase64(data.file);
    const encodedAttachments = await Promise.all(
      (data.attachments || []).map(async (attachment) => ({
        fileName: attachment.name,
        mimeType: attachment.type || 'application/octet-stream',
        base64Data: await fileToBase64(attachment),
      }))
    );
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'upload',
        title: data.title,
        studentName: data.studentName,
        program: data.program,
        summary: data.summary,
        fileName: data.file.name,
        mimeType: data.file.type || 'application/octet-stream',
        base64Data,
        attachments: encodedAttachments,
        editorEmail: data.editorEmail,
        editorPassword: data.editorPassword,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Upload failed',
      };
    }

    return {
      success: true,
      caseStudy: result.caseStudy,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export async function authenticateCaseStudyEditor(
  data: EditorAuthInput
): Promise<CaseStudyApiResponse> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'auth',
        editorEmail: data.editorEmail,
        editorPassword: data.editorPassword,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Authentication failed',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export async function deleteCaseStudy(data: DeleteCaseStudyInput): Promise<CaseStudyApiResponse> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'delete',
        caseStudyId: data.caseStudyId,
        editorEmail: data.editorEmail,
        editorPassword: data.editorPassword,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Delete failed',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
