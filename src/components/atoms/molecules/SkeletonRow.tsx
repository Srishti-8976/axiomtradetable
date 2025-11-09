"use client";

import { motion } from "framer-motion";

export default function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-gray-800">
      <td className="p-3">
        <motion.div
          className="h-4 bg-gray-700 rounded w-24"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      </td>
      <td className="p-3">
        <motion.div
          className="h-4 bg-gray-700 rounded w-16"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      </td>
      <td className="p-3">
        <motion.div
          className="h-4 bg-gray-700 rounded w-20"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      </td>
      <td className="p-3">
        <motion.div
          className="h-4 bg-gray-700 rounded w-28"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      </td>
    </tr>
  );
}
