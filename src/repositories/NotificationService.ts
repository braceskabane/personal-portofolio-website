// ================================
// FIX 2: NOTIFICATION SERVICE - Fixed Contact Import
// src/services/NotificationService.ts
// ================================

import { Contact } from '@/types/contact.types';

export class NotificationService {
  async notifyNewContact(contact: Contact): Promise<void> {
    try {
      console.log('📧 New contact notification:', {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        priority: contact.priority,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('Failed to send new contact notification:', error?.message || error);
    }
  }

  async notifyStatusUpdate(contact: Contact): Promise<void> {
    try {
      console.log('📧 Status update notification:', {
        id: contact.id,
        status: contact.status,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('Failed to send status update notification:', error?.message || error);
    }
  }
}
