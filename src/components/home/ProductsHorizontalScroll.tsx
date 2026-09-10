'use client';

import { useState } from 'react';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';
import { RichText } from '../RichText';
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
        <div
          className="product-modal-overlay active"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title-heading"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProduct(null);
          }}
        >
          <div className="product-modal-container">
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={20} />
            </button>

            <div className="modal-hero">
              <img
                src={
                  selectedProduct.card_image_url ||
                  selectedProduct.cardImage ||
                  '/p1.png'
                }
                alt={selectedProduct.modal_title || selectedProduct.card_title || 'Product'}
              />
              <div className="modal-hero-text">
                <h2 id="modal-title-heading">
                  {selectedProduct.modal_title || selectedProduct.modalTitle || selectedProduct.card_title || selectedProduct.cardTitle}
                </h2>
                <p className="modal-tagline">
                  {selectedProduct.modal_tagline || selectedProduct.modalTagline || 'Engineered Thermal Technology'}
                </p>
              </div>
            </div>

            {(selectedProduct.modal_description || selectedProduct.modalDescription || selectedProduct.card_description) && (
              <RichText
                content={selectedProduct.modal_description || selectedProduct.modalDescription || selectedProduct.card_description}
                className="modal-description"
              />
            )}

            {/* Key Features */}
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <>
                <h3 className="modal-section-title">Key Features</h3>
                <div className="modal-features-grid">
                  {selectedProduct.features.map((f, fIdx) => (
                    <div key={fIdx} className="modal-feature-card">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Technical Specifications */}
            {(selectedProduct.technical_specs || selectedProduct.specs) && (
              <>
                <h3 className="modal-section-title">Technical Specifications</h3>
                <table className="modal-specs-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedProduct.technical_specs || selectedProduct.specs || []).map((spec, spIdx) => (
                      <tr key={spIdx}>
                        <td>{spec.param}</td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {/* Applications List */}
            {selectedProduct.applications && selectedProduct.applications.length > 0 && (
              <>
                <h3 className="modal-section-title">Applications</h3>
                <ul className="modal-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {selectedProduct.applications.map((app, aIdx) => (
                    <li key={aIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#889888', marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={16} className="text-[#a8d5ba] shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href={`/products#${selectedProduct.slug}`}
                className="btn btn-green"
                onClick={() => setSelectedProduct(null)}
              >
                Inquire About This Product
              </Link>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
