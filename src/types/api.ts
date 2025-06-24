export interface ApiError extends Error {
  statusCode?: number;
  statusText?: string;
}

export interface ApiResponse<T> {
  data: T | null; // 에러 시 data는 null일 수 있습니다.
  success: boolean;
  error?: ApiError;
}
