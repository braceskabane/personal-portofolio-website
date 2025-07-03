// ================================
// FIX 1: CONTACT CONTROLLER - Fixed Error Types
// src/controllers/ContactController.ts
// ================================

import { Request, Response, NextFunction } from 'express';
import { IContactService } from '@/services/interfaces/IContactService';
import { ContactFilters } from '@/types/contact.types';

export class ContactController {
  constructor(private readonly contactService: IContactService) {}

  // POST /api/contacts - Submit new contact
  submitContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactData = req.body;
      const metadata = {
        ipAddress: req.ip || req.headers['x-forwarded-for'] as string || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
      };

      console.log('📩 New contact submission:', {
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        ip: metadata.ipAddress,
        timestamp: new Date().toISOString()
      });

      const contact = await this.contactService.submitContact(contactData, metadata);

      res.status(201).json({
        success: true,
        data: contact,
        message: 'Contact submitted successfully',
        timestamp: new Date().toISOString()
      });

    } catch (error: any) { // Fixed: added type annotation
      console.error('❌ Contact submission failed:', error?.message || error);
      
      // Handle validation errors specifically
      if (error?.message && error.message.includes('Validation failed')) {
        res.status(400).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Handle duplicate submission
      if (error?.message && error.message.includes('Duplicate submission')) {
        res.status(429).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Pass other errors to global error handler
      next(error);
    }
  };

  // GET /api/contacts - Get contacts with filtering
  getContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      
      const filters: ContactFilters = {
        status: query.status as any,
        priority: query.priority as any,
        country: query.country as string,
        search: query.search as string,
        page: query.page ? parseInt(query.page as string) : 1,
        limit: query.limit ? parseInt(query.limit as string) : 10,
        sortBy: query.sortBy as string || 'createdAt',
        sortOrder: (query.sortOrder as 'asc' | 'desc') || 'desc'
      };

      // Date filters
      if (query.dateFrom) {
        filters.dateFrom = new Date(query.dateFrom as string);
      }
      if (query.dateTo) {
        filters.dateTo = new Date(query.dateTo as string);
      }

      console.log('📋 Fetching contacts with filters:', {
        ...filters,
        timestamp: new Date().toISOString()
      });

      const result = await this.contactService.getContacts(filters);

      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) { // Fixed: added type annotation
      console.error('❌ Failed to fetch contacts:', error?.message || error);
      next(error);
    }
  };

  // GET /api/contacts/:id - Get specific contact
  getContactById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      console.log('📄 Fetching contact by ID:', {
        id,
        timestamp: new Date().toISOString()
      });

      const contact = await this.contactService.getContactById(id);

      res.json({
        success: true,
        data: contact,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) { // Fixed: added type annotation
      console.error('❌ Failed to fetch contact:', error?.message || error);
      
      if (error?.message === 'Contact not found') {
        res.status(404).json({
          success: false,
          error: 'Contact not found',
          timestamp: new Date().toISOString()
        });
        return;
      }

      next(error);
    }
  };

  // PATCH /api/contacts/:id/status - Update contact status
  updateContactStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        res.status(400).json({
          success: false,
          error: 'Status is required',
          timestamp: new Date().toISOString()
        });
        return;
      }

      console.log('🔄 Updating contact status:', {
        id,
        status,
        timestamp: new Date().toISOString()
      });

      const contact = await this.contactService.updateContactStatus(id, status);

      res.json({
        success: true,
        data: contact,
        message: 'Contact status updated successfully',
        timestamp: new Date().toISOString()
      });

    } catch (error: any) { // Fixed: added type annotation
      console.error('❌ Failed to update contact status:', error?.message || error);
      
      if (error?.message === 'Contact not found') {
        res.status(404).json({
          success: false,
          error: 'Contact not found',
          timestamp: new Date().toISOString()
        });
        return;
      }

      if (error?.message && error.message.includes('Invalid status')) {
        res.status(400).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }

      next(error);
    }
  };

  // POST /api/contacts/:id/notes - Add note to contact
  addContactNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { note } = req.body;

      if (!note || !note.trim()) {
        res.status(400).json({
          success: false,
          error: 'Note is required',
          timestamp: new Date().toISOString()
        });
        return;
      }

      console.log('📝 Adding note to contact:', {
        id,
        noteLength: note.length,
        timestamp: new Date().toISOString()
      });

      const contact = await this.contactService.addContactNote(id, note);

      res.json({
        success: true,
        data: contact,
        message: 'Note added successfully',
        timestamp: new Date().toISOString()
      });

    } catch (error: any) { // Fixed: added type annotation
      console.error('❌ Failed to add note:', error?.message || error);
      
      if (error?.message === 'Contact not found') {
        res.status(404).json({
          success: false,
          error: 'Contact not found',
          timestamp: new Date().toISOString()
        });
        return;
      }

      if (error?.message && (error.message.includes('Note cannot be empty') || error.message.includes('must be less than'))) {
        res.status(400).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }

      next(error);
    }
  };

  // DELETE /api/contacts/:id - Delete contact
  deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      console.log('🗑️  Deleting contact:', {
        id,
        timestamp: new Date().toISOString()
      });

      await this.contactService.deleteContact(id);

      res.json({
        success: true,
        message: 'Contact deleted successfully',
        timestamp: new Date().toISOString()
      });

    } catch (error: any) { // Fixed: added type annotation
      console.error('❌ Failed to delete contact:', error?.message || error);
      
      if (error?.message === 'Contact not found') {
        res.status(404).json({
          success: false,
          error: 'Contact not found',
          timestamp: new Date().toISOString()
        });
        return;
      }

      if (error?.message && error.message.includes('Cannot delete recent')) {
        res.status(403).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }

      next(error);
    }
  };

  // GET /api/contacts/stats - Get contact statistics
  getContactStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('📊 Fetching contact statistics:', {
        timestamp: new Date().toISOString()
      });

      const stats = await this.contactService.getContactStats();

      res.json({
        success: true,
        data: stats,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) { // Fixed: added type annotation
      console.error('❌ Failed to fetch stats:', error?.message || error);
      next(error);
    }
  };

  // GET /api/contacts/export - Export contacts to CSV
  exportContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      
      const filters: ContactFilters = {
        status: query.status as any,
        priority: query.priority as any,
        country: query.country as string,
        search: query.search as string
      };

      // Date filters for export
      if (query.dateFrom) {
        filters.dateFrom = new Date(query.dateFrom as string);
      }
      if (query.dateTo) {
        filters.dateTo = new Date(query.dateTo as string);
      }

      console.log('📤 Exporting contacts:', {
        filters,
        timestamp: new Date().toISOString()
      });

      const csv = await this.contactService.exportContacts(filters);

      // Set CSV headers
      const filename = 'contacts-' + new Date().toISOString().split('T')[0] + '.csv'; // Fixed string concatenation
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"'); // Fixed string concatenation
      res.setHeader('Cache-Control', 'no-cache');
      
      res.send(csv);

    } catch (error: any) { // Fixed: added type annotation
      console.error('❌ Failed to export contacts:', error?.message || error);
      next(error);
    }
  };
}