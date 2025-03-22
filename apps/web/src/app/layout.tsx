import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#0891b2',
};

export const metadata: Metadata = {
  title: "My Skin Metrix",
  description: "AI 기반 피부 분석 서비스 - 당신의 피부 타입을 지금 확인해보세요!",
  metadataBase: new URL('https://myskinmetrix.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192' },
      { url: '/icon-512.png', sizes: '512x512' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: 'My Skin Metrix - 당신만의 피부 분석',
    description: 'AI 기술로 분석하는, 당신만의 피부 이야기. 지금 무료로 시작해보세요!',
    url: 'https://myskinmetrix.vercel.app',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'My Skin Metrix - 피부 분석 결과 공유',
      },
    ],
    siteName: 'My Skin Metrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Skin Metrix - 당신만의 피부 분석',
    description: 'AI 기술로 분석하는, 당신만의 피부 이야기. 지금 무료로 시작해보세요!',
    images: ['/icon-512.png'],
    creator: '@myskinmetrix',
  },
  appleWebApp: {
    capable: true,
    title: 'My Skin Metrix',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
