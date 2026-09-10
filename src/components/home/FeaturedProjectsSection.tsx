'use client';

import Link from 'next/link';

export interface FeaturedProjectItem {
  id: string;
  title: string;
  slug: string;
  product_used?: string;
  image_url?: string;
  description?: string;
}

export default function FeaturedProjectsSection({ projects = [] }: { projects?: FeaturedProjectItem[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="featured-projects" className="featured-projects" aria-label="Featured Projects">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Case Studies</span>
          <h2>Featured Projects</h2>
        </div>

        <div className="projects-mini-grid">
          {projects.map((proj, idx) => {
            const img = proj.image_url || `/app${(idx % 6) + 1}.jpg`;
            const sub = proj.product_used || proj.description || 'Custom Thermal Engineering';

            return (
              <Link
                key={proj.id || proj.slug || idx}
                href={`/projects#${proj.slug}`}
                className="mini-project group"
              >
                <img src={img} alt={proj.title} loading="lazy" />
                <div className="mini-project-info">
                  <h4>{proj.title}</h4>
                  <p>{sub}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="center-cta" style={{ textAlign: 'center' }}>
          <Link href="/projects" className="btn btn-outline">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
