import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Toaster } from '@/registry/default/ui/sonner';
import { Inter } from 'next/font/google';
import { siteConfig } from '../config/site-config';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    'shadcn',
    'tag input',
    'shadcn/ui',
    'shadcn tag input',
    'tag input component',
    'shadcn tag input component',
    'input',
    'radix ui',
    'react tag input',
  ],
  authors: [
    {
      name: 'Bayram KELES',
      url: 'https://bayramkeles.com',
    },
  ],
  creator: 'Bayram KELES',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@bayramkeles',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="smooth-scroll" lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
