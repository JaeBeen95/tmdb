export interface ApiError extends Error {
  statusCode?: number;
  statusText?: string;
}

export interface ApiResponse<T> {
  data: T | null; 
  success: boolean;
  error?: ApiError;
}
