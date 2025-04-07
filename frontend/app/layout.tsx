import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smriti AI",
  description: "Smriti AI - Remember Smarter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" className="dark">
      <body className={`${poppins.variable} antialiased`}>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
            {/* <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut> 
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </header>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
