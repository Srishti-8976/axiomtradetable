"use client";

import * as React from "react";

interface TabsProps {
  active: string;
  onChange: (tab: string) => void;
}

const TABS = ["newPairs", "finalStretch", "migrated"];

export default function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex gap-4 mb-6 border-b border-gray-700 pb-2">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`capitalize px-3 py-1 rounded-md transition-all ${
            active === tab
              ? "bg-gray-800 text-white border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.replace(/([A-Z])/g, " $1")}
        </button>
      ))}
    </div>
  );
}
