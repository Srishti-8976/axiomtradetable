"use client";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function InfoTooltip({ label }: { label: string }) {
  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="ml-1 cursor-help text-gray-400 align-middle">ⓘ</span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 text-gray-200 text-xs px-2 py-1 rounded border border-gray-700 shadow"
            side="top"
            sideOffset={6}
          >
            {label}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
