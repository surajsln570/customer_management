import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toast';

export const metadata: Metadata = {
  title: 'Pharmacy POS',
  description: 'GST-compliant pharmacy POS - inventory, batch/expiry tracking, billing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html >
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
