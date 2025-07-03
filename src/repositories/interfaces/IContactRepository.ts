import { Contact, ContactFilters, ContactResponse, ContactStats } from '@/types/contact.types';

export interface IContactRepository {
  create(contactData: any, metadata?: any): Promise<Contact>;
  findById(id: string): Promise<Contact | null>;
  findAll(filters: ContactFilters): Promise<ContactResponse>;
  update(id: string, updateData: Partial<Contact>): Promise<Contact>;
  delete(id: string): Promise<boolean>;
  updateStatus(id: string, status: string): Promise<Contact>;
  addNote(id: string, note: string): Promise<Contact>;
  getStats(): Promise<ContactStats>;
}
