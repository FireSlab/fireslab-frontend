'use client';

import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductsCarousel from '@/components/products/ProductsCarousel';
import { ProductItem } from '@/components/home/ProductsHorizontalScroll';
import { X } from 'lucide-react';

interface ProductsPageClientProps {
  products: (ProductItem & {
    categories?: { id: string; name: string; slug: string } | null;
  })[];
  categories?: any;
}

export default function ProductsPageClient({
  products,
}: ProductsPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const appFilter = searchParams.get('app');
  const productParam = searchParams.get('product');

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Application parameter if present (from Navbar Applications dropdown)
    if (appFilter) {
      const keyword = appFilter.toLowerCase();
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

    return list;
  }, [products, appFilter]);

  const handleClearAppFilter = () => {
    router.push('/products');
  };

  return (
    <div
      className="products-page-wrapper"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#0b0e0b',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* If an application filter is active from Navbar, show subtle dismissible indicator */}
      {appFilter && (
        <div
          style={{
            position: 'absolute',
            top: '84px',
            right: '2rem',
            zIndex: 70,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(15, 25, 16, 0.9)',
              border: '1px solid rgba(45, 106, 53, 0.6)',
              padding: '0.4rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: 'var(--green-light)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            }}
          >
            <span className="font-['Barlow_Condensed'] uppercase tracking-wider">
              Application: <strong>{appFilter}</strong>
            </span>
            <button
              type="button"
              onClick={handleClearAppFilter}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
              title="Clear filter & view all products"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Kinetic Solution-Style Slider for Products */}
      <ProductsCarousel
        products={filteredProducts}
        initialProductSlug={productParam}
      />
    </div>
  );
}
