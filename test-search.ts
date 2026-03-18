import { searchProducts, getSearchSuggestions } from "@/lib/search";
import { products } from "@/data/products";

// Test cases
const testQueries = [
  "windows",
  "office",
  "security",
  "pro",
  "wnd", // fuzzy match
  "mcfe", // fuzzy match
  "ransomware",
];

console.log("🔍 Amazon-style Search Testing\n");
console.log("================================\n");

testQueries.forEach((query) => {
  const results = searchProducts(query, products);
  const suggestions = getSearchSuggestions(query, products);

  console.log(`Query: "${query}"`);
  console.log(`Total Results: ${results.length}`);
  console.log(`Top Suggestions: ${suggestions.length}`);

  if (suggestions.length > 0) {
    suggestions.forEach((p, idx) => {
      console.log(`  ${idx + 1}. ${p.name} - ₹${p.price}`);
    });
  }

  console.log();
});
