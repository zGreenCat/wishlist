"use client";

import { PackageOpen } from "lucide-react";
import { GiftCard } from "./gift-card";
import type { WishlistItem } from "@/data/wishlist";

interface GiftGridProps {
  items: WishlistItem[];
  title?: string;
  subtitle?: string;
}

export function GiftGrid({ items, title, subtitle }: GiftGridProps) {
  if (items.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <PackageOpen className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
              No se encontraron referencias
            </h3>
            <p className="text-muted-foreground">
              Prueba con otros filtros o una búsqueda diferente.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section header */}
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="mb-3 font-serif text-3xl font-medium text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-md text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}

        {/* Items grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <GiftCard key={item.id} item={item} />
          ))}
        </div>

        {/* Results count */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Mostrando {items.length} {items.length === 1 ? "producto" : "productos"}
        </p>
      </div>
    </section>
  );
}
