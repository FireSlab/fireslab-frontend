'use client';

import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from './ProjectDetailModal';

interface ProjectsGridProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectsGrid({ projects, onSelectProject }: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-xl">
        <p className="text-white/50 text-sm font-mono uppercase tracking-wider">
          No projects found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelectProject(p)}
          className="group relative bg-[#141814] border border-white/5 hover:border-[#2d6a35]/60 rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col shadow-lg"
        >
          {/* Card Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
            <img
              src={p.image_url || '/app1.jpg'}
              alt={p.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Tag Badge */}
            <span className="absolute bottom-3 left-3 bg-[#2d6a35] text-white text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 z-10">
              {p.product_used || p.category}
            </span>
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/80 border border-white/20 text-white text-xs font-mono uppercase tracking-wider rounded">
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#e04e32]" />
              </span>
            </div>
          </div>

          {/* Card Info */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#8a9e8d] font-mono uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#e04e32] flex-shrink-0" />
                <span>{p.location}</span>
              </div>
              <h3 className="text-xl font-display uppercase tracking-wide text-white mb-2 group-hover:text-[#2d6a35] transition-colors line-clamp-1">
                {p.title}
              </h3>
              <p className="text-sm text-white/60 line-clamp-2 leading-relaxed font-light">
                {p.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-mono">
              <span>Category: {p.category}</span>
              <span className="text-[#e04e32] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Explore &rarr;
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
