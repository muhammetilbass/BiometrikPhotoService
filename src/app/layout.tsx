import React from 'react';
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BiyometrikFoto - Yapay Zeka Destekli Biyometrik Fotoğraf Oluşturma',
  description: 'Pasaport, ehliyet, ÖSYM sınavları ve iş başvuruları için uluslararası standartlara uygun biyometrik fotoğraflar oluşturun.',
  keywords: 'biyometrik fotoğraf, pasaport fotoğrafı, ehliyet fotoğrafı, yapay zeka, ÖSYM fotoğraf, vesikalık',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 