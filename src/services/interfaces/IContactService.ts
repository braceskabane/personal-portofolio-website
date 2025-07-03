import { Contact, ContactFilters, ContactResponse, ContactStats } from '@/types/contact.types';

export interface IContactService {
  submitContact(contactData: any, metadata?: any): Promise<Contact>;
  getContacts(filters: ContactFilters): Promise<ContactResponse>;
  getContactById(id: string): Promise<Contact>;
  updateContactStatus(id: string, status: string): Promise<Contact>;
  addContactNote(id: string, note: string): Promise<Contact>;
  deleteContact(id: string): Promise<boolean>;
  getContactStats(): Promise<ContactStats>;
  exportContacts(filters: ContactFilters): Promise<string>;
}
