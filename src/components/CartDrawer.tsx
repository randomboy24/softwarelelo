"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { items, removeItem, updateQuantity, total } = useCart();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleDrawer}
            className="fixed inset-0 z-100 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-101 flex w-full max-w-sm flex-col border-l border-slate-800 bg-slate-900 shadow-2xl shadow-indigo-500/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 p-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Your Cart</h2>
                <span className="ml-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                  {items.length} items
                </span>
              </div>
              <button
                onClick={toggleDrawer}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-800">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-slate-400">
                  <div className="rounded-full bg-slate-800/50 p-6">
                    <ShoppingCart className="h-12 w-12 opacity-20" />
                  </div>
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <Button variant="outline" onClick={toggleDrawer}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-slate-200 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-sm font-semibold text-indigo-400">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center rounded-md border border-slate-700 bg-slate-800/50 overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-10 select-none text-center text-sm font-medium text-white bg-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-all ml-auto"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-800 bg-slate-900/90 p-6 backdrop-blur-md sticky bottom-0 z-20">
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Platform Fee</span>
                    <span className="text-emerald-400">Free</span>
                  </div>
                  <div className="mt-4 flex justify-between border-t border-slate-800 pt-4 text-xl font-bold text-white">
                    <span>Total</span>
                    <div className="text-right">
                      <p className="text-indigo-400">₹{total.toLocaleString("en-IN")}</p>
                      <p className="text-[10px] font-normal text-slate-500">Inclusive of all taxes</p>
                    </div>
                  </div>
                </div>
                <Button onClick={handleCheckout} className="w-full text-lg h-14 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20" size="lg">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="relative p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800"
      >
        <ShoppingCart className="h-5 w-5" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-slate-900 animate-in zoom-in duration-300">
            {items.length}
          </span>
        )}
      </button>

      {mounted && createPortal(drawerContent, document.body)}
    </>
  );
}

