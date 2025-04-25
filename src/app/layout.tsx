import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const font = Space_Mono({
  subsets: ["latin"],
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Tip calculator app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased flex flex-col h-screen',
          font.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
