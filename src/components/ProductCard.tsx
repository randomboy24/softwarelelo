"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BuyNowButton } from "@/components/BuyNowButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-0 shadow-xl backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:shadow-indigo-500/10"
    >
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-0">
        <span className="sr-only">View {product.name}</span>
      </Link>

      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden border-b border-slate-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {product.badge && (
          <Badge variant="secondary" className="absolute top-4 left-4 z-10">
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-col grow p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-slate-400 mt-1">{product.category}</p>
        </div>

        <div className="mb-6 grow">
          <p className="text-slate-300 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
          <ul className="space-y-2">
            {product.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center text-xs text-slate-400">
                <CheckCircle2 className="mr-2 h-3 w-3 text-emerald-500" />
                {feature}
              </li>
            ))}
            {product.features.length > 3 && (
              <li className="text-xs text-slate-500 pl-5">
                +{product.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
          <div>
            <p className="text-2xl font-bold text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-slate-500">{product.licenseType}</p>
          </div>
          
          <div className="flex gap-2 z-10">
            <AddToCartButton 
              product={product} 
              showText={false} 
              variant="outline" 
              size="icon"
            />
            <BuyNowButton 
              product={product}
              showIcon={false}
              variant="default"
              size="sm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
