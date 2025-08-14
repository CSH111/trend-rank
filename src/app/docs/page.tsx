'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDoc() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/docs')
      .then(res => res.json())
      .then(setSpec)
      .catch(console.error);
  }, []);

  if (!spec) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>API 문서 로딩 중...</h1>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <SwaggerUI 
        spec={spec} 
        deepLinking={true}
        displayOperationId={false}
        defaultModelExpandDepth={1}
        defaultModelsExpandDepth={1}
        displayRequestDuration={true}
      />
    </div>
  );
}