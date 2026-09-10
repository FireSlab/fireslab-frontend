import { Metadata } from 'next';
import { fetchProjects } from '@/lib/api';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects & Case Studies | FireSlab Industries',
  description:
    'Explore real-world industrial installations, commercial HVAC systems, and water storage case studies engineered by FireSlab.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return <ProjectsPageClient initialProjects={projects} />;
}
