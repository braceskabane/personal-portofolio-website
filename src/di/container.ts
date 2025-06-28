// ================================
// src/di/container.ts - Dependency Injection Container
// ================================

'use client';

export class DIContainer {
  private dependencies = new Map<string, any>();
  private singletons = new Map<string, any>();

  register<T>(token: string, dependency: T | (() => T), singleton = false): void {
    if (singleton) {
      this.singletons.set(token, dependency);
    } else {
      this.dependencies.set(token, dependency);
    }
  }

  resolve<T>(token: string): T {
    // Check singletons first
    if (this.singletons.has(token)) {
      const dependency = this.singletons.get(token);
      if (typeof dependency === 'function') {
        const instance = dependency();
        this.singletons.set(token, instance); // Cache the instance
        return instance;
      }
      return dependency;
    }

    // Check regular dependencies
    const dependency = this.dependencies.get(token);
    if (!dependency) {
      throw new Error(`Dependency ${token} not found`);
    }

    if (typeof dependency === 'function') {
      return dependency();
    }

    return dependency;
  }

  has(token: string): boolean {
    return this.dependencies.has(token) || this.singletons.has(token);
  }

  clear(): void {
    this.dependencies.clear();
    this.singletons.clear();
  }

  clearSingletons(): void {
    this.singletons.clear();
  }
}

// Create and configure the global container
export const container = new DIContainer();

// Setup default services
import { HttpClient } from '@/services/api/httpClient';
import { MockPortfolioService } from '@/services/portfolio/mockPortfolioService';
import { PortfolioService } from '@/services/portfolio/portfolioService';
import { ContactValidationService } from '@/services/validation/contactValidation';
import { ParticleService } from '@/services/animation/particleService';

// Register services as singletons
container.register('httpClient', () => new HttpClient(), true);
container.register('mockPortfolioService', () => new MockPortfolioService(), true);
container.register('portfolioService', () => new PortfolioService(container.resolve('httpClient')), true);
container.register('contactValidationService', () => new ContactValidationService(), true);
container.register('particleService', () => new ParticleService(), true);

// Helper function to get services
export const getService = <T>(token: string): T => container.resolve<T>(token);