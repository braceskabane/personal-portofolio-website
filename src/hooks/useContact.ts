// ================================
// 2. REACT HOOKS FOR CONTACT API
// frontend-dev/src/hooks/useContacts.ts
// ================================

import { useState, useEffect, useCallback } from 'react';
import { ContactService, Contact, ContactFilters, ContactResponse, ContactStats } from '../services/api/contactService';

const contactService = new ContactService();

export const useContacts = (initialFilters?: ContactFilters) => {
  const [contacts, setContacts] = useState<ContactResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async (filters?: ContactFilters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await contactService.getContacts(filters);
      setContacts(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContactStatus = async (id: string, status: string) => {
    try {
      await contactService.updateContactStatus(id, status);
      // Refresh contacts after update
      await fetchContacts(initialFilters);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update contact');
    }
  };

  const addContactNote = async (id: string, note: string) => {
    try {
      return await contactService.addContactNote(id, note);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add note');
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await contactService.deleteContact(id);
      // Refresh contacts after deletion
      await fetchContacts(initialFilters);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete contact');
    }
  };

  const exportContacts = async (filters?: ContactFilters) => {
    try {
      await contactService.exportContacts(filters);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to export contacts');
    }
  };

  useEffect(() => {
    if (initialFilters) {
      fetchContacts(initialFilters);
    }
  }, [fetchContacts, initialFilters]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    updateContactStatus,
    addContactNote,
    deleteContact,
    exportContacts,
    refetch: () => fetchContacts(initialFilters)
  };
};

export const useContactStats = () => {
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await contactService.getContactStats();
      setStats(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

export const useContactSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitContact = async (contactData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactService.submitContact(contactData);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    submitContact,
    loading,
    error,
    success,
    reset
  };
};