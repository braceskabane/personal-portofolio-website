'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Calendar, Clock, User, Building, 
  Search, Download, Eye, MessageSquare, Trash2, 
  AlertCircle, CheckCircle, XCircle, TrendingUp, Users, Globe, Bell,
  ChevronLeft, ChevronRight, RefreshCw, Plus, FileText, Tag
} from 'lucide-react';
import { useAdminContacts, Contact, ContactFilters } from '@/hooks/useAdminContacts';

const AdminContactsPage = () => {
  const {
    contacts,
    stats,
    pagination,
    loading,
    actionLoading,
    error,
    updateContactStatus,
    addContactNote,
    deleteContact,
    exportContacts,
    loadData,
    clearError
  } = useAdminContacts();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  
  const [filters, setFilters] = useState<ContactFilters>({
    search: '',
    status: '',
    priority: '',
    country: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const updateFilters = (newFilters: Partial<ContactFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    loadData(updatedFilters);
  };

  // Status configurations
  const statusConfig = {
    'NEW': { label: 'New', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    'IN_PROGRESS': { label: 'In Progress', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    'RESPONDED': { label: 'Responded', textColor: 'text-green-600', bgColor: 'bg-green-50' },
    'CLOSED': { label: 'Closed', textColor: 'text-gray-600', bgColor: 'bg-gray-50' },
    'SPAM': { label: 'Spam', textColor: 'text-red-600', bgColor: 'bg-red-50' }
  };

  const priorityConfig = {
    'LOW': { label: 'Low', color: 'text-gray-500', dot: 'bg-gray-400' },
    'MEDIUM': { label: 'Medium', color: 'text-blue-500', dot: 'bg-blue-400' },
    'HIGH': { label: 'High', color: 'text-orange-500', dot: 'bg-orange-400' },
    'URGENT': { label: 'Urgent', color: 'text-red-500', dot: 'bg-red-400' }
  };

  const handleStatusUpdate = async (contactId: string, newStatus: string) => {
    const success = await updateContactStatus(contactId, newStatus);
    if (success && selectedContact?.id === contactId) {
      setSelectedContact(prev => prev ? {
        ...prev,
        status: newStatus as any,
        updatedAt: new Date().toISOString()
      } : null);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !selectedContact) return;

    const success = await addContactNote(selectedContact.id, newNote);
    if (success) {
      setNewNote('');
      setShowNoteModal(false);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    const success = await deleteContact(contactId);
    if (success && selectedContact?.id === contactId) {
      setShowDetailModal(false);
      setSelectedContact(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: Record<string, string> = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'ID': '🇮🇩', 'AU': '🇦🇺', 'SG': '🇸🇬'
    };
    return flags[countryCode] || '🌍';
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span className="text-sm">{error}</span>
            <button onClick={clearError} className="ml-2 text-red-500 hover:text-red-700">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
              <p className="text-gray-600 mt-1">Manage and respond to incoming project inquiries</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => loadData(filters)}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => exportContacts(filters)}
                disabled={actionLoading === 'export'}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <Download className="w-4 h-4 mr-2" />
                {actionLoading === 'export' ? 'Exporting...' : 'Export'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">+{stats.recentContacts} this week</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.byStatus.NEW || 0}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <Bell className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}h</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Countries</p>
                  <p className="text-2xl font-bold text-gray-900">{Object.keys(stats.byCountry).length}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value, page: 1 })}
              />
            </div>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.status}
              onChange={(e) => updateFilters({ status: e.target.value, page: 1 })}
            >
              <option value="">All Status</option>
              {Object.entries(statusConfig).map(([status, config]) => (
                <option key={status} value={status}>{config.label}</option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.priority}
              onChange={(e) => updateFilters({ priority: e.target.value, page: 1 })}
            >
              <option value="">All Priority</option>
              {Object.entries(priorityConfig).map(([priority, config]) => (
                <option key={priority} value={priority}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
              <p className="mt-1 text-sm text-gray-500">No contacts have been submitted yet.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                              {contact.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                              <div className="text-sm text-gray-500">{contact.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {contact.company || <span className="text-gray-400 italic">Individual</span>}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <span className="mr-1">{getCountryFlag(contact.country)}</span>
                            {contact.country}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">{contact.subject}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{contact.message}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={contact.status}
                            onChange={(e) => handleStatusUpdate(contact.id, e.target.value)}
                            disabled={actionLoading === contact.id}
                            className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${statusConfig[contact.status].bgColor} ${statusConfig[contact.status].textColor} focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
                          >
                            {Object.entries(statusConfig).map(([status, config]) => (
                              <option key={status} value={status}>{config.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center text-sm font-medium ${priorityConfig[contact.priority].color}`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${priorityConfig[contact.priority].dot}`}></div>
                            {priorityConfig[contact.priority].label}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{formatRelativeTime(contact.createdAt)}</div>
                          <div className="text-xs text-gray-400">{formatDate(contact.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedContact(contact);
                                setShowDetailModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedContact(contact);
                                setShowNoteModal(true);
                              }}
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              disabled={actionLoading === contact.id}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 disabled:opacity-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => updateFilters({ page: Math.max(1, (filters.page || 1) - 1) })}
                    disabled={filters.page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => updateFilters({ page: (filters.page || 1) + 1 })}
                    disabled={pagination.currentPage >= pagination.totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{((pagination.currentPage - 1) * (filters.limit || 10)) + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(pagination.currentPage * (filters.limit || 10), pagination.total)}</span> of{' '}
                      <span className="font-medium">{pagination.total}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => updateFilters({ page: Math.max(1, (filters.page || 1) - 1) })}
                        disabled={filters.page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => updateFilters({ page: (filters.page || 1) + 1 })}
                        disabled={pagination.currentPage >= pagination.totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Simple Detail Modal */}
        {showDetailModal && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                  <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div><strong>Name:</strong> {selectedContact.name}</div>
                  <div><strong>Email:</strong> {selectedContact.email}</div>
                  <div><strong>Phone:</strong> {selectedContact.phone}</div>
                  <div><strong>Company:</strong> {selectedContact.company}</div>
                  <div><strong>Country:</strong> {selectedContact.country}</div>
                  <div><strong>Subject:</strong> {selectedContact.subject}</div>
                  <div><strong>Message:</strong> <p className="whitespace-pre-wrap">{selectedContact.message}</p></div>
                  <div><strong>Status:</strong> {statusConfig[selectedContact.status].label}</div>
                  <div><strong>Priority:</strong> {priorityConfig[selectedContact.priority].label}</div>
                  <div><strong>Date:</strong> {formatDate(selectedContact.createdAt)}</div>
                  {selectedContact.notes && (
                    <div><strong>Notes:</strong> <p className="whitespace-pre-wrap">{selectedContact.notes}</p></div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowNoteModal(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Add Note
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Note Modal */}
        {showNoteModal && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Add Note</h2>
                  <button
                    onClick={() => {
                      setShowNoteModal(false);
                      setNewNote('');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Adding note for: <span className="font-medium">{selectedContact.name}</span>
                  </p>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter your note here..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    maxLength={1000}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowNoteModal(false);
                      setNewNote('');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim() || actionLoading === 'note'}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {actionLoading === 'note' ? 'Adding...' : 'Add Note'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactsPage;