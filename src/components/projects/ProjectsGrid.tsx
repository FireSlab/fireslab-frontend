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
    <div className="projects-grid">
      {projects.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelectProject(p)}
          className="project-card"
        >
          {/* Card Image */}
          <div className="project-image">
            <img
              src={p.image_url || '/app1.jpg'}
              alt={p.title}
              loading="lazy"
            />
            <span className="project-tag">
              {p.product_used || p.category}
            </span>
          </div>

          {/* Card Info */}
          <div className="project-info">
            <div className="project-location">
              <MapPin size={13} />
              <span>{p.location}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
