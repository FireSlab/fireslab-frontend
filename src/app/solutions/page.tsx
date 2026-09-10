import { Metadata } from 'next';
import { fetchSolutions } from '@/lib/api';
import SolutionsPageClient from '@/components/solutions/SolutionsPageClient';

export const metadata: Metadata = {
  title: 'Engineered Thermal Solutions | FireSlab Systems',
  description:
    'Custom high-efficiency heating and water storage engineering solutions by FireSlab Industries for commercial and industrial applications.',
};

export const revalidate = 60;

export default async function SolutionsPage() {
  const solutions = await fetchSolutions();

  return <SolutionsPageClient initialSolutions={solutions} />;
}
