// ================================
// FIX 1: CONTAINER - Fixed String Concatenation
// src/container/Container.ts
// ================================

import prisma from '@/lib/prisma';
import { ContactRepository } from '@/repositories/ContactRepository';
import { ContactService } from '@/services/ContactService';
import { ValidationService } from '@/services/ValidationService';
import { NotificationService } from '@/services/NotificationService';
import { ContactController } from '@/controllers/ContactController';

export class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private registerServices(): void {
    // Register repositories
    this.services.set('ContactRepository', new ContactRepository(prisma));
    
    // Register services
    this.services.set('ValidationService', new ValidationService());
    this.services.set('NotificationService', new NotificationService());
    
    this.services.set('ContactService', new ContactService(
      this.get('ContactRepository'),
      this.get('NotificationService'),
      this.get('ValidationService')
    ));

    // Register controllers
    this.services.set('ContactController', new ContactController(
      this.get('ContactService')
    ));
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error('Service ' + serviceName + ' not found'); // Fixed: proper string concatenation
    }
    return service;
  }
}

// Helper function to get services
export const getService = <T>(serviceName: string): T => {
  return Container.getInstance().get<T>(serviceName);
};