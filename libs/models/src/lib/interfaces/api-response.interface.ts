export interface ApiResponse<T> {
  code?: number;
  message?: string;
  error?: string;
  data?: T;
}
