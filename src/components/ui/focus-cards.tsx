"use client";

// Aceternity UI — Focus Cards (installed from https://ui.aceternity.com/registry/focus-cards.json).
// Local adaptations: image fills the card, keyboard focus mirrors hover, captions stay visible on
// touch devices, optional grid/card class names, lazy images and reduced-motion support.

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type CardData = {
  title: string;
  src: string;
  alt?: string;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    className,
  }: {
    card: CardData;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    className?: string;
  }) => (
    <figure
      tabIndex={0}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
      className={cn(
        "group/card relative h-60 w-full overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out md:h-96 dark:bg-neutral-900",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98] motion-reduce:blur-none motion-reduce:scale-100 motion-reduce:opacity-70",
        className
      )}
    >
      <img
        src={card.src}
        alt={card.alt ?? card.title}
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out",
          hovered === index && "scale-[1.04] motion-reduce:scale-100"
        )}
      />
      <figcaption
        className={cn(
          "absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 py-6 transition-opacity duration-300 md:px-6",
          hovered === index ? "opacity-100" : "opacity-0 [@media(hover:none)]:opacity-100"
        )}
      >
        <span className="bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-lg font-semibold text-transparent md:text-2xl">
          {card.title}
        </span>
      </figcaption>
    </figure>
  )
);

Card.displayName = "Card";

export function FocusCards({
  cards,
  className,
  cardClassName,
}: {
  cards: CardData[];
  className?: string;
  cardClassName?: (index: number) => string | undefined;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:px-8", className)}>
      {cards.map((card, index) => (
        <Card
          key={card.src}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          className={cardClassName?.(index)}
        />
      ))}
    </div>
  );
}
