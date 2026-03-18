"use client";

import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, DownloadCloud, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number for simulation
    setOrderNumber(`ORD-${Math.floor(Math.random() * 1000000)}`);
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/50 p-8 md:p-12 text-center shadow-2xl backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
        >
          <CheckCircle className="h-12 w-12" />
        </motion.div>
        
        <h1 className="mb-4 text-4xl font-extrabold text-white tracking-tight">Payment Successful!</h1>
        <p className="mb-2 text-lg text-slate-300">
          Thank you for your purchase. Your digital licenses have been activated.
        </p>
        
        <div className="my-10 inline-flex flex-col items-center justify-center rounded-2xl bg-slate-800/50 p-6 border border-slate-700/50 min-w-[300px]">
          <span className="text-sm font-medium text-slate-400 mb-1">Order Reference</span>
          <span className="text-2xl font-mono font-bold text-indigo-400">{orderNumber}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left w-full max-w-lg mx-auto">
          <div className="bg-slate-800/30 border border-slate-800 rounded-xl p-4 flex gap-4 items-center">
            <Mail className="h-8 w-8 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-semibold text-white">Check Your Email</h4>
              <p className="text-xs text-slate-400 mt-1">We've sent your product keys and invoice.</p>
            </div>
          </div>
          <div className="bg-slate-800/30 border border-slate-800 rounded-xl p-4 flex gap-4 items-center">
            <DownloadCloud className="h-8 w-8 text-blue-400 shrink-0" />
            <div>
              <h4 className="font-semibold text-white">License Portal</h4>
              <p className="text-xs text-slate-400 mt-1">Access downloads in your account.</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
            <Link href="#">
              <Package className="mr-2 h-5 w-5" /> View My Orders
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
            <Link href="/">
              Continue Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
