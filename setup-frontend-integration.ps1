# ================================
# FRONTEND INTEGRATION SETUP
# File: setup-frontend-integration.ps1
# ================================

Write-Host "🎨 SETTING UP FRONTEND INTEGRATION..." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan

# Check if we're in the frontend directory
if (!(Test-Path "next.config.js") -and !(Test-Path "next.config.ts")) {
    Write-Host "❌ This script should be run from the frontend directory" -ForegroundColor Red
    Write-Host "💡 Please navigate to your frontend-dev folder first" -ForegroundColor Yellow
    exit 1
}

Write-Host "📁 Current directory: $PWD" -ForegroundColor Yellow

# 1. Update .env.local with backend API URL
Write-Host "🔧 Setting up environment variables..." -ForegroundColor Yellow

$envContent = @"
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Your existing environment variables...
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyD8iTGCLpmP9qIp4Iz5CbasdUMHITTa8Z31
"@

# Check if .env.local exists
if (Test-Path ".env.local") {
    $currentEnv = Get-Content ".env.local" -Raw
    if ($currentEnv -notmatch "NEXT_PUBLIC_API_URL") {
        Add-Content ".env.local" "`n# Backend API URL`nNEXT_PUBLIC_API_URL=http://localhost:5000"
        Write-Host "  ✅ Added API URL to existing .env.local" -ForegroundColor Green
    } else {
        Write-Host "  ✅ API URL already configured in .env.local" -ForegroundColor Green
    }
} else {
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "  ✅ Created .env.local with API configuration" -ForegroundColor Green
}

# 2. Create admin dashboard page
Write-Host "📝 Creating admin dashboard..." -ForegroundColor Yellow

# Create admin directory if it doesn't exist
if (!(Test-Path "src/app/admin")) {
    New-Item -ItemType Directory -Path "src/app/admin" -Force | Out-Null
    Write-Host "  📁 Created admin directory" -ForegroundColor Gray
}

# Create a simple admin page (you can replace this with the full admin dashboard)
$adminPageContent = @"
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Contact management system powered by your backend API
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold mb-4">Backend API Status</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Backend Server</h3>
                <p className="text-sm text-gray-600">http://localhost:5000</p>
              </div>
              <a 
                href="http://localhost:5000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                Test API <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Health Check</h3>
                <p className="text-sm text-gray-600">Server status and database</p>
              </div>
              <a 
                href="http://localhost:5000/health" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                Check Health <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Contact Submissions</h3>
                <p className="text-sm text-gray-600">View all contact form submissions</p>
              </div>
              <a 
                href="http://localhost:5000/api/contacts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                View API <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Setup Complete! 🎉</h3>
            <p className="text-sm text-blue-800">
              Your contact form is now connected to the backend API. 
              Submit a test message from the contact section to see it in action.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-3">Quick Actions:</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/#contact"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Contact Form
              </Link>
              <a 
                href="http://localhost:5000/api/contacts/stats" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                View Statistics
              </a>
              <a 
                href="http://localhost:5000/api/contacts/export" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Export CSV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"@

$adminPageContent | Out-File -FilePath "src/app/admin/page.tsx" -Encoding UTF8
Write-Host "  ✅ Created admin dashboard page" -ForegroundColor Green

# 3. Check if ContactSection exists and needs updating
Write-Host "🔍 Checking contact section..." -ForegroundColor Yellow

$contactSectionPath = "src/components/sections/ContactSection/ContactSection.tsx"
if (Test-Path $contactSectionPath) {
    Write-Host "  ✅ ContactSection found" -ForegroundColor Green
    Write-Host "  💡 You'll need to update it with the new API integration code" -ForegroundColor Yellow
    Write-Host "     Check the 'Frontend Integration - Updated Contact Form' artifact in the chat" -ForegroundColor Cyan
} else {
    Write-Host "  ⚠️  ContactSection not found at expected path" -ForegroundColor Yellow
    Write-Host "  📍 Expected: $contactSectionPath" -ForegroundColor Gray
}

# 4. Create a test API utility
Write-Host "🔧 Creating API utility..." -ForegroundColor Yellow

if (!(Test-Path "src/utils")) {
    New-Item -ItemType Directory -Path "src/utils" -Force | Out-Null
}

