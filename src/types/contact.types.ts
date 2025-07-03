// ================================
// UPDATED CONTACT TYPES - STRING LITERALS
// ================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  company: string;
  country: string;
}

export interface Contact extends ContactFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: ContactStatus;
  priority: ContactPriority;
  tags: string[];
  notes: string;
  assignedTo?: string;
  responseAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Use string literal types instead of enums for SQLite compatibility
export type ContactStatus = 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED' | 'SPAM';

export type ContactPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

// Constants for easy usage
export const ContactStatusValues = {
  NEW: 'NEW' as ContactStatus,
  IN_PROGRESS: 'IN_PROGRESS' as ContactStatus,
  RESPONDED: 'RESPONDED' as ContactStatus,
  CLOSED: 'CLOSED' as ContactStatus,
  SPAM: 'SPAM' as ContactStatus
} as const;

export const ContactPriorityValues = {
  LOW: 'LOW' as ContactPriority,
  MEDIUM: 'MEDIUM' as ContactPriority,
  HIGH: 'HIGH' as ContactPriority,
  URGENT: 'URGENT' as ContactPriority
} as const;

export interface ContactFilters {
  status?: ContactStatus;
  priority?: ContactPriority;
  country?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ContactResponse {
  contacts: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContactStats {
  total: number;
  byStatus: Record<ContactStatus, number>;
  byPriority: Record<ContactPriority, number>;
  byCountry: Record<string, number>;
  recentContacts: number;
  avgResponseTime: number;
}
