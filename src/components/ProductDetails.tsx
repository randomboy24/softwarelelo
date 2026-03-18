// app/product/[id]/ProductDetails.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Laptop,
  Shield,
  Zap,
  KeyRound,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BuyNowButton } from "@/components/BuyNowButton";

interface ProductDetailsProps {
  product: any; // Replace with proper type
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const originalPrice = product.price * 1.4;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
          {/* Left Column: Visuals & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 shadow-2xl flex items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-emerald-500/10" />
              <Laptop className="h-32 w-32 text-slate-700 opacity-50" />
              <div className="absolute top-6 left-6 flex space-x-2">
                {product.badge && <Badge>{product.badge}</Badge>}
                <Badge variant="outline">{product.category}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ProductFeature
                icon={Shield}
                title="100% Genuine"
                subtitle="Verified digital license"
                iconColor="text-indigo-400"
              />
              <ProductFeature
                icon={Zap}
                title="Instant Delivery"
                subtitle="Email delivery in 5 mins"
                iconColor="text-emerald-400"
              />
              <ProductFeature
                icon={KeyRound}
                title={product.licenseType}
                subtitle="Digital key activation"
                iconColor="text-amber-400"
              />
              <ProductFeature
                icon={Clock}
                title="24/7 Support"
                subtitle="Expert technical help"
                iconColor="text-blue-400"
              />
            </div>
          </motion.div>

          {/* Right Column: Details & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
              {product.name}
            </h1>

            <div className="mt-4 flex items-end gap-4">
              <p className="text-5xl font-bold tracking-tight text-indigo-400">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-slate-400 mb-2 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </p>
              <Badge variant="secondary" className="mb-2">
                Save 40%
              </Badge>
            </div>

            <p className="mt-8 text-lg text-slate-300 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.features.map((feature: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-slate-300"
                  >
                    <CheckCircle2 className="mr-3 h-5 w-5 shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-10 flex flex-col sm:flex-row gap-4">
              <AddToCartButton
                product={product}
                size="lg"
                className="w-full text-lg h-14"
              />
              <BuyNowButton
                product={product}
                size="lg"
                variant="outline"
                className="w-full text-lg h-14"
              />
            </div>

            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-slate-500 border-t border-slate-800 pt-6">
              <span className="flex items-center">
                <Shield className="mr-1 h-4 w-4" /> SSL Secure Payment
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="mr-1 h-4 w-4" /> 30-Day Money Back
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Optional small helper component (can be inline if preferred)
function ProductFeature({ icon: Icon, title, subtitle, iconColor }: any) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 flex items-center gap-3">
      <Icon className={`h-6 w-6 ${iconColor}`} />
      <div className="text-sm">
        <p className="text-white font-medium">{title}</p>
        <p className="text-slate-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}
