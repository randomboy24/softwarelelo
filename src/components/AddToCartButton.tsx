"use client";

import * as React from "react";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button, ButtonProps } from "@/components/ui/button";
import { Product } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  product: Product;
  showText?: boolean;
}

export function AddToCartButton({ 
  product, 
  showText = true, 
  className,
  variant = "default",
  ...props 
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      className={cn(
        "transition-all duration-300",
        added && "border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400",
        className
      )}
      {...props}
    >
      {added ? (
        <CheckCircle2 className={cn("h-4 w-4", showText && "mr-2")} />
      ) : (
        <ShoppingCart className={cn("h-4 w-4", showText && "mr-2")} />
      )}
      {showText && (added ? "Added" : "Add to Cart")}
    </Button>
  );
}
