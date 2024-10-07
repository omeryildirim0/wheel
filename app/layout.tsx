import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"; // Ensure this import path is correct
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Wheel of Meals - Find Your Next Meal Adventure',
  description: 'Spin the wheel to discover amazing restaurant options near you with the Wheel of Meals app. Perfect for those who can’t decide where to eat!',
  keywords: 'restaurant, food, meal, dining, eat out, restaurant finder, food wheel, Wheel of Meals, lunch, dinner, next meal, random restaurant picker, explore cuisine',
  authors: [{ name: 'Omer Yildirim' }], // Corrected property
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.wheelofmeals.com',
    title: 'Wheel of Meals - Find Your Next Meal Adventure',
    description: 'Can’t decide where to eat? Let the Wheel of Meals pick a restaurant for you. Discover and explore new dining experiences near you!',
    siteName: 'Wheel of Meals',
    images: [
      {
        url: 'https://www.wheelofmeals.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wheel of Meals Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@wheelofmeals',
    creator: '@omeryildirim',
    title: 'Wheel of Meals - Find Your Next Meal Adventure',
    description: 'Let the Wheel of Meals choose your next restaurant! Spin the wheel and explore great dining options nearby.',
    images: ['https://www.wheelofmeals.com/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head></head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
