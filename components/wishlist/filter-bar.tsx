"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories, priceRanges, type Category, type PriceRange } from "@/data/wishlist";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
  selectedPriceRange: PriceRange | "all";
  onPriceRangeChange: (range: PriceRange | "all") => void;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  activeFiltersCount,
  onClearFilters,
}: FilterBarProps) {
  const FiltersContent = () => (
    <div className="flex flex-col gap-4">
      {/* Category filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Categoría</label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => onCategoryChange(value as Category | "all")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Rango de precio</label>
        <Select
          value={selectedPriceRange}
          onValueChange={(value) => onPriceRangeChange(value as PriceRange | "all")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todos los precios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los precios</SelectItem>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label} - {range.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <section className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar productos o referencias..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Desktop filters */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Select
              value={selectedCategory}
              onValueChange={(value) => onCategoryChange(value as Category | "all")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPriceRange}
              onValueChange={(value) => onPriceRangeChange(value as PriceRange | "all")}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="mr-1 h-4 w-4" />
                Limpiar
              </Button>
            )}
          </div>

          {/* Mobile filter button */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Filtrar productos</SheetTitle>
                  <SheetDescription>
                    Encuentra referencias usando estos filtros.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      className="mt-4 w-full"
                      onClick={onClearFilters}
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active filters display */}
        {activeFiltersCount > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {categories.find((c) => c.value === selectedCategory)?.label}
                <button
                  onClick={() => onCategoryChange("all")}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedPriceRange !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Precio {selectedPriceRange}
                <button
                  onClick={() => onPriceRangeChange("all")}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                &quot;{searchQuery}&quot;
                <button
                  onClick={() => onSearchChange("")}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
