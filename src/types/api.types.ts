// ================================
// src/types/api.types.ts
// ================================

// Import types from other files to avoid circular dependencies
import type { 
    Project, 
    Experience, 
    Skill, 
    PersonalInfo, 
    ContactForm, 
    Country 
  } from './portfolio.types';
  
  // HTTP methods
  export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  
  // API response wrapper
  export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
    timestamp: string;
    errors?: ApiError[];
  }
  
  // API error interface
  export interface ApiError {
    code: string;
    message: string;
    field?: string;
    details?: any;
  }
  
  // Request configuration
  export interface RequestConfig {
    headers?: Record<string, string>;
    timeout?: number;
    retries?: number;
    cache?: boolean;
  }
  
  // API client interface
  export interface ApiClient {
    get<T>(url: string, config?: RequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
    delete<T>(url: string, config?: RequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  }
  
  // Repository interfaces
  export interface PortfolioRepository {
    getProjects(): Promise<Project[]>;
    getProject(id: string): Promise<Project>;
    getExperience(): Promise<Experience[]>;
    getSkills(): Promise<Skill[]>;
    getPersonalInfo(): Promise<PersonalInfo>;
    submitContact(data: ContactForm): Promise<void>;
    getSupportedCountries?(): Country[];
    detectCountryFromPhone?(phone: string): Country | null;
  }

  // validation interfaces
  export interface ContactValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
    formattedData?: ContactForm;
    countryInfo?: Country;
  }
  
  export interface CacheRepository {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
  }
  
  // Service interfaces
  export interface EmailService {
    sendContactEmail(data: ContactForm): Promise<boolean>;
    sendWelcomeEmail(email: string): Promise<boolean>;
  }
  
  export interface AnalyticsService {
    trackEvent(event: string, data?: any): void;
    trackPageView(page: string): void;
    trackError(error: Error): void;
    trackContactSubmission(country?: string): void;
  }
  
  // Authentication (for admin features)
  export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    country?: string;
  }
  
  export type UserRole = 'admin' | 'user' | 'guest';
  
  export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  // File upload
  export interface FileUpload {
    file: File;
    progress: number;
    status: UploadStatus;
    url?: string;
    error?: string;
  }
  
  export type UploadStatus = 
    | 'pending' 
    | 'uploading' 
    | 'success' 
    | 'error' 
    | 'cancelled';
  
  // Pagination
  export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: Record<string, any>;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }
  
  // Search functionality
  export interface SearchParams {
    query: string;
    category?: string;
    tags?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  }
  
  export interface SearchResult<T> {
    items: T[];
    total: number;
    query: string;
    suggestions?: string[];
  }
  