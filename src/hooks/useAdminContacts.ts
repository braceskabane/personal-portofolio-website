'use client';

import { useState, useEffect, useCallback } from 'react';
import { contactService } from '@/services/api/contactService';
import type { Contact, ContactStats, ContactFilters, ContactResponse } from '@/services/api/contactService';

export { type Contact, type ContactStats, type ContactFilters, type ContactResponse };

export const useAdminContacts = (initialFilters?: ContactFilters) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1
  });

  // Fetch contacts with filters
  const fetchContacts = useCallback(async (filters?: ContactFilters) => {
    try {
      setError(null);
      const response = await contactService.getContacts(filters);
      setContacts(response.contacts);
      setPagination({
        total: response.total,
        totalPages: response.totalPages,
        currentPage: response.page
      });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch contacts';
      setError(errorMessage);
      console.error('Failed to fetch contacts:', err);
      // Return empty response on error
      return {
        contacts: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      };
    }
  }, []);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const statsData = await contactService.getContactStats();
      setStats(statsData);
      return statsData;
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      // Don't throw error for stats, return null
      return null;
    }
  }, []);

  // Load data with proper loading state management
  const loadData = useCallback(async (filters?: ContactFilters) => {
    setLoading(true);
    try {
      await Promise.all([
        fetchContacts(filters),
        fetchStats()
      ]);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchContacts, fetchStats]);

  // Update contact status
  const updateContactStatus = useCallback(async (contactId: string, status: string) => {
    if (!contactId || !status) {
      setError('Invalid contact ID or status');
      return false;
    }

    setActionLoading(contactId);
    try {
      await contactService.updateContactStatus(contactId, status);
      
      // Update local state
      setContacts(prevContacts => 
        prevContacts.map(contact => 
          contact.id === contactId 
            ? { 
                ...contact, 
                status: status as Contact['status'], 
                updatedAt: new Date().toISOString() 
              }
            : contact
        )
      );

      // Refresh stats in background
      fetchStats().catch(console.error);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update status';
      setError(errorMessage);
      console.error('Failed to update contact status:', err);
      return false;
    } finally {
      setActionLoading(null);
    }
  }, [fetchStats]);

  // Add note to contact
  const addContactNote = useCallback(async (contactId: string, note: string) => {
    if (!contactId || !note.trim()) {
      setError('Contact ID and note are required');
      return false;
    }

    setActionLoading('note');
    try {
      await contactService.addContactNote(contactId, note.trim());
      
      // Update local state
      setContacts(prevContacts => 
        prevContacts.map(contact => {
          if (contact.id === contactId) {
            const timestamp = new Date().toLocaleString();
            const newNote = contact.notes 
              ? `${contact.notes}\n---\n[${timestamp}] ${note.trim()}`
              : `[${timestamp}] ${note.trim()}`;
            
            return {
              ...contact,
              notes: newNote,
              updatedAt: new Date().toISOString()
            };
          }
          return contact;
        })
      );

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add note';
      setError(errorMessage);
      console.error('Failed to add note:', err);
      return false;
    } finally {
      setActionLoading(null);
    }
  }, []);

  // Delete contact
  const deleteContact = useCallback(async (contactId: string) => {
    if (!contactId) {
      setError('Contact ID is required');
      return false;
    }

    setActionLoading(contactId);
    try {
      await contactService.deleteContact(contactId);
      
      // Remove from local state
      setContacts(prevContacts => 
        prevContacts.filter(contact => contact.id !== contactId)
      );
      
      // Update pagination
      setPagination(prevPagination => ({
        ...prevPagination,
        total: Math.max(0, prevPagination.total - 1)
      }));
      
      // Refresh stats in background
      fetchStats().catch(console.error);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete contact';
      setError(errorMessage);
      console.error('Failed to delete contact:', err);
      return false;
    } finally {
      setActionLoading(null);
    }
  }, [fetchStats]);

  // Export contacts
  const exportContacts = useCallback(async (filters?: ContactFilters) => {
    setActionLoading('export');
    try {
      await contactService.exportContacts(filters);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export contacts';
      setError(errorMessage);
      console.error('Failed to export contacts:', err);
      return false;
    } finally {
      setActionLoading(null);
    }
  }, []);

  // Get specific contact by ID
  const getContactById = useCallback(async (contactId: string) => {
    if (!contactId) {
      setError('Contact ID is required');
      return null;
    }

    try {
      const contact = await contactService.getContactById(contactId);
      return contact;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch contact';
      setError(errorMessage);
      console.error('Failed to fetch contact by ID:', err);
      return null;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Refresh data with current filters
  const refetch = useCallback(() => {
    if (initialFilters) {
      return loadData(initialFilters);
    }
    return loadData();
  }, [loadData, initialFilters]);

  // Initialize on mount or when initialFilters change
  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      if (isMounted) {
        await loadData(initialFilters);
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [loadData]); // Remove initialFilters from dependency to avoid infinite re-renders

  // Update initial filters when they change (but don't reload data immediately)
  useEffect(() => {
    // This effect is just for tracking filter changes
    // Actual data loading should be triggered manually via loadData()
  }, [initialFilters]);

  return {
    // Data
    contacts,
    stats,
    pagination,
    
    // Loading states
    loading,
    actionLoading,
    error,
    
    // Actions
    fetchContacts,
    fetchStats,
    updateContactStatus,
    addContactNote,
    deleteContact,
    exportContacts,
    getContactById,
    loadData,
    clearError,
    refetch,
    
    // Helper functions
    isActionLoading: (action?: string) => {
      if (!action) return actionLoading !== null;
      return actionLoading === action;
    },
    
    // Get contact from local state
    getLocalContact: (contactId: string) => {
      return contacts.find(contact => contact.id === contactId) || null;
    }
  };
};