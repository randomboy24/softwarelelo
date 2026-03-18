"use client";

import * as React from "react";
import Link from "next/link";
import { Laptop, UserCircle } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Show } from "@clerk/react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-white transition-opacity hover:opacity-80"
            >
              <Laptop className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold tracking-tight hidden sm:inline">
                SoftwareLelo
              </span>
            </Link>
          </div>

          <SearchBar />

          <div className="flex items-center gap-3 shrink-0">
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />
            <CartDrawer />
            <div className="hidden sm:flex items-center gap-2">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden lg:inline-flex"
                  >
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="hidden sm:inline-flex gap-2">
                    <UserCircle className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-3">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          "h-9 w-9 ring-2 ring-indigo-500/20",
                      },
                    }}
                  />
                </div>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
