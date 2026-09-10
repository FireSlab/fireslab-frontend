import { Metadata } from 'next';
import { fetchProjects, fetchSiteSettings } from '@/lib/api';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects & Case Studies | FireSlab Industries',
  description:
    'Explore real-world industrial installations, commercial HVAC systems, and water storage case studies engineered by FireSlab.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, siteSettings] = await Promise.all([
    fetchProjects(),
    fetchSiteSettings(),
  ]);

  const projectsComingSoon = siteSettings?.projects_coming_soon !== undefined
    ? Boolean(siteSettings.projects_coming_soon)
    : false;

  return (
    <ProjectsPageClient
      initialProjects={projects}
      isComingSoon={projectsComingSoon}
    />
  );
}
