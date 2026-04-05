"use client";

import { Heart, Lightbulb, Sparkles } from "lucide-react";
import { GiftCard } from "./gift-card";
import type { WishlistItem } from "@/data/wishlist";

interface FeaturedSectionProps {
  items: WishlistItem[];
  type: "featured" | "simple" | "alternative";
}

const sectionConfig = {
  featured: {
    icon: Heart,
    title: "Mis favoritos",
    subtitle: "Las cosas que más ilusión me harían recibir",
    bgClass: "bg-secondary/30",
  },
  simple: {
    icon: Sparkles,
    title: "Ideas simples",
    subtitle: "Opciones más accesibles y fáciles de encontrar",
    bgClass: "bg-background",
  },
  alternative: {
    icon: Lightbulb,
    title: "No tiene que ser exactamente esto",
    subtitle: "Inspiración flexible - algo similar también me haría feliz",
    bgClass: "bg-muted/30",
  },
};

export function FeaturedSection({ items, type }: FeaturedSectionProps) {
  const config = sectionConfig[type];
  const Icon = config.icon;

  if (items.length === 0) return null;

  return (
    <section className={`py-16 ${config.bgClass}`}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="mb-3 font-serif text-3xl font-medium text-foreground md:text-4xl">
            {config.title}
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            {config.subtitle}
          </p>
        </div>

        {/* Items grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <GiftCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
