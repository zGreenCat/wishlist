"use client";

import { Heart, Instagram, Mail, Send } from "lucide-react";

interface FooterProps {
  name: string;
  message: string;
}

export function Footer({ name, message }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Warm message */}
          <div className="mb-8">
            <Heart className="mx-auto mb-4 h-8 w-8 text-rose-400" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              {message}
            </p>
          </div>

          {/* Divider */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-border" />
            <span className="text-2xl text-muted-foreground/50">✦</span>
            <span className="h-px w-12 bg-border" />
          </div>

          {/* Name and contact */}
          <div className="space-y-4">
            <p className="font-serif text-2xl font-medium text-foreground">
              {name}
            </p>

            {/* Optional social links - can be customized */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="#"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Credits */}
          <p className="mt-12 text-xs text-muted-foreground">
            Hecho con <Heart className="inline h-3 w-3 text-rose-400" /> usando Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
