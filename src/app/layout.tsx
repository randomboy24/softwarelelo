import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "sonner";
import { ClerkProvider, Show, SignInButton, SignUpButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoftwareLelo - Premium Software Keys & Licenses",
  description:
    "Get 100% genuine software keys, operating systems, antivirus, and office products with instant delivery and 24/7 support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-slate-950 text-slate-50 flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        {/* Simulated Authentication Provider wrapper can be envisioned here */}
        <ClerkProvider>
          {/* <Show when="signed-in"> */}
          <CartProvider>
            <Navbar />
            <main className="grow pt-16">{children}</main>
            <Footer />
            <Toaster theme="dark" position="bottom-right" />
          </CartProvider>
          {/* </Show> */}
          {/* <Show when="signed-out">
            <SignInButton></SignInButton>
            <SignUpButton></SignUpButton>
          </Show> */}
        </ClerkProvider>
      </body>
    </html>
  );
}
