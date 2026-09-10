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
    <div className="projects-filter">
      {DEFAULT_FILTERS.map((tab) => {
        const isActive = activeFilter.toLowerCase() === tab.id.toLowerCase();
        return (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`filter-btn ${isActive ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
