// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import ClientProviders from '../components/ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog Dashboard',
  description: 'A simple blog dashboard built with Next.js, TypeScript, MUI, and RTK Query',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
