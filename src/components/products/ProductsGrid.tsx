'use client';

import { useState } from 'react';
import { ProductItem } from '@/components/home/ProductsHorizontalScroll';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import { Shield, Layers, Flame, Cpu, Boxes, Droplets } from 'lucide-react';

function renderSpecIcon(iconName: string) {
  switch (iconName?.toLowerCase()) {
    case 'shield':
    case 'shield-check':
      return <Shield size={14} className="shrink-0 text-[#a8d5ba]" />;
    case 'layers':
      return <Layers size={14} className="shrink-0 text-[#a8d5ba]" />;
    case 'flame':
      return <Flame size={14} className="shrink-0 text-[#a8d5ba]" />;
    case 'cpu':
      return <Cpu size={14} className="shrink-0 text-[#a8d5ba]" />;
    case 'boxes':
    case 'grid':
      return <Boxes size={14} className="shrink-0 text-[#a8d5ba]" />;
    case 'droplets':
    default:
      return <Droplets size={14} className="shrink-0 text-[#a8d5ba]" />;
  }
}

export default function ProductsGrid({ products }: { products: ProductItem[] }) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--steel-gray)' }}>
        <h3>No products found for the selected filter.</h3>
      </div>
    );
  }

  return (
    <>
      <div className="products-catalog-grid">
        {products.map((p, idx) => {
          const title = p.card_title || p.cardTitle || 'FireSlab Product';
          const badge = p.card_badge || p.cardBadge;
          const desc = p.card_description || p.cardDesc || '';
          const img = p.card_image_url || p.cardImage || '/p1.png';
          const specs = p.card_specs || p.cardSpecs || [];

          return (
            <div key={p.id || p.slug || idx} className="product-card" style={{ width: '100%' }}>
              <div className="card-image">
                <img src={img} alt={title} loading="lazy" />
                {badge && <div className="card-badge">{badge}</div>}
              </div>
              <div className="card-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                {specs.length > 0 && (
                  <ul className="card-specs">
                    {specs.map((s, sIdx) => (
                      <li key={sIdx}>
                        {renderSpecIcon(s.icon)}
                        <span>{s.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  className="btn btn-outline btn-sm mt-auto"
                  onClick={() => setSelectedProduct(p)}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
