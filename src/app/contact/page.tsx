import { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fireslab.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Contact Engineering & Sales | Equipment Sizing Consultation | FireSlab',
  description:
    'Get in touch with FireSlab Industries for technical consultations, equipment sizing, and customized commercial hot water system quotations.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Engineering & Sales | Equipment Sizing Consultation | FireSlab',
    description:
      'Get in touch with FireSlab Industries for technical consultations, equipment sizing, and customized commercial hot water system quotations.',
    url: `${siteUrl}/contact`,
  },
};

export const revalidate = 60;

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${siteUrl}/contact/#webpage`,
        url: `${siteUrl}/contact`,
        name: 'Contact FireSlab Industries Engineering & Sales',
        description:
          'Get in touch with FireSlab Industries for technical consultations, equipment sizing, and customized commercial hot water system quotations.',
        mainEntity: {
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/contact/#breadcrumb`,
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
            name: 'Contact',
            item: `${siteUrl}/contact`,
          },
        ],
      },
    ],
  };

  return (
    <div className="pt-36 pb-16 bg-[#0d0f0d] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactSection />
    </div>
  );
}
