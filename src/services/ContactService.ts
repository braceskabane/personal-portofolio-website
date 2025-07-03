// ================================
// FIXED CONTACT SERVICE - Template Literal Error Fix
// src/services/ContactService.ts
// ================================

import { IContactRepository } from '@/repositories/interfaces/IContactRepository';
import { IContactService } from './interfaces/IContactService';
import { Contact, ContactFilters, ContactResponse, ContactStats } from '@/types/contact.types';
import { ValidationService } from './ValidationService';
import { NotificationService } from './NotificationService';

export class ContactService implements IContactService {
  constructor(
    private readonly contactRepository: IContactRepository,
    private readonly notificationService: NotificationService,
    private readonly validationService: ValidationService
  ) {}

  async submitContact(contactData: any, metadata?: any): Promise<Contact> {
    // Validate input
    const validation = this.validationService.validateContactForm(contactData);
    if (!validation.isValid) {
      const errorMessages = Object.values(validation.errors).join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    // Check for spam/duplicates
    await this.checkForSpam(contactData);

    // Create contact
    const contact = await this.contactRepository.create(contactData, metadata);

    // Send notifications
    await this.notificationService.notifyNewContact(contact);

    console.log('✅ Contact submitted successfully:', {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      priority: contact.priority
    });

    return contact;
  }

  async getContacts(filters: ContactFilters): Promise<ContactResponse> {
    return this.contactRepository.findAll(filters);
  }

  async getContactById(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async updateContactStatus(id: string, status: string): Promise<Contact> {
    // Validate status
    const validStatuses = ['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED', 'SPAM'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status: ' + status); // Fixed: use string concatenation instead of template literal
    }

    const contact = await this.contactRepository.updateStatus(id, status);
    
    // Send status update notification
    await this.notificationService.notifyStatusUpdate(contact);
    
    console.log('✅ Contact status updated:', {
      id: contact.id,
      status: contact.status,
      timestamp: new Date().toISOString()
    });
    
    return contact;
  }

  async addContactNote(id: string, note: string): Promise<Contact> {
    if (!note.trim()) {
      throw new Error('Note cannot be empty');
    }

    if (note.length > 1000) {
      throw new Error('Note must be less than 1000 characters');
    }

    const contact = await this.contactRepository.addNote(id, note);
    
    console.log('✅ Note added to contact:', {
      id: contact.id,
      noteLength: note.length,
      timestamp: new Date().toISOString()
    });

    return contact;
  }

  async deleteContact(id: string): Promise<boolean> {
    const contact = await this.getContactById(id);
    
    // Only allow deletion of spam or very old contacts
    const daysSinceCreated = (Date.now() - contact.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    
    if (contact.status !== 'SPAM' && daysSinceCreated < 30) {
      throw new Error('Cannot delete recent non-spam contacts. Only spam contacts or contacts older than 30 days can be deleted.');
    }

    const result = await this.contactRepository.delete(id);
    
    console.log('✅ Contact deleted:', {
      id: contact.id,
      name: contact.name,
      status: contact.status,
      timestamp: new Date().toISOString()
    });

    return result;
  }

  async getContactStats(): Promise<ContactStats> {
    return this.contactRepository.getStats();
  }

  async exportContacts(filters: ContactFilters): Promise<string> {
    // Get all contacts matching filters (with high limit for export)
    const { contacts } = await this.contactRepository.findAll({
      ...filters,
      limit: 10000, // Large limit for export
      page: 1
    });

    return this.generateCSV(contacts);
  }

  // Private helper methods
  private async checkForSpam(contactData: any): Promise<void> {
    // Check for duplicate emails in last hour (simple spam detection)
    const recentContacts = await this.contactRepository.findAll({
      search: contactData.email,
      dateFrom: new Date(Date.now() - 60 * 60 * 1000), // Last hour
      limit: 1
    });

    if (recentContacts.total > 0) {
      throw new Error('Duplicate submission detected. Please wait before submitting again.');
    }
  }

  private generateCSV(contacts: Contact[]): string {
    const headers = [
      'ID', 'Name', 'Email', 'Phone', 'Company', 'Country', 
      'Subject', 'Message', 'Status', 'Priority', 'Tags',
      'Created At', 'Updated At', 'Response At', 'Notes'
    ];

    const rows = contacts.map(contact => [
      contact.id,
      contact.name,
      contact.email,
      contact.phone || '',
      contact.company || '',
      contact.country,
      contact.subject,
      contact.message.replace(/"/g, '""'), // Escape quotes
      contact.status,
      contact.priority,
      contact.tags.join('; '),
      contact.createdAt.toISOString(),
      contact.updatedAt.toISOString(),
      contact.responseAt?.toISOString() || '',
      (contact.notes || '').replace(/"/g, '""') // Escape quotes
    ]);

    // Convert to CSV format
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => '"' + cell + '"').join(','))
      .join('\n');

    console.log('✅ CSV export generated:', {
      contactCount: contacts.length,
      timestamp: new Date().toISOString()
    });

    return csvContent;
  }
}