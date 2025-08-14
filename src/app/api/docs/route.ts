import { NextResponse } from 'next/server';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Trend Rank API',
    version: '1.0.0',
    description: '채용시장 트렌드 분석 API',
  },
  servers: [
    {
      url: 'https://devstacktrend.sungho.my',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Stack',
      description: '기술 스택 관련 API',
    },
    {
      name: 'Proxy',
      description: '프록시 API',
    },
  ],
  paths: {
    '/api/stack': {
      get: {
        summary: '기술 스택 검색',
        description: '검색어를 기반으로 기술 스택 데이터를 조회합니다.',
        tags: ['Stack'],
        parameters: [
          {
            in: 'query',
            name: 'search',
            required: true,
            schema: { type: 'string' },
            description: '검색할 기술 스택명',
            example: 'javascript',
          },
        ],
        responses: {
          '200': {
            description: '기술 스택 조회 성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      description: '기술 스택 데이터 배열',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: '필수 파라미터 누락',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'need param',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/proxy': {
      get: {
        summary: '웹 페이지 프록시',
        description: '외부 URL을 프록시하여 HTML 콘텐츠를 반환합니다.',
        tags: ['Proxy'],
        parameters: [
          {
            in: 'query',
            name: 'url',
            required: true,
            schema: { type: 'string' },
            description: '프록시할 외부 URL',
            example: 'https://example.com',
          },
        ],
        responses: {
          '200': {
            description: 'HTML 콘텐츠 반환 성공',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                  description: 'HTML 콘텐츠',
                },
              },
            },
          },
          '400': {
            description: '필수 파라미터 누락',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'URL required',
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: '프록시 요청 실패',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Failed to fetch: Network error',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(swaggerSpec);
}