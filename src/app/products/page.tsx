import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductsPageClient from '@/components/products/ProductsPageClient';

export const metadata: Metadata = {
  title: 'Products Showcase | FireSlab',
  description: "Explore FireSlab's premium industrial heating systems and water storage tanks.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--steel-gray)' }}>
          <p>Loading FireSlab Product Showcase...</p>
        </div>
      }
    >
      <ProductsPageClient products={products} categories={categories} />
    </Suspense>
  );
}
