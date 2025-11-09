"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import TokenPopover from "@/components/TokenPopover";
import InfoTooltip from "@/components/Tooltip";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchTokens, TokenDTO, Category } from "@/lib/tokensApi";

interface Token extends TokenDTO {}
type Flash = "up" | "down" | null;

const Row = React.memo(function Row({
  t,
  flash,
}: {
  t: Token;
  flash: Flash;
}) {
  return (
    <tr
      className={`cursor-pointer border-b border-gray-800 hover:bg-gray-800/40 transition-all duration-300 ${
        flash === "up"
          ? "animate-priceUp"
          : flash === "down"
          ? "animate-priceDown"
          : ""
      }`}
      style={{ height: 56 }} /* keep height stable vs skeleton */
    >
      <td className="py-3 px-4 text-gray-100">{t.name}</td>
      <td className="py-3 px-4 text-gray-400">
        <TokenPopover name={t.name} symbol={t.symbol} price={t.price} change={t.change} />
      </td>
      <td
        className={`py-3 px-4 font-medium transition-colors duration-500 ${
          t.change >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        ${t.price.toFixed(2)}
      </td>
      <td
        className={`py-3 px-4 transition-colors duration-500 ${
          t.change > 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {t.change > 0 ? "+" : ""}
        {t.change.toFixed(2)}%
      </td>
    </tr>
  );
});

export default function TokenTable() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("new");
  const [flash, setFlash] = useState<Record<string, Flash>>({});

  // React Query initial load
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    staleTime: 30_000,
  });

  // Put fetched data into local state (so interval can mutate)
  useEffect(() => {
    if (data) setTokens(data);
  }, [data]);

  // Live price updates every 2.5s
  useEffect(() => {
    if (!tokens.length) return;
    const id = setInterval(() => {
      setTokens((prev) =>
        prev.map((t) => {
          const delta = (Math.random() - 0.5) * (t.price * 0.002); // ±0.2%
          const price = t.price + delta;
          const change = ((price - t.price) / t.price) * 100;
          setFlash((f) => ({ ...f, [t.symbol]: delta > 0 ? "up" : "down" }));
          return { ...t, price, change };
        })
      );
      // Clear flash after 600ms
      setTimeout(
        () => setFlash((f) => Object.fromEntries(Object.keys(f).map(k => [k, null]))),
        600
      );
    }, 2500);
    return () => clearInterval(id);
  }, [tokens.length]);

  const filtered = useMemo(
    () => tokens.filter((t) => t.category === selectedCategory),
    [tokens, selectedCategory]
  );

  const [sortKey, setSortKey] = useState<"price" | "change">("price");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = useCallback((key: "price" | "change") => {
    if (sortKey === key) setSortAsc((s) => !s);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }, [sortKey]);

  const sorted = useMemo(() => {
    const arr = filtered.slice();
    arr.sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      return sortAsc ? Number(A) - Number(B) : Number(B) - Number(A);
    });
    return arr;
  }, [filtered, sortKey, sortAsc]);

  return (
    <div className="p-4 md:p-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: "New Pairs", value: "new" as const },
          { label: "Final Stretch", value: "final" as const },
          { label: "Migrated", value: "migrated" as const },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedCategory(tab.value)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedCategory === tab.value
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-md">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-900 text-gray-300 text-left" style={{ height: 56 }}>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Symbol</th>
              <th
                className="py-3 px-4 font-medium cursor-pointer hover:text-blue-400 select-none"
                onClick={() => handleSort("price")}
              >
                Price {sortKey === "price" ? (sortAsc ? "↑" : "↓") : ""}
              </th>
              <th
                className="py-3 px-4 font-medium cursor-pointer hover:text-blue-400 select-none"
                onClick={() => handleSort("change")}
              >
                % Change {sortKey === "change" ? (sortAsc ? "↑" : "↓") : ""}
                <InfoTooltip label="% change over last 24h. Click to sort." />
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Loading skeletons */}
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-800 animate-pulse" style={{ height: 56 }}>
                  {Array.from({ length: 4 }).map((__, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 w-24 bg-gray-700 rounded skeleton-cell" />
                    </td>
                  ))}
                </tr>
              ))}

            {/* Error */}
            {isError && !isLoading && (
              <tr style={{ height: 56 }}>
                <td colSpan={4} className="py-3 px-4 text-red-400">
                  Failed to load tokens.
                </td>
              </tr>
            )}

            {/* Data */}
            {!isLoading &&
              !isError &&
              sorted.map((t) => (
                <Dialog.Root key={t.symbol}>
                  <Dialog.Trigger asChild>
                    {/* Use separate memoized row for perf */}
                    <Row t={t} flash={flash[t.symbol] ?? null} />
                  </Dialog.Trigger>

                  {/* Modal */}
                  <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/60 fixed inset-0 backdrop-blur-sm z-40" />
                    <Dialog.Content
                      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                               bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-2xl 
                               w-[90%] md:w-[400px] z-50"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Dialog.Title className="text-lg font-semibold text-gray-100 mb-2">
                          {t.name} ({t.symbol})
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-400 mb-3">
                          Live Token Details
                        </Dialog.Description>
                        <p className="text-gray-300 mb-1">
                          💰 Price: <span className="text-blue-400">${t.price.toFixed(2)}</span>
                        </p>
                        <p className="text-gray-300 mb-1">
                          📈 24h Change:{" "}
                          <span className={t.change >= 0 ? "text-green-400" : "text-red-400"}>
                            {t.change.toFixed(2)}%
                          </span>
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          Volume: ${(Math.random() * 10).toFixed(2)}M | Market Cap: $
                          {(Math.random() * 40).toFixed(2)}B
                        </p>
                        <Dialog.Close asChild>
                          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md">
                            Close
                          </button>
                        </Dialog.Close>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
