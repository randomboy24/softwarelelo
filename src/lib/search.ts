import { Product } from "@/types";

interface SearchResult {
  product: Product;
  score: number;
  matchType: "name" | "description" | "feature";
}

/**
 * Simple fuzzy matching that checks if chars appear in order
 */
function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qIdx = 0;

  for (let i = 0; i < t.length && qIdx < q.length; i++) {
    if (t[i] === q[qIdx]) {
      qIdx++;
    }
  }

  return qIdx === q.length;
}

/**
 * Calculate match score based on position and type
 */
function calculateScore(
  query: string,
  text: string,
  matchType: "name" | "description" | "feature",
): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  const index = t.indexOf(q);

  // Base scores by match type (name > feature > description)
  const baseScores = {
    name: 100,
    feature: 75,
    description: 50,
  };

  if (index === -1) return 0;

  const baseScore = baseScores[matchType];
  // Early matches score higher
  const positionBonus = Math.max(0, 25 - index);
  // Exact case match bonus
  const caseBonus = text.substring(index, index + q.length) === q ? 10 : 0;
  // Full word match bonus
  const wordBoundary =
    (index === 0 || !/[a-zA-Z0-9]/.test(t[index - 1])) &&
    (index + q.length === t.length || !/[a-zA-Z0-9]/.test(t[index + q.length]));
  const wordBonus = wordBoundary ? 15 : 0;

  return baseScore + positionBonus + caseBonus + wordBonus;
}

/**
 * Search products with relevance ranking (no category filtering)
 */
export function searchProducts(
  query: string,
  products: Product[],
): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const results: SearchResult[] = [];
  const q = query.toLowerCase();

  for (const product of products) {
    let bestScore = 0;
    let bestMatchType: "name" | "description" | "feature" = "description";

    // Check name (exact > fuzzy)
    if (product.name.toLowerCase().includes(q)) {
      const score = calculateScore(query, product.name, "name");
      if (score > bestScore) {
        bestScore = score;
        bestMatchType = "name";
      }
    } else if (fuzzyMatch(query, product.name)) {
      const score = calculateScore(query, product.name, "name") * 0.7; // fuzzy penalty
      if (score > bestScore) {
        bestScore = score;
        bestMatchType = "name";
      }
    }

    // Check description (exact > fuzzy)
    if (product.description.toLowerCase().includes(q)) {
      const score = calculateScore(query, product.description, "description");
      if (score > bestScore) {
        bestScore = score;
        bestMatchType = "description";
      }
    } else if (fuzzyMatch(query, product.description)) {
      const score =
        calculateScore(query, product.description, "description") * 0.7;
      if (score > bestScore) {
        bestScore = score;
        bestMatchType = "description";
      }
    }

    // Check features
    for (const feature of product.features) {
      if (feature.toLowerCase().includes(q)) {
        const score = calculateScore(query, feature, "feature");
        if (score > bestScore) {
          bestScore = score;
          bestMatchType = "feature";
        }
      } else if (fuzzyMatch(query, feature)) {
        const score = calculateScore(query, feature, "feature") * 0.7;
        if (score > bestScore) {
          bestScore = score;
          bestMatchType = "feature";
        }
      }
    }

    if (bestScore > 0) {
      results.push({
        product,
        score: bestScore,
        matchType: bestMatchType,
      });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Get instant suggestions (top 5 products matching query)
 */
export function getSearchSuggestions(
  query: string,
  products: Product[],
): Product[] {
  const results = searchProducts(query, products);
  return results.slice(0, 5).map((r) => r.product);
}
