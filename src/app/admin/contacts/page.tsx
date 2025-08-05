'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const AdminContactsPage = dynamic(
  () => import('@/components/admin/AdminContactsPage'),
  { ssr: false }
);

export default function AdminContactsPageRoute() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminContactsPage />
    </div>
  );
}
