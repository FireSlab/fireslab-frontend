'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductsFilterBar, { CategoryOption } from '@/components/products/ProductsFilterBar';
import ProductsCarousel from '@/components/products/ProductsCarousel';
import ProductsGrid from '@/components/products/ProductsGrid';
import { ProductItem } from '@/components/home/ProductsHorizontalScroll';
import { X } from 'lucide-react';

interface ProductsPageClientProps {
  products: (ProductItem & { categories?: { id: string; name: string; slug: string } | null })[];
  categories: CategoryOption[];
}

export default function ProductsPageClient({
  products,
  categories,
}: ProductsPageClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const appFilter = searchParams.get('app');

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeApp, setActiveApp] = useState<string | null>(appFilter);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  useEffect(() => {
    if (searchParams.get('category')) {
      setActiveCategory(searchParams.get('category')!);
    }
    if (searchParams.get('app')) {
      setActiveApp(searchParams.get('app'));
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Application parameter
    if (activeApp) {
      const keyword = activeApp.toLowerCase();
      const mappedKeyword =
        {
          hotels: 'hotel',
          hospitals: 'hospital',
          pools: 'commercial',
          industrial: 'industr',
          residential: 'residential',
          hatcheries: 'commercial',
        }[keyword] || keyword;

      const appMatches = list.filter((p) => {
        const appsStr = (p.applications || []).join(' ').toLowerCase();
        return appsStr.includes(mappedKeyword) || appsStr.includes(keyword);
      });

      if (appMatches.length > 0) {
        list = appMatches;
      }
    }

    // Filter by Category
    if (activeCategory !== 'all') {
      list = list.filter((p) => {
        const catSlug = p.categories?.slug;
        return catSlug === activeCategory;
      });
    }

    return list;
  }, [products, activeCategory, activeApp]);

  return (
    <div className="products-page-container" style={{ paddingTop: '130px', paddingBottom: '5rem', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Products Showcase</span>
          <h1>Industrial Heating &amp; Storage Solutions</h1>
        </div>

        {activeApp && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(45, 106, 53, 0.2)',
              border: '1px solid rgba(45, 106, 53, 0.4)',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              color: 'var(--green-light)',
              marginBottom: '1rem',
            }}
          >
            <span>
              Filtered for Application: <strong>{activeApp.toUpperCase()}</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveApp(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Clear application filter"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <ProductsFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          activeAppFilter={activeApp}
        />

        {viewMode === 'carousel' ? (
          <ProductsCarousel products={filteredProducts} />
        ) : (
          <ProductsGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
