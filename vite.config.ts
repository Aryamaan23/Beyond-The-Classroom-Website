import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better development experience
      fastRefresh: true,
    }),
    // Mock API plugin for development
    {
      name: 'mock-api',
      configureServer(server) {
        const mockStoredFiles: Record<string, { fileName: string; mimeType: string; base64Data: string }> = {};
        const mockStoredAttachments: Record<
          string,
          { caseStudyId: string; fileName: string; mimeType: string; base64Data: string }
        > = {};

        const mockCaseStudies = [
          {
            id: 'case-1',
            title: 'Dholpur field governance observations',
            studentName: 'Sample Student',
            program: 'Dholpur District Immersion Plan',
            summary:
              'Initial report capturing observations from block-level institutions and recommendations for youth participation in district planning.',
            submittedAt: new Date().toISOString(),
            fileId: 'mock-file-1',
            fileUrl: '/api/case-studies?action=download&caseStudyId=case-1',
            fileName: 'dholpur-sample-report.pdf',
            attachments: [
              {
                id: 'mock-attachment-1',
                name: 'dholpur-field-photos.zip',
                url: '/api/case-studies?action=download&caseStudyId=case-1&attachmentId=mock-attachment-1',
                mimeType: 'application/zip',
              },
            ],
          },
        ];
        const mockEditors = [
          { username: 'AryamaanED@BTC', password: 'ED@1234567890$%#' },
          { username: 'HarsimranMD@BTC', password: 'MD@1234567890$%#' },
        ];

        server.middlewares.use('/api/contact', async (req, res) => {
          // Handle CORS
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
            return;
          }

          // Parse request body
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const data = JSON.parse(body);

              const errors = [];

              if (data.purpose === 'newsletter') {
                if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email).trim())) {
                  errors.push('Invalid email format');
                }
                if (
                  data.name != null &&
                  typeof data.name === 'string' &&
                  data.name.trim().length > 0 &&
                  data.name.trim().length < 2
                ) {
                  errors.push('Name must be at least 2 characters if provided');
                }
                if (typeof data.name === 'string' && data.name.length > 120) {
                  errors.push('Name is too long');
                }
              } else {
                if (!data.name || data.name.trim().length < 2) {
                  errors.push('Name must be at least 2 characters');
                }
                if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                  errors.push('Invalid email format');
                }
                if (!data.message || data.message.trim().length < 10) {
                  errors.push('Message must be at least 10 characters');
                }
              }

              if (errors.length > 0) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Validation failed', errors }));
                return;
              }

              if (data.purpose === 'newsletter') {
                console.log('\n📧 ===== Newsletter signup =====');
                console.log('Email:', data.email);
                console.log('Name:', data.name?.trim() || '(not provided)');
                console.log('Time:', new Date().toISOString());
                console.log('===============================\n');
              } else {
                console.log('\n📧 ===== Contact Form Submission =====');
                console.log('From:', data.name, `<${data.email}>`);
                console.log('Time:', new Date().toISOString());
                console.log('Message:', data.message);
                console.log('=====================================\n');
              }

              // Simulate async operation
              await new Promise((resolve) => setTimeout(resolve, 500));

              // Success response
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message:
                    data.purpose === 'newsletter'
                      ? 'You are subscribed. We will be in touch soon.'
                      : 'Your message has been sent successfully',
                  messageId: `dev_msg_${Date.now()}`,
                })
              );
            } catch (error) {
              console.error('Contact form error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Internal server error' }));
            }
          });
        });

        server.middlewares.use('/api/case-studies', async (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          if (req.method === 'GET') {
            const rawUrl = req.url || '';
            const incoming = new URL(rawUrl, 'http://localhost:5173');
            if (incoming.searchParams.get('action') === 'download') {
              const caseStudyId = incoming.searchParams.get('caseStudyId') || 'case-study';
              const attachmentId = incoming.searchParams.get('attachmentId');
              if (attachmentId) {
                const storedAttachment = mockStoredAttachments[attachmentId];
                if (!storedAttachment || storedAttachment.caseStudyId !== caseStudyId) {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Attachment not found in mock storage' }));
                  return;
                }

                const attachmentBuffer = Buffer.from(storedAttachment.base64Data, 'base64');
                res.statusCode = 200;
                res.setHeader('Content-Type', storedAttachment.mimeType || 'application/octet-stream');
                res.setHeader(
                  'Content-Disposition',
                  `attachment; filename="${storedAttachment.fileName.replace(/"/g, '')}"`
                );
                res.end(attachmentBuffer);
                return;
              }

              const storedFile = mockStoredFiles[caseStudyId];
              if (!storedFile) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Case study file not found in mock storage' }));
                return;
              }

              const caseStudyBuffer = Buffer.from(storedFile.base64Data, 'base64');
              res.statusCode = 200;
              res.setHeader('Content-Type', storedFile.mimeType || 'application/octet-stream');
              res.setHeader('Content-Disposition', `attachment; filename="${storedFile.fileName.replace(/"/g, '')}"`);
              res.end(caseStudyBuffer);
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, caseStudies: mockCaseStudies }));
            return;
          }

          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
            return;
          }

          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const isEditor = mockEditors.some(
                (editor) =>
                  editor.username === String(data.editorEmail || '').trim() &&
                  editor.password === String(data.editorPassword || '')
              );

              if (data.action === 'auth') {
                if (!isEditor) {
                  res.statusCode = 401;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Invalid editor credentials' }));
                  return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
                return;
              }

              if (data.action === 'delete') {
                const caseStudyId = String(data.caseStudyId || '').trim();
                if (!caseStudyId) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Missing caseStudyId for delete' }));
                  return;
                }

                const index = mockCaseStudies.findIndex((item) => item.id === caseStudyId);
                if (index === -1) {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Case study not found' }));
                  return;
                }

                mockCaseStudies.splice(index, 1);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
                return;
              }

              if (!isEditor) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Only authorized editors can upload case studies' }));
                return;
              }

              const requiredFields = ['title', 'studentName', 'program', 'summary', 'fileName', 'base64Data'];
              const missing = requiredFields.find((field) => !data[field] || !String(data[field]).trim());
              if (missing) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: `Missing required field: ${missing}` }));
                return;
              }

              await new Promise((resolve) => setTimeout(resolve, 500));

              const id = `case-${Date.now()}`;
              const created = {
                id,
                title: data.title.trim(),
                studentName: data.studentName.trim(),
                program: data.program.trim(),
                summary: data.summary.trim(),
                submittedAt: new Date().toISOString(),
                fileId: `mock-${id}`,
                fileUrl: `/api/case-studies?action=download&caseStudyId=${id}`,
                fileName: data.fileName.trim(),
                attachments: Array.isArray(data.attachments)
                  ? data.attachments
                      .filter((item) => item?.fileName && item?.base64Data)
                      .map((item, index) => ({
                        id: `mock-att-${id}-${index + 1}`,
                        name: String(item.fileName).trim(),
                        url: `/api/case-studies?action=download&caseStudyId=${id}&attachmentId=mock-att-${id}-${index + 1}`,
                        mimeType: String(item.mimeType || 'application/octet-stream'),
                      }))
                  : [],
              };

              mockStoredFiles[id] = {
                fileName: data.fileName.trim(),
                mimeType: String(data.mimeType || 'application/octet-stream'),
                base64Data: String(data.base64Data || ''),
              };

              if (Array.isArray(data.attachments)) {
                data.attachments.forEach((item, index) => {
                  if (!item?.fileName || !item?.base64Data) return;
                  const attachmentId = `mock-att-${id}-${index + 1}`;
                  mockStoredAttachments[attachmentId] = {
                    caseStudyId: id,
                    fileName: String(item.fileName).trim(),
                    mimeType: String(item.mimeType || 'application/octet-stream'),
                    base64Data: String(item.base64Data || ''),
                  };
                });
              }

              mockCaseStudies.unshift(created);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, caseStudy: created }));
            } catch (error) {
              console.error('Case studies mock API error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Internal server error' }));
            }
          });
        });
      },
    },
  ],
  build: {
    // Optimize bundle size
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})
