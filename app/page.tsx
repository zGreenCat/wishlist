"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Hero } from "@/components/wishlist/hero";
import { FilterBar } from "@/components/wishlist/filter-bar";
import { GiftGrid } from "@/components/wishlist/gift-grid";
import {
  wishlistItems,
  siteConfig,
  type Category,
  type PriceRange,
} from "@/data/wishlist";

export default function WishlistPage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | "all">("all");

  useEffect(() => {
    if (hasAnimatedRef.current) return;
    if (!pageRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      hasAnimatedRef.current = true;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-animate='hero']",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.14,
        }
      );

      gsap.fromTo(
        "[data-animate='card']",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.2,
        }
      );
    }, pageRef);

    hasAnimatedRef.current = true;
    return () => ctx.revert();
  }, []);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedPriceRange !== "all") count++;
    if (searchQuery) count++;
    return count;
  }, [selectedCategory, selectedPriceRange, searchQuery]);

  // Filter items
  const filteredItems = useMemo(() => {
    return wishlistItems.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== "all" && item.priceRange !== selectedPriceRange) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPriceRange("all");
  };

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <main ref={pageRef} className="min-h-screen bg-background">
      {/* Hero section */}
      <Hero name={siteConfig.name} birthday={siteConfig.birthday} />

      {/* Filter bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={setSelectedPriceRange}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={clearFilters}
      />

      {/* Unified products section */}
      <GiftGrid
        items={filteredItems}
        title="Ideas de referencia"
        subtitle={
          hasActiveFilters
            ? `${filteredItems.length} ${filteredItems.length === 1 ? "resultado" : "resultados"}`
            : "Todas las referencias en una sola seccion"
        }
      />
    </main>
  );
}
