"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getSearchSuggestions } from "@/lib/search";
import { products } from "@/data/products";
import Link from "next/link";

export function SearchBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const suggestionsRef = React.useRef<HTMLUListElement>(null);
  const router = useRouter();

  const suggestions = React.useMemo(() => {
    if (!query.trim()) return [];
    return getSearchSuggestions(query, products);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (suggestions.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        router.push(`/s?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          router.push(`/product/${suggestions[selectedIndex].id}`);
          setQuery("");
          setIsOpen(false);
        } else if (query.trim()) {
          router.push(`/s?q=${encodeURIComponent(query)}`);
          setIsOpen(false);
        }
        break;
    }
  };

  React.useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const selected = suggestionsRef.current.children[selectedIndex];
      if (selected) {
        selected.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="relative flex-1 max-w-lg">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors">
        <Search className="h-4 w-4 text-slate-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search software..."
          className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setSelectedIndex(-1);
            }}
            className="p-1 text-slate-400 hover:bg-slate-700 hover:text-white rounded transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => {
            if (query.trim()) {
              router.push(`/s?q=${encodeURIComponent(query)}`);
              setIsOpen(false);
            }
          }}
          className="p-1 text-slate-400 hover:bg-indigo-600 hover:text-white rounded transition-colors shrink-0"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* Dropdown suggestions */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.1 }}
            className="absolute top-full mt-2 left-0 right-0 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <ul ref={suggestionsRef} className="py-2">
              {suggestions.map((product, idx) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => {
                      setQuery("");
                      setIsOpen(false);
                    }}
                    className={`block px-4 py-2.5 transition-colors ${
                      selectedIndex === idx
                        ? "bg-indigo-600/30 text-indigo-200"
                        : "hover:bg-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {product.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {product.description}
                        </div>
                      </div>
                      <div className="text-xs text-emerald-500 font-semibold whitespace-nowrap shrink-0">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
