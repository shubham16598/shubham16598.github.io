"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Recommendation {
  name: string;
  role: string;
  text: string;
  initials: string;
}

interface Props {
  items: Recommendation[];
}

export function RecommendationStack({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const currentItem = items[index];

  // We'll show a stack of 3 cards effectively: current, next, and next-next (visual only)
  // But for clicking/swiping, we mainly manipulate the top one.

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      setDirection("right");
      handleSwipe(1);
    } else if (info.offset.x < -100) {
      setDirection("left");
      handleSwipe(1);
    }
  };

  const handleSwipe = (dir: number) => {
    setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setDirection(null);
    }, 200); // Wait for animation flex
  };

  // Helper to get visually stacked items
  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const itemIndex = (index + i) % items.length;
      visible.push({ ...items[itemIndex], offset: i });
    }
    return visible.reverse(); // Render bottom first
  };

  return (
    <div className="relative h-[360px] w-full max-w-sm mx-auto flex items-center justify-center">
      <AnimatePresence>
        {getVisibleItems().map((item, i) => {
            const isTop = item.offset === 0;
            // Zig zag rotation for background cards
            const rotate = item.offset === 0 ? 0 : item.offset % 2 === 0 ? 3 : -3; 
            const scale = 1 - item.offset * 0.05;
            const yOffset = item.offset * 15;
            const opacity = 1 - item.offset * 0.2;
            
            return (
              <motion.div
                key={`${item.name}-${item.offset}-${index}`} // Key change prompts re-render for position/stack shift
                className="absolute w-full top-0"
                style={{
                  zIndex: isTop ? 50 : 40 - item.offset,
                }}
                animate={{
                  scale,
                  y: yOffset,
                  rotate: isTop && direction === "right" ? 20 : isTop && direction === "left" ? -20 : rotate,
                  x: isTop && direction === "right" ? 200 : isTop && direction === "left" ? -200 : 0,
                  opacity: isTop && direction ? 0 : opacity
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
              >
                  <div className="rounded-xl border border-border/50 bg-stone-50/90 dark:bg-stone-900/90 p-6 shadow-lg backdrop-blur-sm h-[320px] flex flex-col justify-between select-none">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-10 w-10 border border-border/50">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">{item.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-bold text-foreground text-sm font-sans">{item.name}</h3>
                                <p className="text-xs text-muted-foreground">{item.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-foreground/90 leading-relaxed overflow-y-auto max-h-[180px]">
                            {item.text}
                        </p>
                    </div>
                    <div className="text-center text-xs text-muted-foreground/50 mt-4 font-mono uppercase tracking-widest">
                        {isTop ? "Swipe to browse" : "Next"}
                    </div>
                  </div>
              </motion.div>
            );
        })}
      </AnimatePresence>
    </div>
  );
}
