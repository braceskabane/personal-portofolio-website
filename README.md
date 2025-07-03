# Portfolio Backend API

Backend API untuk sistem manajemen kontak portfolio.

## Quick Start

\\\ash
# Install dependencies
npm install

# Setup database
npm run db:generate
npm run db:push

# Start development server
npm run dev
\\\

## Available Scripts

- \
pm run dev\ - Start development server
- \
pm run build\ - Build production
- \
pm run start\ - Start production server
- \
pm run db:studio\ - Open database browser
- \
pm run type-check\ - Check TypeScript

## API Endpoints

- \GET /\ - API Info
- \GET /health\ - Health check
- \POST /api/contacts\ - Submit contact (coming soon)

## Environment Variables

Copy \.env\ and update values:
- \DATABASE_URL\ - Database connection
- \JWT_SECRET\ - JWT secret key
- \SMTP_*\ - Email configuration

## Tech Stack

- Express.js + TypeScript
- Prisma ORM + SQLite
- JWT Authentication
- Nodemailer for emails
