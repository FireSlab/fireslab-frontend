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
    <div className="products-page-container" style={{ minHeight: '100vh', background: '#0b0e0b', position: 'relative' }}>
      {viewMode === 'carousel' ? (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
          {/* Floating Top Controls for Filter & View Mode */}
          <div
            style={{
              position: 'absolute',
              top: '90px',
              left: 0,
              right: 0,
              zIndex: 50,
              padding: '0 2rem',
              pointerEvents: 'none',
            }}
          >
            <div className="container mx-auto" style={{ pointerEvents: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                {activeApp ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: 'rgba(20, 30, 20, 0.85)',
                      border: '1px solid rgba(45, 106, 53, 0.5)',
                      padding: '0.4rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      color: 'var(--green-light)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span>
                      Filtered for: <strong>{activeApp.toUpperCase()}</strong>
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
                ) : <div />}

                <ProductsFilterBar
                  categories={categories}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  viewMode={viewMode}
                  onChangeViewMode={setViewMode}
                  activeAppFilter={activeApp}
                />
              </div>
            </div>
          </div>

          <ProductsCarousel products={filteredProducts} />
        </div>
      ) : (
        <div className="container mx-auto px-4" style={{ paddingTop: '130px', paddingBottom: '6rem' }}>
          <div className="section-header text-center max-w-2xl mx-auto mb-8">
            <span className="section-tag">Products Showcase</span>
            <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-wider text-white mb-4">
              Industrial Heating &amp; Storage
            </h1>
          </div>

          <div className="mb-8">
            <ProductsFilterBar
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              activeAppFilter={activeApp}
            />
          </div>

          <ProductsGrid products={filteredProducts} />
        </div>
      )}
    </div>
  );
}
