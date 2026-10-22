import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductsPageClient from '@/components/products/ProductsPageClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fireslab.com';

export const metadata: Metadata = {
  title: 'Products Showcase | Industrial Water Tanks & Heat Exchangers | FireSlab',
  description:
    "Explore FireSlab's premium industrial heating systems, pressurized hot water tanks, spiral heat exchangers, and modular stainless steel storage vessels.",
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Products Showcase | Industrial Water Tanks & Heat Exchangers | FireSlab',
    description:
      "Explore FireSlab's premium industrial heating systems, pressurized hot water tanks, spiral heat exchangers, and modular stainless steel storage vessels.",
    url: `${siteUrl}/products`,
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/products/#webpage`,
        url: `${siteUrl}/products`,
        name: 'Industrial Equipment & Tank Showcase | FireSlab Industries',
        description:
          "Explore FireSlab's premium industrial heating systems and water storage tanks.",
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: {
          '@id': `${siteUrl}/#organization`,
        },
        hasPart: (products || []).map((p: any) => ({
          '@type': 'Product',
          name: p.modal_title || p.card_title,
          url: `${siteUrl}/products/${p.slug}`,
          image: p.card_image_url ? `${siteUrl}${p.card_image_url}` : undefined,
          description: p.card_description,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/products/#breadcrumb`,
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
            name: 'Products',
            item: `${siteUrl}/products`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--steel-gray)' }}>
            <p>Loading FireSlab Product Showcase...</p>
          </div>
        }
      >
        <ProductsPageClient products={products} categories={categories} />
      </Suspense>
    </>
  );
}
