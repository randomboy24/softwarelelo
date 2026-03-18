"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const router = useRouter();

  // Redirect to home if cart is empty after initial mount
  React.useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      router.push("/");
    }
  }, [items, router, isProcessing]);

  if (items.length === 0 && !isProcessing) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push("/success");
    }, 2500);
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-24 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Checkout</h1>
          
          <form id="checkout-form" onSubmit={handlePayment} className="space-y-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-sm">1</span> 
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-300">First Name</label>
                  <input required id="firstName" type="text" className="w-full rounded-md border border-slate-700 bg-slate-800 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-300">Last Name</label>
                  <input required id="lastName" type="text" className="w-full rounded-md border border-slate-700 bg-slate-800 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address (for instant digital delivery)</label>
                  <input required id="email" type="email" className="w-full rounded-md border border-slate-700 bg-slate-800 p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-sm">2</span> 
                Payment
              </h2>
              <div className="rounded-md border border-indigo-500/50 bg-indigo-500/10 p-4 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-indigo-400" />
                  <span className="text-white font-medium">Credit/Debit Card via Razorpay</span>
                </div>
                <div className="h-4 w-4 rounded-full border-4 border-indigo-500 bg-white" />
              </div>

              <div className="space-y-4 opacity-50 pointer-events-none">
                 {/* Simulated disabled form just for aesthetic purposes since Razorpay modal opens over it usually */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Card Number</label>
                  <input disabled type="text" placeholder="**** **** **** ****" className="w-full rounded-md border border-slate-700 bg-slate-800 p-3 text-slate-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Expiry Date</label>
                    <input disabled type="text" placeholder="MM/YY" className="w-full rounded-md border border-slate-700 bg-slate-800 p-3 text-slate-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">CVC</label>
                    <input disabled type="text" placeholder="123" className="w-full rounded-md border border-slate-700 bg-slate-800 p-3 text-slate-500" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> This is a secure 128-bit SSL encrypted payment.
              </p>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden text-sm">
            <div className="bg-slate-800/50 p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white tracking-tight">Order Summary</h2>
            </div>
            <div className="p-6">
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <p className="text-slate-200 font-medium">{item.name}</p>
                      <p className="text-slate-500 text-xs mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t border-slate-800">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (Included)</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between font-bold text-white text-xl pt-4 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-indigo-400">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full mt-6 h-14 text-lg"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                    />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Place Order & Pay <CheckCircle2 className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
