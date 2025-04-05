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
          className="absolute bg-gradient-to-br from-[#1a1e2e]/95 to-[#0f1219]/95 backdrop-blur-sm h-60 w-60 md:h-60 md:w-96 rounded-2xl p-6 shadow-lg border border-[#2a3042]/50 flex flex-col justify-between overflow-hidden group"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index,
          }}
          whileHover={{ y: -2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="space-y-4 relative">
            <div className="font-normal text-gray-100 leading-relaxed">
              {card.content}
            </div>

            <div className="flex items-center space-x-4 mt-auto pt-2 border-t border-[#2a3042]/30">
              <Avatar className="ring-2 ring-blue-500/20 ring-offset-2 ring-offset-[#0f1219]">
                <AvatarImage src="https://github.com/shadcn.png" alt={card.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-300">
                  {card.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium text-white group-hover:text-blue-300 transition-colors">
                  {card.name}
                </p>
                <p className="text-sm text-gray-400">
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
