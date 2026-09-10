'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectsFilterBar from './ProjectsFilterBar';
import ProjectsGrid from './ProjectsGrid';
import ProjectDetailModal, { ProjectItem } from './ProjectDetailModal';

const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Grand Hyatt Water System',
    slug: 'grand-hyatt-water-system',
    location: 'Mumbai, Maharashtra',
    category: 'hotel',
    product_used: 'Pressurized Hot Water Tanks',
    image_url: '/app1.jpg',
    description: 'Installed 12 × 2000L pressurized tanks for centralized hot water supply.',
    client_name: 'Grand Hyatt Hotels',
    completion_year: '2024',
  },
  {
    id: 'proj-2',
    title: 'Apollo Hospital HVAC',
    slug: 'apollo-hospital-hvac',
    location: 'Delhi, NCR',
    category: 'hospital',
    product_used: 'Spiral Heat Exchangers',
    image_url: '/app2.jpg',
    description: 'Complete heat exchanger network for 450-bed facility.',
    client_name: 'Apollo Hospitals Group',
    completion_year: '2023',
  },
  {
    id: 'proj-3',
    title: 'Raheja Residency',
    slug: 'raheja-residency',
    location: 'Pune, Maharashtra',
    category: 'residential',
    product_used: 'Modular Panel Tanks',
    image_url: '/app3.jpg',
    description: 'Rooftop modular storage for 300-unit residential tower.',
    client_name: 'K Raheja Corp',
    completion_year: '2024',
  },
  {
    id: 'proj-4',
    title: 'Olympic-size Pool Heating',
    slug: 'olympic-size-pool-heating',
    location: 'Bengaluru, Karnataka',
    category: 'pool',
    product_used: 'Shell & Tube Heat Exchanger',
    image_url: '/app4.jpg',
    description: 'Year-round pool temperature maintenance with 40% energy savings.',
    client_name: 'Karnataka Sports Authority',
    completion_year: '2023',
  },
  {
    id: 'proj-5',
    title: 'Tata Steel Plant',
    slug: 'tata-steel-plant',
    location: 'Jamshedpur, Jharkhand',
    category: 'industrial',
    product_used: 'Corrugated Tube Heat Exchanger',
    image_url: '/app5.jpg',
    description: 'Industrial process water heating for large-scale steel production.',
    client_name: 'Tata Steel Ltd.',
    completion_year: '2023',
  },
  {
    id: 'proj-6',
    title: 'ITC Maurya Hotel',
    slug: 'itc-maurya-hotel',
    location: 'New Delhi, Delhi',
    category: 'hotel',
    product_used: 'Glass Lined Tanks',
    image_url: '/app6.jpg',
    description: 'Premium glass-lined tanks for 5-star potable water standards.',
    client_name: 'ITC Hotels Luxury Collection',
    completion_year: '2024',
  },
  {
    id: 'proj-7',
    title: 'Fortis Hospital Network',
    slug: 'fortis-hospital-network',
    location: 'Noida, UP',
    category: 'hospital',
    product_used: 'Pressurized Hot Water Tanks',
    image_url: '/app1.jpg',
    description: 'Multi-building hospital complex hot water infrastructure.',
    client_name: 'Fortis Healthcare',
    completion_year: '2023',
  },
  {
    id: 'proj-8',
    title: 'Poultry Hatchery, UP',
    slug: 'poultry-hatchery-up',
    location: 'Lucknow, UP',
    category: 'industrial',
    product_used: 'Heating Elements',
    image_url: '/app2.jpg',
    description: 'Precision temperature control for 1.2 million eggs per cycle.',
    client_name: 'AgriTech Hatcheries',
    completion_year: '2024',
  },
  {
    id: 'proj-9',
    title: 'Marriott Resort',
    slug: 'marriott-resort',
    location: 'Goa',
    category: 'hotel',
    product_used: 'Spiral Heat Exchangers',
    image_url: '/app3.jpg',
    description: 'Luxury resort thermal systems with solar integration.',
    client_name: 'Marriott International',
    completion_year: '2024',
  },
];


interface ProjectsPageClientProps {
  initialProjects?: ProjectItem[];
  isComingSoon?: boolean;
}

