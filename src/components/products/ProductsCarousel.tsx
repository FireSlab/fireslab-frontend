'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { ProductItem } from '@/components/home/ProductsHorizontalScroll';
import ProductDetailModal from '@/components/products/ProductDetailModal';

interface ProductsCarouselProps {
  products: ProductItem[];
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexSlider, setIndexSlider] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const total = products.length;
  const angle = total > 0 ? 360 / total : 0;

  const handleNext = () => {
    if (total <= 1) return;
    setIndexSlider((prev) => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    if (total <= 1) return;
    setIndexSlider((prev) => prev - 1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDotClick = (targetIndex: number) => {
    if (targetIndex === currentIndex || total <= 1) return;
    const diff = targetIndex - currentIndex;
    setIndexSlider((prev) => prev + diff);
    setCurrentIndex(targetIndex);
  };

  if (total === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--steel-gray)' }}>
        <h3>No products found for the selected filter.</h3>
      </div>
    );
  }

  return (
    <div className="carousel-main" style={{ ['--total' as any]: total }}>
      <div className="carousel">
        {/* ================== 3D IMAGE ROTATOR WHEEL ================== */}
        <div className="img-box">
          <div className="img-list">
            <div
              className="img-slider"
              style={{
                transform: `rotate(${indexSlider * angle}deg)`,
              }}
            >
              {products.map((product, i) => {
                const isActive = i === currentIndex;
                const img = product.card_image_url || product.cardImage || '/p1.png';
                const title = product.card_title || product.cardTitle || 'Product';

                return (
                  <div
                    key={product.id || product.slug || i}
                    className={`img-item ${isActive ? 'active' : ''}`}
                    style={{ ['--i' as any]: i }}
                  >
                    <div
                      className="item"
                      style={{
                        transform: `rotate(${indexSlider * -angle}deg)`,
                      }}
                    >
                      <img src={img} alt={title} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================== INFO PANEL ================== */}
        <div className="info-box">
          {products.map((product, i) => {
            const isActive = i === currentIndex;
            const badge = product.card_badge || product.cardBadge || 'FireSlab';
            const title = product.card_title || product.cardTitle || 'FireSlab Product';
            const desc = product.card_description || product.cardDesc || '';

            return (
              <div
                key={product.id || product.slug || i}
                className={`info-item ${isActive ? 'active' : ''}`}
              >
                <span className="info-tagline">{badge}</span>
                <h2 className="info-title">{title}</h2>
                <p className="info-desc">{desc}</p>

                <ul className="info-specs">
                  <li>
                    <CheckCircle2 size={18} />
                    <span>High Quality Thermal Engineering</span>
                  </li>
                  <li>
                    <ShieldCheck size={18} />
                    <span>Food Grade Stainless Steel &amp; Certified Safety</span>
                  </li>
                  <li>
                    <Zap size={18} />
                    <span>Maximum Thermal Efficiency</span>
                  </li>
                </ul>

                <div className="info-btns">
                  <button
                    type="button"
                    className="btn btn-green"
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================== NAVIGATION BUTTONS ================== */}
        <div className="carousel-navigation">
          <button
            type="button"
            className="prev-btn"
            aria-label="Previous Product"
            onClick={handlePrev}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            className="next-btn"
            aria-label="Next Product"
            onClick={handleNext}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* ================== INDICATOR DOTS ================== */}
        <div className="carousel-indicators">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`indicator-dot ${i === currentIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
