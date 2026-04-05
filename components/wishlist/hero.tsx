"use client";

import { Gift } from "lucide-react";

interface HeroProps {
  name: string;
  birthday: string;
}

export function Hero({ name, birthday }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/25">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -left-14 top-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-44 w-44 rounded-full bg-secondary/70 blur-2xl" />

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-3xl border border-border/70 bg-card/85 px-6 py-8 shadow-[0_10px_35px_rgba(42,78,56,0.12)] backdrop-blur-sm md:px-10 md:py-12">
            {/* Small badge */}
            <div
              data-animate="hero"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground"
            >
              <Gift className="h-4 w-4" />
              <span>{birthday}</span>
            </div>

            {/* Main title */}
            <h1
              data-animate="hero"
              className="mb-6 font-serif text-4xl font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance"
            >
              Mi Wishlist de Cumpleaños
            </h1>

            {/* Subtitle */}
            <p
              data-animate="hero"
              className="mb-8 text-lg text-muted-foreground md:text-xl leading-relaxed text-pretty"
            >
              Hola, soy {name}. Y aqui hay cosas que quiero wuajja 
            </p>

            {/* Warm message */}
            <div
              data-animate="hero"
              className="mx-auto max-w-xl rounded-2xl border border-primary/20 bg-background/75 p-6 shadow-sm"
            >
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &quot;No hace falta que me regales nada de esto. Cualquier detalle cuenta, y lo
                que más valoro es el cariño detrás del gesto. Esta lista es solo para
                darte ideas si las necesitas. Este texto es IA si no puedes darme nada dame dinero&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
