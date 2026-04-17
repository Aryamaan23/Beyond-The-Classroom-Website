import { useState } from 'react';

interface ImageDebuggerProps {
  fileId: string;
  originalUrl: string;
}

export function ImageDebugger({ fileId, originalUrl }: ImageDebuggerProps) {
  const [testResults, setTestResults] = useState<Record<string, 'loading' | 'success' | 'error'>>({});

  const testUrls = [
    {
      name: 'Our Image Proxy',
      url: `/api/image-proxy?url=${encodeURIComponent(`https://lh3.googleusercontent.com/d/${fileId}=w400-h400-c`)}`
    },
    {
      name: 'Original URL',
      url: originalUrl
    },
    {
      name: 'AllOrigins Proxy',
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://lh3.googleusercontent.com/d/${fileId}=w400-h400-c`)}`
    },
    {
      name: 'Direct Google CDN',
      url: `https://lh3.googleusercontent.com/d/${fileId}=w400-h400-c`
    },
    {
      name: 'Google Drive Export',
      url: `https://drive.google.com/uc?export=view&id=${fileId}`
    },
    {
      name: 'Google Drive UC',
      url: `https://drive.google.com/uc?id=${fileId}`
    }
  ];

  const testImage = (name: string, url: string) => {
    setTestResults(prev => ({ ...prev, [name]: 'loading' }));
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    
    img.onload = () => {
      setTestResults(prev => ({ ...prev, [name]: 'success' }));
      console.log(`✅ ${name} loaded successfully: ${url}`);
    };
    
    img.onerror = () => {
      setTestResults(prev => ({ ...prev, [name]: 'error' }));
      console.log(`❌ ${name} failed to load: ${url}`);
    };
    
    img.src = url;
  };

  const testAllUrls = () => {
    testUrls.forEach(({ name, url }) => {
      testImage(name, url);
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg text-xs">
      <h4 className="font-bold mb-2">Image Debug Info (File ID: {fileId})</h4>
      <button 
        onClick={testAllUrls}
        className="bg-blue-500 text-white px-2 py-1 rounded text-xs mb-2"
      >
        Test All URLs
      </button>
      
      <div className="space-y-1">
        {testUrls.map(({ name, url }) => (
          <div key={name} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              testResults[name] === 'success' ? 'bg-green-500' :
              testResults[name] === 'error' ? 'bg-red-500' :
              testResults[name] === 'loading' ? 'bg-yellow-500' :
              'bg-gray-300'
            }`}></span>
            <span className="font-mono text-xs">{name}</span>
          </div>
        ))}
      </div>
      
      <details className="mt-2">
        <summary className="cursor-pointer text-xs">Show URLs</summary>
        <div className="mt-1 space-y-1">
          {testUrls.map(({ name, url }) => (
            <div key={name} className="text-xs">
              <strong>{name}:</strong>
              <br />
              <code className="bg-white p-1 rounded text-xs break-all">{url}</code>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}