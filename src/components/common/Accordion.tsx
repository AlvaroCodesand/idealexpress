"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  className = "space-y-3",
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-white border border-stone-200 rounded-xl overflow-hidden transition-all shadow-xs"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-orange-600 transition"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-slate-500">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
