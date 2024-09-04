import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider"; // Adjust the import path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wheel of Meals",
  description: "A fun way to decide where to eat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
