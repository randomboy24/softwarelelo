"use client";

import * as React from "react";
import { Zap } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button, ButtonProps } from "@/components/ui/button";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser, SignInButton } from "@clerk/nextjs";

interface BuyNowButtonProps extends Omit<ButtonProps, "onClick"> {
  product: Product;
  showIcon?: boolean;
}

export function BuyNowButton({
  product,
  showIcon = true,
  className,
  variant = "outline",
  ...props
}: BuyNowButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Button disabled>Loading...</Button>;
  }

  const handleCheckout = () => {
    addItem(product);
    if (isSignedIn) {
      router.push("/checkout");
    }
  };

  const buttonUI = (
    <Button
      onClick={handleCheckout}
      variant={variant}
      className={cn("group relative overflow-hidden", className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {showIcon && (
          <Zap className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
        )}
        Buy Now
      </span>
      <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Button>
  );

  // If already signed in → go to checkout
  if (isSignedIn) {
    return buttonUI;
  }

  // If NOT signed in → show Clerk sign-in modal
  return (
    <SignInButton
      mode="modal"
      forceRedirectUrl="/checkout"
      fallbackRedirectUrl="/checkout"
    >
      {buttonUI}
    </SignInButton>
  );
}
