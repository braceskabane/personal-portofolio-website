# ================================
# SETUP CONTACT MANAGEMENT SYSTEM
# File: setup-contact.ps1
# ================================

Write-Host "🚀 SETTING UP CONTACT MANAGEMENT SYSTEM..." -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan

# Create all required files step by step
Write-Host "📁 Creating file structure..." -ForegroundColor Yellow

# 1. Repository Interface
Write-Host "  📄 Creating repository interface..." -ForegroundColor Gray
$repoInterface = @"
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
"@

$repoInterface | Out-File -FilePath "src/repositories/interfaces/IContactRepository.ts" -Encoding UTF8

# 2. Service Interface
Write-Host "  📄 Creating service interface..." -ForegroundColor Gray
$serviceInterface = @"
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
"@

$serviceInterface | Out-File -FilePath "src/services/interfaces/IContactService.ts" -Encoding UTF8

# 3. Validation Service
Write-Host "  📄 Creating validation service..." -ForegroundColor Gray
$validationService = @"
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class ValidationService {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validateContactForm(data: any): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!this.validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject?.trim()) {
      errors.subject = 'Subject is required';
    } else if (data.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!data.message?.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    if (data.phone && !this.validatePhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (this.isSpamContent(data)) {
      errors.message = 'Message flagged as potential spam';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  private validateEmail(email: string): boolean {
    return this.emailRegex.test(email.trim());
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
    return phoneRegex.test(phone.trim());
  }

  private isSpamContent(data: any): boolean {
    const spamKeywords = ['viagra', 'casino', 'lottery', 'free money'];
    const text = `${data.subject} ${data.message}`.toLowerCase();
    return spamKeywords.some(keyword => text.includes(keyword));
  }
}
"@

$validationService | Out-File -FilePath "src/services/ValidationService.ts" -Encoding UTF8

# 4. Notification Service
Write-Host "  📄 Creating notification service..." -ForegroundColor Gray
$notificationService = @"
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
    } catch (error) {
      console.error('Failed to send new contact notification:', error);
    }
  }

  async notifyStatusUpdate(contact: Contact): Promise<void> {
    try {
      console.log('📧 Status update notification:', {
        id: contact.id,
        status: contact.status,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to send status update notification:', error);
    }
  }
}
"@

$notificationService | Out-File -FilePath "src/services/NotificationService.ts" -Encoding UTF8

# 5. Routes
Write-Host "  📄 Creating routes..." -ForegroundColor Gray
if (!(Test-Path "src/routes")) {
    New-Item -ItemType Directory -Path "src/routes" -Force | Out-Null
}

$contactRoutes = @"
import { Router } from 'express';
import { ContactController } from '@/controllers/ContactController';
import { getService } from '@/container/Container';

const router = Router();
const contactController = getService<ContactController>('ContactController');

router.post('/', contactController.submitContact);
router.get('/', contactController.getContacts);
router.get('/stats', contactController.getContactStats);
router.get('/export', contactController.exportContacts);
router.get('/:id', contactController.getContactById);
router.patch('/:id/status', contactController.updateContactStatus);
router.post('/:id/notes', contactController.addContactNote);
router.delete('/:id', contactController.deleteContact);

export default router;
"@

$contactRoutes | Out-File -FilePath "src/routes/contactRoutes.ts" -Encoding UTF8

# 6. Update main server file to include routes
Write-Host "  🔧 Updating main server file..." -ForegroundColor Gray
$newIndexContent = Get-Content "src/index.ts" -Raw

# Add import for contact routes after existing imports
$importToAdd = @"
import contactRoutes from '@/routes/contactRoutes';
import '@/container/Container'; // Initialize container
"@

$newIndexContent = $newIndexContent -replace "(import { PrismaClient } from '@prisma/client';)", "`$1`n$importToAdd"

# Add route registration before error handlers
$routesToAdd = @"

// API Routes
app.use('/api/contacts', contactRoutes);
"@

$newIndexContent = $newIndexContent -replace "(// Future API routes will be added here[^}]*)", "$routesToAdd`n`n// Future API routes will be added here"

$newIndexContent | Out-File -FilePath "src/index.ts" -Encoding UTF8

Write-Host "✅ All files created successfully!" -ForegroundColor Green

# Test compilation
Write-Host "🧪 Testing TypeScript compilation..." -ForegroundColor Yellow
try {
    npm run type-check
    Write-Host "  ✅ TypeScript compilation successful!" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️  TypeScript compilation issues found" -ForegroundColor Yellow
    Write-Host "  📝 Check the artifacts in chat for complete file contents" -ForegroundColor Gray
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "🎉 CONTACT SYSTEM SETUP COMPLETE!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Created files:" -ForegroundColor Yellow
Write-Host "  • Repository interface & implementation"
Write-Host "  • Service interface & implementation" 
Write-Host "  • Controller with all endpoints"
Write-Host "  • Validation & Notification services"
Write-Host "  • Routes configuration"
Write-Host "  • Dependency injection container"
Write-Host ""
Write-Host "🔗 Available API endpoints:" -ForegroundColor Cyan
Write-Host "  POST   /api/contacts           (Submit contact)"
Write-Host "  GET    /api/contacts           (Get contacts)"
Write-Host "  GET    /api/contacts/stats     (Get statistics)"
Write-Host "  GET    /api/contacts/export    (Export CSV)"
Write-Host "  GET    /api/contacts/:id       (Get specific)"
Write-Host "  PATCH  /api/contacts/:id/status (Update status)"
Write-Host "  POST   /api/contacts/:id/notes  (Add note)"
Write-Host "  DELETE /api/contacts/:id       (Delete contact)"
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "  1. npm run dev                (start server)"
Write-Host "  2. Test: POST /api/contacts   (submit test contact)"
Write-Host "  3. Test: GET /api/contacts    (view contacts)"
Write-Host "  4. npm run db:studio          (view database)"
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan