"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { WishlistItem } from "@/data/wishlist";

interface GiftCardProps {
  item: WishlistItem;
}

export function GiftCard({ item }: GiftCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const activeImage = item.images[activeImageIndex] ?? item.images[0];

  const goToPreviousImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!isModalOpen || item.images.length <= 1) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPreviousImage();
      }
      if (event.key === "ArrowRight") {
        goToNextImage();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, item.images.length]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY.current;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const swipeThreshold = 45;
    const closeThreshold = 80;

    // Vertical dominant swipe-down closes the modal on touch devices.
    if (deltaY > closeThreshold && absDeltaY > absDeltaX) {
      setIsModalOpen(false);
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    if (item.images.length > 1 && deltaX > swipeThreshold) {
      goToPreviousImage();
    } else if (item.images.length > 1 && deltaX < -swipeThreshold) {
      goToNextImage();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Card
        data-animate="card"
        className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <DialogTrigger asChild>
          <button
            type="button"
            className="relative aspect-[4/3] w-full overflow-hidden bg-muted"
            aria-label={`Abrir imagen completa de ${item.name}`}
          >
            <Image
              src={activeImage}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </button>
        </DialogTrigger>

        <CardContent className="p-5">
          {item.images.length > 1 && (
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
              {item.images.map((imagePath, index) => (
                <button
                  key={imagePath}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md border transition ${
                    index === activeImageIndex
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border"
                  }`}
                  aria-label={`Ver referencia ${index + 1} de ${item.name}`}
                >
                  <Image
                    src={imagePath}
                    alt={`${item.name} referencia ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          )}

          <h3 className="mb-2 font-serif text-lg font-medium text-foreground line-clamp-2">
            {item.name}
          </h3>

          <p className="mb-4 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {item.description}
          </p>

          {item.link && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
              >
                {item.isSteam ? "Ver en Steam" : "Ver referencia"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>

      <DialogContent className="max-w-[95vw] border border-border/50 bg-background/95 p-3 text-foreground shadow-[0_20px_80px_rgba(31,62,45,0.35)] backdrop-blur-lg sm:max-w-5xl sm:p-6">
        <DialogTitle className="sr-only">Vista completa de {item.name}</DialogTitle>
        <div className="relative">
          {item.images.length > 1 && (
            <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground">
              {activeImageIndex + 1} / {item.images.length}
            </div>
          )}

          {item.images.length > 1 && (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-background/80 text-foreground hover:bg-background sm:h-9 sm:w-9"
                onClick={goToPreviousImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-background/80 text-foreground hover:bg-background sm:h-9 sm:w-9"
                onClick={goToNextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          <div
            className="relative h-[65vh] w-full overflow-hidden rounded-md border border-border/40 bg-gradient-to-br from-secondary/45 via-background to-accent/35"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={activeImage}
              alt={`${item.name} vista completa`}
              fill
              className="object-contain"
              sizes="95vw"
            />
          </div>
        </div>

        {item.images.length > 1 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Desliza a los lados para cambiar de imagen, hacia abajo para cerrar, o usa las flechas del teclado.
          </p>
        )}

        {item.images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {item.images.map((imagePath, index) => (
              <button
                key={imagePath}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition ${
                  index === activeImageIndex
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-border"
                }`}
                aria-label={`Seleccionar imagen ${index + 1} de ${item.name}`}
              >
                <Image
                  src={imagePath}
                  alt={`${item.name} miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
