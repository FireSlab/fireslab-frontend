'use client';

import { useState } from 'react';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';
import { RichText } from '../RichText';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import {
  X,
  Droplets,
  Shield,
  Layers,
  Flame,
  CheckCircle2,
  Cpu,
  Boxes,
} from 'lucide-react';

export interface ProductVariant {
  id?: string;
  model_code: string;
  capacity_litres: number;
  diameter_mm: number;
  height_mm: number;
  connection_inch: string;
  order_index?: number;
}

export interface ProductItem {
  id: string;
  slug: string;
  card_title?: string;
  cardTitle?: string;
  card_badge?: string | null;
  cardBadge?: string | null;
  card_description?: string;
  cardDesc?: string;
  card_image_url?: string;
  cardImage?: string;
  card_specs?: Array<{ icon: string; text: string }>;
  cardSpecs?: Array<{ icon: string; text: string }>;
  modal_title?: string;
  modalTitle?: string;
  modal_tagline?: string;
  modalTagline?: string;
  modal_description?: string;
  modalDescription?: string;
  features?: Array<{ title: string; desc: string }>;
  technical_specs?: Array<{ param: string; value: string }>;
  specs?: Array<{ param: string; value: string }>;
  applications?: string[];
  variants?: ProductVariant[];
}

const VARIANTS: Array<'green' | 'blue' | 'orange'> = ['green', 'blue', 'orange'];

export default function ProductsHorizontalScroll({ products = [] }: { products?: ProductItem[] }) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <section id="products" className="solutions-parallax">
      <div className="container">
        {/* Header with Title and Link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <span className="section-tag">Engineered Products</span>
            <h2>
              Advanced Thermal & <br />
              <span className="highlight">Storage Solutions</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="btn btn-green text-xs font-bold tracking-widest uppercase mb-2"
          >
            View All Products
          </Link>
        </div>

        {/* 3D Parallax Tilt Cards Grid */}
        <div className="parallax-grid">
          {products.map((p, idx) => {
            const title = p.card_title || p.cardTitle || 'FireSlab Product';
            const img = p.card_image_url || p.cardImage || '/tank-1.png';
            const variant = VARIANTS[idx % VARIANTS.length];

            return (
              <div
                key={p.id || p.slug || idx}
                onClick={() => setSelectedProduct(p)}
                style={{ display: 'contents', cursor: 'pointer' }}
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={1000}
                  transitionSpeed={400}
                  glareEnable={true}
                  glareMaxOpacity={0.2}
                  glareColor="#ffffff"
                  glarePosition="all"
                  className={`parallax-box ${variant}`}
                >
                  <h2 className="sol-name">{title}</h2>
                  <div className="sol-circle" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={title}
                    className="sol-product rounded-xl"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(p);
                    }}
                    className="sol-explore"
                  >
                    Explore Details
                  </button>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
