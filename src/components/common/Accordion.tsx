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
  className = "divide-y divide-[#E8E1D5]",
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
          <div key={item.id} className="py-3">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full text-left flex items-center justify-between gap-3 font-display font-bold text-sm text-[#0E283F] hover:text-[#3E5C10] transition py-1"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="w-6 h-6 flex items-center justify-center shrink-0 text-slate-600">
                {isOpen ? <Minus size={15} /> : <Plus size={15} />}
              </span>
            </button>
            {isOpen && (
              <div className="pt-2 text-xs text-slate-700 leading-relaxed font-sans">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