function ProjectsContent({ initialProjects, isComingSoon = false }: ProjectsPageClientProps) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || searchParams.get('app') || 'all';
  const previewParam = searchParams.get('preview') || searchParams.get('view') || searchParams.get('mode');

  const [activeFilter, setActiveFilter] = useState<string>(initialCat);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [userToggledMode, setUserToggledMode] = useState<boolean | null>(
    previewParam === 'live' ? false : previewParam === 'coming_soon' ? true : null
  );

  useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('app');
    if (cat) {
      setActiveFilter(cat.toLowerCase());
    }
  }, [searchParams]);

  const allProjects = useMemo(() => {
    return initialProjects && initialProjects.length > 0 ? initialProjects : FALLBACK_PROJECTS;
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return allProjects;
    return allProjects.filter((p) => {
      const pCat = (p.category || '').toLowerCase();
      const filter = activeFilter.toLowerCase();
      return pCat === filter || pCat.includes(filter) || filter.includes(pCat);
    });
  }, [allProjects, activeFilter]);

  const showComingSoonView = userToggledMode !== null ? userToggledMode : Boolean(isComingSoon);

  if (showComingSoonView) {
    return (
      <>
        {/* Full viewport coming soon — no page wrapper padding, just navbar offset */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            background: '#0b0e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px', /* navbar height */
          }}
        >
          {/* Ambient background glow */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(45,106,53,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(40px)',
          }} />

          {/* No visible toggle — mode controlled by Admin Site Settings only */}

          {/* The Card */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '580px',
            margin: '0 auto',
            padding: '0 1.5rem',
            zIndex: 1,
          }}>
            <div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(20,24,20,0.98) 0%, rgba(14,18,14,0.98) 100%)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '6px',
              padding: '3.5rem 3rem 3rem',
              textAlign: 'center',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
            }}>
              {/* Top green accent line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--green-brand), transparent)',
              }} />

              {/* Corner accents */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', width: '18px', height: '18px', borderTop: '1px solid rgba(45,106,53,0.5)', borderLeft: '1px solid rgba(45,106,53,0.5)' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '18px', height: '18px', borderTop: '1px solid rgba(45,106,53,0.5)', borderRight: '1px solid rgba(45,106,53,0.5)' }} />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', width: '18px', height: '18px', borderBottom: '1px solid rgba(45,106,53,0.5)', borderLeft: '1px solid rgba(45,106,53,0.5)' }} />
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', width: '18px', height: '18px', borderBottom: '1px solid rgba(45,106,53,0.5)', borderRight: '1px solid rgba(45,106,53,0.5)' }} />

              {/* Ambient top glow inside card */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '80px',
                background: 'rgba(45,106,53,0.18)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />

              {/* Status Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                background: 'rgba(45,106,53,0.12)',
                border: '1px solid rgba(45,106,53,0.35)',
                borderRadius: '20px',
                marginBottom: '1.75rem',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4a9b55',
                  animation: 'pulse 2s infinite',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-labels)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#4a9b55',
                }}>
                  Coming Soon
                </span>
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontFamily: 'var(--font-display)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--white)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}>
                Projects Coming Soon
              </h1>

              {/* Divider */}
              <div style={{
                width: '40px',
                height: '2px',
                background: 'rgba(45,106,53,0.5)',
                margin: '0 auto 1.5rem',
              }} />

              {/* Description */}
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--steel-gray)',
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: '400px',
                margin: '0 auto 2rem',
                fontFamily: 'var(--font-body)',
              }}>
                We are currently documenting our completed installation projects. Our portfolio of work across hotels, hospitals, industrial plants, and residential buildings will be available here soon.
              </p>

              {/* Action Button */}
              <a href="/#contact" className="btn btn-green">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Live Projects View ──
  return (
    <div className="projects-page" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
      <div className="container">
        {/* No visible toggle — mode controlled by Admin Site Settings only */}

        {/* Section Header */}
        <div className="section-header text-center mb-8">
          <span className="section-tag">Our Work</span>
          <h2>Reference Projects</h2>
          <p>Real installations across industries and applications</p>
        </div>

        {/* Filter Bar */}
        <ProjectsFilterBar
          activeFilter={activeFilter}
          onFilterChange={(filter) => setActiveFilter(filter)}
        />

        {/* Projects Grid */}
        <ProjectsGrid
          projects={filteredProjects}
          onSelectProject={(project) => setSelectedProject(project)}
        />
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
