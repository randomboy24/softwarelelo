"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { searchProducts } from "@/lib/search";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return searchProducts(query, products).map((r) => r.product);
  }, [query]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-linear-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Search className="h-6 w-6 text-indigo-500" />
            <h1 className="text-4xl font-bold text-white">Search Results</h1>
          </div>

          {query && (
            <p className="text-lg text-slate-300">
              Found{" "}
              <span className="text-indigo-400 font-semibold">
                {results.length}
              </span>{" "}
              {results.length === 1 ? "result" : "results"} for{" "}
              <span className="text-white font-semibold">
                &quot;{query}&quot;
              </span>
            </p>
          )}
        </motion.div>

        {/* Empty State */}
        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16 flex flex-col items-center justify-center py-24"
          >
            <div className="rounded-full bg-slate-800/50 p-6 mb-6">
              <Search className="h-12 w-12 text-slate-500" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              No products found
            </h2>

            <p className="text-slate-400 text-center max-w-md mb-8">
              {query
                ? `We couldn't find any software matching "${query}". Try a different search term.`
                : "Enter a search term to find software."}
            </p>

            <Button asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Results Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12"
            >
              {results.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Explore More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 border-t border-slate-800 pt-12"
            >
              <SectionHeader
                title="Can't find what you're looking for?"
                description="Browse all our software products and find the perfect solution for you."
                className="text-center items-center"
              />

              <div className="mt-8 flex justify-center">
                <Button size="lg" asChild className="px-8">
                  <Link href="/">View All Products</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
