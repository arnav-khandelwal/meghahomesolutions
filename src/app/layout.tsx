import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import '../styles/globals.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-stack-body' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-stack-display' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-stack-serif' });

export const metadata: Metadata = {
  title: 'MeghaHome - Premium Real Estate & Financial Services',
  description: 'Luxury property consultancies, wealth management, and highly tailored financial services.',
  icons: {
    icon: '/assets/logo.jpeg',
  },
  openGraph: {
    title: 'MeghaHome - Premium Real Estate & Financial Services',
    description: 'Luxury property consultancies, wealth management, and highly tailored financial services.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
