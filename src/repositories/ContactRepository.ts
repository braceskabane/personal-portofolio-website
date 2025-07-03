// ================================
// FIXED CONTACT REPOSITORY - Spread Operator Fix
// src/repositories/ContactRepository.ts
// ================================

import { PrismaClient } from '@prisma/client';
import { IContactRepository } from './interfaces/IContactRepository';
import { Contact, ContactFilters, ContactResponse, ContactStats, ContactStatusValues, ContactPriorityValues } from '@/types/contact.types';

export class ContactRepository implements IContactRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(contactData: any, metadata?: any): Promise<Contact> {
    try {
      const contact = await this.prisma.contact.create({
        data: {
          name: contactData.name,
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
          phone: contactData.phone || null,
          company: contactData.company || null,
          country: contactData.country || 'ID',
          id: this.generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          status: ContactStatusValues.NEW,
          priority: this.determinePriority(contactData),
          tags: this.generateTags(contactData),
          notes: '',
          ipAddress: metadata?.ipAddress || null,
          userAgent: metadata?.userAgent || null
        }
      });

      return this.mapToContact(contact);
    } catch (error: any) {
      console.error('Repository: Failed to create contact:', error);
      throw new Error('Failed to create contact: ' + (error?.message || 'Unknown error'));
    }
  }

  async findById(id: string): Promise<Contact | null> {
    try {
      const contact = await this.prisma.contact.findUnique({
        where: { id }
      });

      return contact ? this.mapToContact(contact) : null;
    } catch (error: any) {
      console.error('Repository: Failed to find contact:', error);
      throw new Error('Failed to find contact: ' + (error?.message || 'Unknown error'));
    }
  }

  async findAll(filters: ContactFilters): Promise<ContactResponse> {
    try {
      const where = this.buildWhereClause(filters);
      const orderBy = this.buildOrderBy(filters);
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      
      const [contacts, total] = await Promise.all([
        this.prisma.contact.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit
        }),
        this.prisma.contact.count({ where })
      ]);

      return {
        contacts: contacts.map(this.mapToContact.bind(this)),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error: any) {
      console.error('Repository: Failed to fetch contacts:', error);
      throw new Error('Failed to fetch contacts: ' + (error?.message || 'Unknown error'));
    }
  }

  async update(id: string, updateData: Partial<Contact>): Promise<Contact> {
    try {
      // Create explicit update object to avoid spread operator issues
      const dataToUpdate: any = {
        updatedAt: new Date()
      };

      // Safely add fields that exist in updateData
      if (updateData.name !== undefined) dataToUpdate.name = updateData.name;
      if (updateData.email !== undefined) dataToUpdate.email = updateData.email;
      if (updateData.subject !== undefined) dataToUpdate.subject = updateData.subject;
      if (updateData.message !== undefined) dataToUpdate.message = updateData.message;
      if (updateData.phone !== undefined) dataToUpdate.phone = updateData.phone;
      if (updateData.company !== undefined) dataToUpdate.company = updateData.company;
      if (updateData.country !== undefined) dataToUpdate.country = updateData.country;
      if (updateData.status !== undefined) dataToUpdate.status = updateData.status;
      if (updateData.priority !== undefined) dataToUpdate.priority = updateData.priority;
      if (updateData.tags !== undefined) dataToUpdate.tags = JSON.stringify(updateData.tags);
      if (updateData.notes !== undefined) dataToUpdate.notes = updateData.notes;
      if (updateData.assignedTo !== undefined) dataToUpdate.assignedTo = updateData.assignedTo;
      if (updateData.responseAt !== undefined) dataToUpdate.responseAt = updateData.responseAt;

      const contact = await this.prisma.contact.update({
        where: { id },
        data: dataToUpdate
      });

      return this.mapToContact(contact);
    } catch (error: any) {
      console.error('Repository: Failed to update contact:', error);
      throw new Error('Failed to update contact: ' + (error?.message || 'Unknown error'));
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.contact.delete({
        where: { id }
      });
      return true;
    } catch (error: any) {
      console.error('Repository: Failed to delete contact:', error);
      throw new Error('Failed to delete contact: ' + (error?.message || 'Unknown error'));
    }
  }

  async updateStatus(id: string, status: string): Promise<Contact> {
    const updateData: any = { 
      status: status,
      updatedAt: new Date()
    };

    if (status === ContactStatusValues.RESPONDED) {
      updateData.responseAt = new Date();
    }

    try {
      const contact = await this.prisma.contact.update({
        where: { id },
        data: updateData
      });

      return this.mapToContact(contact);
    } catch (error: any) {
      console.error('Repository: Failed to update status:', error);
      throw new Error('Failed to update contact status: ' + (error?.message || 'Unknown error'));
    }
  }

  async addNote(id: string, note: string): Promise<Contact> {
    const contact = await this.findById(id);
    if (!contact) {
      throw new Error('Contact not found');
    }

    const timestamp = new Date().toISOString();
    const timestampedNote = '[' + timestamp + '] ' + note;
    const updatedNotes = contact.notes ? contact.notes + '\n---\n' + timestampedNote : timestampedNote;
    
    try {
      const updatedContact = await this.prisma.contact.update({
        where: { id },
        data: {
          notes: updatedNotes,
          updatedAt: new Date()
        }
      });

      return this.mapToContact(updatedContact);
    } catch (error: any) {
      console.error('Repository: Failed to add note:', error);
      throw new Error('Failed to add note: ' + (error?.message || 'Unknown error'));
    }
  }

  async getStats(): Promise<ContactStats> {
    try {
      const total = await this.prisma.contact.count();

      const statusStats = await this.prisma.contact.groupBy({
        by: ['status'],
        _count: { _all: true }
      });

      const priorityStats = await this.prisma.contact.groupBy({
        by: ['priority'],
        _count: { _all: true }
      });

      const countryStats = await this.prisma.contact.groupBy({
        by: ['country'],
        _count: { _all: true }
      });

      const recentContacts = await this.prisma.contact.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      });

      const avgResponseTime = await this.calculateAvgResponseTime();

      return {
        total,
        byStatus: this.mapGroupedStats(statusStats, 'status'),
        byPriority: this.mapGroupedStats(priorityStats, 'priority'),
        byCountry: this.mapGroupedStats(countryStats, 'country'),
        recentContacts,
        avgResponseTime
      };
    } catch (error: any) {
      console.error('Repository: Failed to get stats:', error);
      throw new Error('Failed to get stats: ' + (error?.message || 'Unknown error'));
    }
  }

  // Private helper methods
  private generateId(): string {
    return 'contact_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private determinePriority(contactData: any): string {
    const urgentKeywords = ['urgent', 'asap', 'emergency', 'critical', 'help'];
    const highKeywords = ['important', 'priority', 'deadline', 'soon'];
    
    const text = (contactData.subject + ' ' + contactData.message).toLowerCase();
    
    if (urgentKeywords.some(keyword => text.includes(keyword))) {
      return ContactPriorityValues.URGENT;
    }
    
    if (highKeywords.some(keyword => text.includes(keyword))) {
      return ContactPriorityValues.HIGH;
    }
    
    if (contactData.company && contactData.company.trim()) {
      return ContactPriorityValues.HIGH;
    }
    
    return ContactPriorityValues.MEDIUM;
  }

  private generateTags(contactData: any): string {
    const tags: string[] = [];
    
    if (contactData.company && contactData.company.trim()) {
      tags.push('business');
    } else {
      tags.push('individual');
    }
    
    const messageText = contactData.message.toLowerCase();
    if (messageText.includes('project')) tags.push('project');
    if (messageText.includes('collaboration')) tags.push('collaboration');
    if (messageText.includes('hire') || messageText.includes('job')) tags.push('job');
    if (messageText.includes('website') || messageText.includes('web')) tags.push('web');
    if (messageText.includes('mobile') || messageText.includes('app')) tags.push('mobile');
    
    if (contactData.country && contactData.country !== 'ID') {
      tags.push('international');
    }
    
    return JSON.stringify(tags);
  }

  private buildWhereClause(filters: ContactFilters): any {
    const where: any = {};

    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.country) where.country = filters.country;
    
    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    if (filters.search && filters.search.trim()) {
      where.OR = [
        { name: { contains: filters.search} },
        { email: { contains: filters.search} },
        { subject: { contains: filters.search} },
        { message: { contains: filters.search} },
        { company: { contains: filters.search} }
      ];
    }

    return where;
  }

  private buildOrderBy(filters: ContactFilters): any {
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'desc';
    return { [sortBy]: sortOrder };
  }

  private mapToContact(dbContact: any): Contact {
    let tags: string[] = [];
    try {
      if (dbContact.tags) {
        tags = JSON.parse(dbContact.tags);
      }
    } catch (error) {
      console.warn('Failed to parse tags for contact:', dbContact.id);
      tags = [];
    }

    return {
      id: dbContact.id,
      name: dbContact.name,
      email: dbContact.email,
      subject: dbContact.subject,
      message: dbContact.message,
      phone: dbContact.phone || '',
      company: dbContact.company || '',
      country: dbContact.country,
      createdAt: dbContact.createdAt,
      updatedAt: dbContact.updatedAt,
      status: dbContact.status,
      priority: dbContact.priority,
      tags,
      notes: dbContact.notes || '',
      assignedTo: dbContact.assignedTo,
      responseAt: dbContact.responseAt,
      ipAddress: dbContact.ipAddress,
      userAgent: dbContact.userAgent
    };
  }

  private mapGroupedStats(stats: any[], field: string): Record<string, number> {
    const result: Record<string, number> = {};
    
    if (field === 'status') {
      Object.values(ContactStatusValues).forEach(status => {
        result[status] = 0;
      });
    } else if (field === 'priority') {
      Object.values(ContactPriorityValues).forEach(priority => {
        result[priority] = 0;
      });
    }
    
    stats.forEach(item => {
      result[item[field]] = item._count._all;
    });
    
    return result;
  }

  private async calculateAvgResponseTime(): Promise<number> {
    try {
      const responded = await this.prisma.contact.findMany({
        where: {
          status: ContactStatusValues.RESPONDED,
          responseAt: { not: null }
        },
        select: {
          createdAt: true,
          responseAt: true
        }
      });

      if (responded.length === 0) return 0;

      const totalTimeInHours = responded.reduce((sum, contact) => {
        if (contact.responseAt) {
          const responseTime = contact.responseAt.getTime() - contact.createdAt.getTime();
          return sum + (responseTime / (1000 * 60 * 60));
        }
        return sum;
      }, 0);

      return Math.round((totalTimeInHours / responded.length) * 100) / 100;
    } catch (error: any) {
      console.error('Repository: Failed to calculate avg response time:', error);
      return 0;
    }
  }
}