'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ApplicationItem {
  id?: string;
  name: string;
  slug: string;
  image_url?: string;
}

const DEFAULT_APPLICATIONS: ApplicationItem[] = [
  { name: 'Space Heating', slug: 'residential', image_url: '/app1.jpg' },
  { name: 'Utility Water', slug: 'hotels', image_url: '/app2.jpg' },
  { name: 'Swimming Pool', slug: 'pools', image_url: '/app3.jpg' },
  { name: 'Kitchen', slug: 'hotels', image_url: '/app4.jpg' },
  { name: 'Hatcheries', slug: 'hatcheries', image_url: '/app5.jpg' },
  { name: 'Industries', slug: 'industrial', image_url: '/app6.jpg' },
];

export default function ApplicationsGrid({ applications }: { applications?: ApplicationItem[] }) {
  const items = applications && applications.length > 0 ? applications : DEFAULT_APPLICATIONS;

  return (
    <section id="applications" className="applications-grid" aria-label="Applications">
      {items.map((app, idx) => {
        const bg = app.image_url || DEFAULT_APPLICATIONS[idx % DEFAULT_APPLICATIONS.length].image_url;
        return (
          <Link
            key={app.slug || idx}
            href={`/products?app=${app.slug}`}
            className="app-cell block group"
            style={{ ['--bg-url' as any]: `url('${bg}')` }}
          >
            <div className="overlay" />
            <div className="app-content">
              <h3>{app.name}</h3>
              <span className="explore">
                Explore <ChevronRight size={16} className="inline ml-1" />
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
