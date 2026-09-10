'use client';

import Link from 'next/link';

export interface FeaturedProjectItem {
  id?: string;
  title: string;
  slug: string;
  product_used?: string;
  image_url?: string;
  description?: string;
}

const DEFAULT_FEATURED_PROJECTS: FeaturedProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Grand Hyatt Water System',
    slug: 'grand-hyatt-water-system',
    product_used: '12 × 2000L Pressurized Tanks',
    image_url: '/app1.jpg',
  },
  {
    id: 'proj-2',
    title: 'Apollo Hospital HVAC',
    slug: 'apollo-hospital-hvac',
    product_used: 'Spiral Heat Exchanger Network',
    image_url: '/app2.jpg',
  },
  {
    id: 'proj-3',
    title: 'Olympic Pool Heating',
    slug: 'olympic-pool-heating',
    product_used: 'Shell & Tube Integration',
    image_url: '/app3.jpg',
  },
];

export default function FeaturedProjectsSection({
  projects = [],
}: {
  projects?: FeaturedProjectItem[];
}) {
  const displayProjects =
    projects && projects.length >= 3 ? projects : DEFAULT_FEATURED_PROJECTS;

  return (
    <section id="featured-projects" className="featured-projects" aria-label="Featured Projects">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Case Studies</span>
          <h2>Featured Projects</h2>
        </div>

        <div className="projects-mini-grid">
          {displayProjects.map((proj, idx) => {
            const img = proj.image_url || `/app${(idx % 6) + 1}.jpg`;
            const sub = proj.product_used || proj.description || 'Custom Thermal Engineering';

            return (
              <div
                key={proj.id || proj.slug || idx}
                className="mini-project"
              >
                <img src={img} alt={proj.title} loading="lazy" />
                <div className="mini-project-info">
                  <h4>{proj.title}</h4>
                  <p>{sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="center-cta" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/projects" className="btn btn-outline">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
