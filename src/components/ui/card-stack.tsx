"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Card {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
}

interface CardStackProps {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}

let interval: NodeJS.Timeout;

export function CardStack({ items, offset = 10, scaleFactor = 0.06 }: CardStackProps) {
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const lastCard = newArray.pop();
        if (lastCard) {
          newArray.unshift(lastCard);
        }
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute bg-white dark:bg-black h-60 w-60 md:h-60 md:w-96 rounded-3xl p-6 shadow-xl border border-neutral-200 dark:border-white/10 shadow-black/10 dark:shadow-white/5 flex flex-col justify-between"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index,
          }}
        >
          <div className="space-y-4">
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt={card.name} />
                <AvatarFallback>{card.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium text-neutral-900 dark:text-white">
                  {card.name}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-300">
                  {card.designation}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
