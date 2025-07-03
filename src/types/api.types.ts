// ================================
// API RESPONSE TYPES
// ================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
