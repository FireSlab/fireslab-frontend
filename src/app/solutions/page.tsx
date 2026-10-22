import { Metadata } from 'next';
import { fetchSolutions } from '@/lib/api';
import SolutionsPageClient from '@/components/solutions/SolutionsPageClient';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fireslab.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Engineered Thermal Solutions | Commercial & Industrial Systems | FireSlab',
  description:
    'Custom high-efficiency heating and water storage engineering solutions by FireSlab Industries for commercial and industrial applications.',
  alternates: {
    canonical: '/solutions',
  },
  openGraph: {
    title: 'Engineered Thermal Solutions | Commercial & Industrial Systems | FireSlab',
    description:
      'Custom high-efficiency heating and water storage engineering solutions by FireSlab Industries for commercial and industrial applications.',
    url: `${siteUrl}/solutions`,
  },
};

export const revalidate = 60;

export default async function SolutionsPage() {
  const solutions = await fetchSolutions();

  const solutionsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/solutions/#webpage`,
        url: `${siteUrl}/solutions`,
        name: 'Engineered Thermal Solutions | FireSlab Industries',
        description:
          'Custom high-efficiency heating and water storage engineering solutions by FireSlab Industries for commercial and industrial applications.',
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/solutions/#breadcrumb`,
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
            name: 'Solutions',
            item: `${siteUrl}/solutions`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsSchema) }}
      />
      <SolutionsPageClient initialSolutions={solutions} />
    </>
  );
}
