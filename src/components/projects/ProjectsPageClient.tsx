'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectsFilterBar from './ProjectsFilterBar';
import ProjectsGrid from './ProjectsGrid';
import ProjectDetailModal, { ProjectItem } from './ProjectDetailModal';

interface ProjectsPageClientProps {
  initialProjects: ProjectItem[];
}

function ProjectsContent({ initialProjects }: ProjectsPageClientProps) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || searchParams.get('app') || 'all';

  const [activeFilter, setActiveFilter] = useState<string>(initialCat);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('app');
    if (cat) {
      setActiveFilter(cat.toLowerCase());
    }
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return initialProjects;
    return initialProjects.filter((p) => {
      const pCat = (p.category || '').toLowerCase();
      const filter = activeFilter.toLowerCase();
      return pCat === filter || pCat.includes(filter) || filter.includes(pCat);
    });
  }, [initialProjects, activeFilter]);

  return (
    <div className="pb-24 min-h-screen bg-[#0d0f0d]" style={{ paddingTop: '140px' }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#e04e32] block mb-3 font-semibold">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-white mb-4">
            Reference Projects
          </h1>
          <p className="text-sm sm:text-base text-[#8a9e8d] font-light">
            Real installations across industries and applications engineered for peak reliability.
          </p>
        </div>

        {/* Filter Bar */}
        <ProjectsFilterBar
          activeFilter={activeFilter}
          onFilterChange={(filter) => setActiveFilter(filter)}
        />

        {/* Projects Grid */}
        <div className="mt-8">
          <ProjectsGrid
            projects={filteredProjects}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function ProjectsPageClient(props: ProjectsPageClientProps) {
  return (
    <Suspense fallback={<div className="pt-32 pb-20 text-center text-white/50">Loading projects...</div>}>
      <ProjectsContent {...props} />
    </Suspense>
  );
}
