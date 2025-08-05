// ================================
// COMPLETE CORRECTED FILES BELOW:
// ================================

// ================================
// CORRECTED: src/services/api/contactService.ts
// ================================

import { HttpClient } from './httpClient';

// Types matching backend
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
  createdAt: string;
  updatedAt: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED' | 'SPAM';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  tags: string[];
  notes: string;
  assignedTo?: string;
  responseAt?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContactFilters {
  status?: string;
  priority?: string;
  country?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
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
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byCountry: Record<string, number>;
  recentContacts: number;
  avgResponseTime: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export class ContactService {
  private httpClient: HttpClient;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') {
    this.httpClient = new HttpClient(baseURL);
  }

  async submitContact(contactData: ContactFormData): Promise<Contact> {
    try {
      const response = await this.httpClient.post<ApiResponse<Contact>>(
        '/api/contacts',
        contactData
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to submit contact');
      }

      return response.data;
    } catch (error) {
      console.error('Contact submission failed:', error);
      throw error;
    }
  }

  async getContacts(filters?: ContactFilters): Promise<ContactResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
          }
        });
      }

      const queryString = params.toString();
      const url = queryString ? `/api/contacts?${queryString}` : '/api/contacts';

      const response = await this.httpClient.get<ApiResponse<ContactResponse>>(url);

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch contacts');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      throw error;
    }
  }

  async getContactById(id: string): Promise<Contact> {
    try {
      const response = await this.httpClient.get<ApiResponse<Contact>>(
        `/api/contacts/${id}`
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Contact not found');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to fetch contact:', error);
      throw error;
    }
  }

  async updateContactStatus(id: string, status: string): Promise<Contact> {
    try {
      const response = await this.httpClient.patch<ApiResponse<Contact>>(
        `/api/contacts/${id}/status`,
        { status }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to update status');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to update contact status:', error);
      throw error;
    }
  }

  async addContactNote(id: string, note: string): Promise<Contact> {
    try {
      const response = await this.httpClient.post<ApiResponse<Contact>>(
        `/api/contacts/${id}/notes`,
        { note }
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to add note');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to add note:', error);
      throw error;
    }
  }

  async deleteContact(id: string): Promise<void> {
    try {
      const response = await this.httpClient.delete<ApiResponse>(
        `/api/contacts/${id}`
      );

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete contact');
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
      throw error;
    }
  }

  async getContactStats(): Promise<ContactStats> {
    try {
      const response = await this.httpClient.get<ApiResponse<ContactStats>>(
        '/api/contacts/stats'
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch stats');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      throw error;
    }
  }

  async exportContacts(filters?: ContactFilters): Promise<void> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
          }
        });
      }

      const queryString = params.toString();
      const url = queryString ? `/api/contacts/export?${queryString}` : '/api/contacts/export';

      // Get the base URL from httpClient
      const baseURL = this.httpClient['baseURL'] || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseURL}${url}`);
      
      if (!response.ok) {
        throw new Error('Failed to export contacts');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export contacts:', error);
      throw error;
    }
  }
}

// Singleton instance
export const contactService = new ContactService();
