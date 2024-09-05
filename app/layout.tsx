import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes"; // Import from next-themes

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
    // Ensure no whitespace around <html> tag
    <html lang="en" className={inter.className} suppressHydrationWarning>
      {/* Avoid whitespace between <html> and <head> */}
      <head></head>
      <body>
        {/* Wrap children with ThemeProvider without extra whitespace */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
