import { TMDB_BASE_URL } from "@/constant";

interface ApiError extends Error {
  statusCode?: number;
  statusText?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: ApiError;
}

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

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
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
        
        console.error('❌ API Error:', { url, status: response.status, statusText: response.statusText });
        
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
      
      const apiError: ApiError = error instanceof Error 
        ? error as ApiError 
        : new Error('Network error') as ApiError;
      
      return {
        data: null as T,
        success: false,
        error: apiError,
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T, U = unknown>(
    endpoint: string,
    body?: U
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

// TMDB API 클라이언트 인스턴스
export const tmdbClient = new ApiClient(TMDB_BASE_URL, {
  Authorization: `Bearer blahblahblah access token`,
}); 