'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectsFilterBar from './ProjectsFilterBar';
import ProjectsGrid from './ProjectsGrid';
import ProjectDetailModal, { ProjectItem } from './ProjectDetailModal';

interface ProjectsPageClientProps {
  initialProjects: ProjectItem[];
  isComingSoon?: boolean;
}

function ProjectsContent({ initialProjects, isComingSoon = false }: ProjectsPageClientProps) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || searchParams.get('app') || 'all';

  const [activeFilter, setActiveFilter] = useState<string>(initialCat);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [overrideComingSoon, setOverrideComingSoon] = useState(false);

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

  const showComingSoonView = isComingSoon && !overrideComingSoon;

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

        {showComingSoonView ? (
          /* High-end Industrial Coming Soon View */
          <div className="max-w-4xl mx-auto my-8 bg-[#141814] border border-[#2d6a35]/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            {/* Background grid accent */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage:
                  'linear-gradient(#4a9b55 1px, transparent 1px), linear-gradient(90deg, #4a9b55 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e07b2a]/10 border border-[#e07b2a]/40 text-[#e07b2a] text-xs font-mono uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#e07b2a] animate-pulse"></span>
                Active Commissioning & Field Documentation
              </div>

              <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wider text-white max-w-2xl mx-auto leading-tight">
                Case Studies &amp; On-Site Deployments Under Client NDA Review
              </h2>

              <p className="text-sm sm:text-base text-[#8a9e8d] max-w-2xl mx-auto leading-relaxed font-light">
                FireSlab thermal storage and heat exchanger systems are actively operating across tier-1 hospitality, healthcare complexes, and heavy industrial facilities nationwide. Certified project dossiers, CAD layouts, and performance metrics are available upon direct engineering request.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-2xl mx-auto border-t border-white/10">
                <div className="p-4 bg-black/40 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-display text-white font-bold tracking-wide">350+</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8a9e8d] mt-1">Live Systems Installed</div>
                </div>
                <div className="p-4 bg-black/40 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-display text-[#e07b2a] font-bold tracking-wide">100%</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8a9e8d] mt-1">ASME / IBR Compliant</div>
                </div>
                <div className="p-4 bg-black/40 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-display text-[#4a9b55] font-bold tracking-wide">40+</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8a9e8d] mt-1">Industrial Sectors</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#2d6a35] hover:bg-[#4a9b55] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#2d6a35]/20"
                >
                  Request Confidential Project Dossier
                </a>
                <button
                  type="button"
                  onClick={() => setOverrideComingSoon(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-transparent border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-mono text-xs uppercase tracking-widest transition-all"
                >
                  Preview Representative Case Studies &rarr;
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
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
