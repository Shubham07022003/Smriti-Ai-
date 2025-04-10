import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../app/globals.css";
import AuthGate from "@/components/AuthGate";

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
<<<<<<< HEAD
      // <AuthGate>{children}</AuthGate>
      <div>{children}</div>
=======
    <AuthGate>{children}</AuthGate>
    // <div>{children}</div>
>>>>>>> 8b6df53653452efae072141f8af0ba5f9d4ac6e5
  );
}
