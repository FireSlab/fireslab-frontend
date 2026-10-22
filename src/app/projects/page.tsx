import { Metadata } from 'next';
import { fetchProjects, fetchSiteSettings } from '@/lib/api';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fireslab.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Industrial Installations | FireSlab',
  description:
    'Explore real-world industrial installations, commercial HVAC systems, and water storage case studies engineered by FireSlab.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects & Case Studies | Industrial Installations | FireSlab',
    description:
      'Explore real-world industrial installations, commercial HVAC systems, and water storage case studies engineered by FireSlab.',
    url: `${siteUrl}/projects`,
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProjectsPage() {
  const [projects, siteSettings] = await Promise.all([
    fetchProjects(),
    fetchSiteSettings(),
  ]);

  const isComingSoon = siteSettings?.projects_coming_soon !== undefined
    ? Boolean(siteSettings.projects_coming_soon)
    : true;

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/projects/#webpage`,
        url: `${siteUrl}/projects`,
        name: 'Industrial Projects & Case Studies | FireSlab Industries',
        description:
          'Explore real-world industrial installations, commercial HVAC systems, and water storage case studies engineered by FireSlab.',
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/projects/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${siteUrl}/projects`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <ProjectsPageClient
        initialProjects={projects}
        isComingSoon={isComingSoon}
      />
    </>
  );
}