$apiUtilContent = @"
// API utility for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export class ApiClient {
  static async submitContact(contactData: any): Promise<ApiResponse> {
    try {
      const response = await fetch(`{"$"}{API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit contact');
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Network error occurred');
    }
  }

  static async getContacts(filters?: any): Promise<ApiResponse> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, String(value));
        });
      }

      const response = await fetch(`{"$"}{API_BASE_URL}/api/contacts?{"$"}{params.toString()}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch contacts');
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Network error occurred');
    }
  }

  static async getContactStats(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/stats`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch stats');
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Network error occurred');
    }
  }

  static async updateContactStatus(contactId: string, status: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${contactId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status');
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Network error occurred');
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default ApiClient;
"@

$apiUtilContent | Out-File -FilePath "src/utils/api.ts" -Encoding UTF8
Write-Host "  ✅ Created API utility" -ForegroundColor Green

# 5. Create a simple contact hook
Write-Host "🔧 Creating contact hook..." -ForegroundColor Yellow

if (!(Test-Path "src/hooks")) {
    New-Item -ItemType Directory -Path "src/hooks" -Force | Out-Null
}

$contactHookContent = @"
import { useState } from 'react';
import ApiClient, { ApiResponse } from '@/utils/api';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  country: string;
}

export const useContactSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitContact = async (contactData: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await ApiClient.submitContact(contactData);
      
      if (result.success) {
        setSuccess(true);
        return result.data;
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setIsSubmitting(false);
  };

  return {
    isSubmitting,
    error,
    success,
    submitContact,
    resetState
  };
};
"@

$contactHookContent | Out-File -FilePath "src/hooks/useContactSubmission.ts" -Encoding UTF8
Write-Host "  ✅ Created contact submission hook" -ForegroundColor Green

# 6. Check if backend is running
Write-Host "🔍 Checking backend server status..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -TimeoutSec 5 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ Backend server is running!" -ForegroundColor Green
        $healthData = $response.Content | ConvertFrom-Json
        Write-Host "  📊 Status: $($healthData.status)" -ForegroundColor Gray
        Write-Host "  🗄️  Database: $($healthData.database)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ❌ Backend server is not running" -ForegroundColor Red
    Write-Host "  💡 Start backend with: npm run dev (in backend-dev folder)" -ForegroundColor Yellow
}

# 7. Test contact form integration
Write-Host "🧪 Creating test script..." -ForegroundColor Yellow

$testScript = @"
// Test script for contact form integration
// Run this in browser console on your contact page

async function testContactFormAPI() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Contact from Frontend',
    message: 'This is a test message to verify the integration between frontend and backend.',
    phone: '+1234567890',
    company: 'Test Company',
    country: 'US'
  };

  try {
    console.log('🧪 Testing contact form API...');
    
    const response = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Contact form API test successful!');
      console.log('📄 Response:', result);
      return result;
    } else {
      console.error('❌ API test failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

// Run the test
testContactFormAPI();
"@

$testScript | Out-File -FilePath "test-contact-api.js" -Encoding UTF8
Write-Host "  ✅ Created API test script" -ForegroundColor Green

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "🎉 FRONTEND INTEGRATION SETUP COMPLETE!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 What was set up:" -ForegroundColor Yellow
Write-Host "  ✅ Environment variables (.env.local)"
Write-Host "  ✅ Admin dashboard page (/admin)"
Write-Host "  ✅ API utility (src/utils/api.ts)"
Write-Host "  ✅ Contact submission hook"
Write-Host "  ✅ Test script (test-contact-api.js)"
Write-Host ""
Write-Host "🔗 URLs to test:" -ForegroundColor Cyan
Write-Host "  • Frontend: http://localhost:3000"
Write-Host "  • Backend:  http://localhost:5000"
Write-Host "  • Admin:    http://localhost:3000/admin"
Write-Host "  • Health:   http://localhost:5000/health"
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Start frontend: npm run dev"
Write-Host "  2. Ensure backend is running on port 5000"
Write-Host "  3. Update ContactSection with new integration code"
Write-Host "  4. Test contact form submission"
Write-Host "  5. Visit /admin to check backend status"
Write-Host ""
Write-Host "📝 Manual tasks needed:" -ForegroundColor Yellow
Write-Host "  • Replace ContactSection.tsx with updated code from chat"
Write-Host "  • Test the integration by submitting a contact form"
Write-Host "  • Check the admin dashboard"
Write-Host ""
Write-Host "🧪 Test integration:" -ForegroundColor Cyan
Write-Host "  1. Go to your contact form"
Write-Host "  2. Open browser console"
Write-Host "  3. Run the test script: copy from test-contact-api.js"
Write-Host ""
Write-Host "🔧 If backend not running:" -ForegroundColor Gray
Write-Host "  cd ../backend-dev && npm run dev"
Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan