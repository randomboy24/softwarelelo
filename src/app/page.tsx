"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Clock, PackageCheck } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const hotDeals = products.filter(p => p.badge === "HOT DEAL" || p.price < 2000);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 rounded-full bg-slate-800/50 border border-slate-700 px-3 py-1 text-sm font-medium text-indigo-400 backdrop-blur-sm"
          >
            🔥 BEST SOFTWARE PRICES 2026
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6 leading-tight"
          >
            Premium Software Keys & <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-emerald-400">Digital Licenses</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-slate-400 mb-10"
          >
            Upgrade your digital workspace with 100% genuine software keys. Instant delivery directly to your inbox, backed by 16/7 expert support.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" asChild>
              <Link href="#all-products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg" asChild>
              <Link href="#hot-deals">View Hot Deals</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Why Trust SoftwareLelo?" 
            description="We provide the highest quality digital products with a seamless purchasing experience."
            className="text-center items-center"
          />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12"
          >
            {[
              { icon: ShieldCheck, title: "100% Original Keys", desc: "All our keys are directly sourced and guaranteed genuine." },
              { icon: Zap, title: "Instant Delivery", desc: "Get your product key within 5 minutes of purchase." },
              { icon: Clock, title: "16/7 Support", desc: "Expert technical support available 16 hours, 7 days a week." },
              { icon: PackageCheck, title: "Secure Payments", desc: "SSL encrypted checkout and trusted payment gateways." }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
                <div className="mb-4 rounded-full bg-indigo-500/10 p-4">
                  <feature.icon className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section id="hot-deals" className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="🔥 Hot Deals & Bestsellers" 
            description="Grab our most popular software at unbeatable prices."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section id="all-products" className="py-24 bg-slate-900/20 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="All Software Products" 
            description="Browse our complete catalog of operating systems, office suites, and security software."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
