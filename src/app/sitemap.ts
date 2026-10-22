import { MetadataRoute } from 'next';
import { fetchProducts } from '@/lib/api';

export const revalidate = 3600; // Auto-regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fireslab.com').replace(/\/$/, '');

  // 1. Core Static Marketing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 2. Dynamic Published Products from Database
  try {
    const products = await fetchProducts();
    const productRoutes: MetadataRoute.Sitemap = (products || [])
      .filter((p: any) => p && p.slug && p.is_published !== false)
      .map((product: any) => ({
        url: `${siteUrl}/products/${encodeURIComponent(product.slug)}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
      }));

    return [...staticRoutes, ...productRoutes];
  } catch (error) {
    console.error('Error generating dynamic product sitemap:', error);
    return staticRoutes;
  }
}
