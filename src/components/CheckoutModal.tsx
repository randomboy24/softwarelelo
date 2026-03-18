"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const router = useRouter();

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      onClose();
      router.push("/success");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-800 p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-indigo-400" /> Secure Checkout
            </h2>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6 space-y-4 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex bg-slate-800/50 rounded-md p-2 w-full gap-3">
                    <span className="text-slate-300 flex-1">{item.name} <span className="text-slate-500">x{item.quantity}</span></span>
                    <span className="font-medium text-white">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 mb-8">
              <div className="flex justify-between items-center text-lg font-bold text-white">
                <span>Total Amount</span>
                <span className="text-indigo-400">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Secure payment processing via Razorpay (Simulated)
              </p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing || items.length === 0}
              className="w-full h-12 text-lg relative"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                  />
                  Processing Payment...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Pay ₹{total.toLocaleString("en-IN")} <CheckCircle className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
