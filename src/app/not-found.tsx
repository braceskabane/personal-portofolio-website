// ================================
// src/app/not-found.tsx
// ================================

import React from 'react';
import Link from 'next/link';
import { Button, Card } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Card variant="glass" padding="large">
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <h2 className="text-2xl text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you are looking for does not exist.
          </p>
          <Link href="/">
            <Button variant="primary" size="large">
              Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}