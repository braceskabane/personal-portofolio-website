// ================================
// src/services/index.ts
// ================================

// API Services
export { HttpClient } from './api/httpClient';
export type { ApiClient, RequestConfig } from './api/httpClient';

// Portfolio Services
export { MockPortfolioService } from './portfolio/mockPortfolioService';
export { PortfolioService } from './portfolio/portfolioService';
export type { PortfolioRepository } from './portfolio/portfolioService';

// Animation Services
export { ParticleService } from './animation/particleService';
export type { Particle, ParticleSystemConfig } from './animation/particleService';

// Validation Services
export { ContactValidationService } from './validation/contactValidation';
export type { ValidationRule, ValidationResult } from './validation/contactValidation';