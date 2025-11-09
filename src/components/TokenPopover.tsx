"use client";
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { motion } from "framer-motion";

interface TokenPopoverProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export default function TokenPopover({ name, symbol, price, change }: TokenPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="hover:underline text-blue-400 transition-colors duration-200">
          {symbol}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="right"
          sideOffset={10}
          className="z-50 rounded-lg bg-gray-900 border border-gray-700 shadow-lg p-4 w-60 text-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-200">{name}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  change >= 0 ? "bg-green-700/40 text-green-300" : "bg-red-700/40 text-red-300"
                }`}
              >
                {change >= 0 ? "+" : ""}
                {change.toFixed(2)}%
              </span>
            </div>
            <p className="text-gray-400 mb-2">Symbol: {symbol}</p>
            <p className="text-gray-300 font-medium">Current Price: ${price.toFixed(2)}</p>
            <hr className="my-2 border-gray-700" />
            <p className="text-gray-500 text-xs">24h Volume: ${(Math.random() * 10).toFixed(2)}M</p>
            <p className="text-gray-500 text-xs">Market Cap: ${(Math.random() * 50).toFixed(2)}B</p>
          </motion.div>
          <Popover.Arrow className="fill-gray-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
