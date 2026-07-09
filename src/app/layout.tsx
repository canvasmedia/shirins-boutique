import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteProvider } from '@/lib/context';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';
import WholesaleBanner from '@/components/WholesaleBanner';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Shirin's Boutique — Premium Indian Ethnic Wear",
  description: 'Discover handcrafted Indian ethnic wear — sarees, suits, lehengas, kurtis & tunics. Retail and wholesale available.',
  keywords: 'sarees, suits, lehengas, kurtis, Indian ethnic wear, wholesale, boutique',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased" style={{ background: '#F7F2EA' }}>
        <SiteProvider>
          <CustomCursor />
          <AnnouncementBar />
          <Header />
          <WholesaleBanner />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </SiteProvider>
      </body>
    </html>
  );
}
