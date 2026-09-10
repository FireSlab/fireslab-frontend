'use client';

import React from 'react';

export interface FilterOption {
  id: string;
  label: string;
}

interface ProjectsFilterBarProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  availableCategories?: string[];
}

const DEFAULT_FILTERS: FilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'hotel', label: 'Hotels' },
  { id: 'hospital', label: 'Hospitals' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'pool', label: 'Swimming Pools' },
  { id: 'residential', label: 'Residential' },
];

export default function ProjectsFilterBar({
  activeFilter,
  onFilterChange,
}: ProjectsFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-8">
      {DEFAULT_FILTERS.map((tab) => {
        const isActive = activeFilter.toLowerCase() === tab.id.toLowerCase();
        return (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`px-5 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-200 border rounded ${
              isActive
                ? 'bg-[#2d6a35] border-[#2d6a35] text-white shadow-lg shadow-[#2d6a35]/20 font-semibold'
                : 'bg-transparent border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
