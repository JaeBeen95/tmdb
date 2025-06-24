import type { ApiError, ApiResponse } from '@/types/api';

type QueryParamValue = string | number | boolean | null | undefined;

// 쿼리 스트링 빌더 유틸
const buildQuery = (params?: Record<string, QueryParamValue>) => {
  if (!params) return '';

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      console.log('🚀 API Request:', { url, method: options.method || 'GET' });

      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error: ApiError = new Error(`API Error: ${response.status}`) as ApiError;
        error.statusCode = response.status;
        error.statusText = response.statusText;

        console.error('❌ API Error:', {
          url,
          status: response.status,
          statusText: response.statusText,
        });

        return {
          data: null as T,
          success: false,
          error,
        };
      }

      const data: T = await response.json();
      console.log('✅ API Success:', { url, dataKeys: Object.keys(data as object) });

      return {
        data,
        success: true,
      };
    } catch (error) {
      console.error('💥 API Network Error:', { url, error });

      const apiError: ApiError =
        error instanceof Error ? (error as ApiError) : (new Error('Network error') as ApiError);

      return {
        data: null as T,
        success: false,
        error: apiError,
      };
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, QueryParamValue>
  ): Promise<ApiResponse<T>> {
    const queryString = buildQuery(params);
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  async post<T, U = unknown>(endpoint: string, body?: U): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

// TMDB API 클라이언트 인스턴스
const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;

if (!baseUrl || !accessToken) {
  throw new Error('VITE_BASE_URL 또는 VITE_API_ACCESS_TOKEN이 .env 파일에 설정되지 않았습니다.');
}

export const tmdbClient = new ApiClient(baseUrl, {
  Authorization: `Bearer ${accessToken}`,
});
