'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, CheckCircle2, ChevronDown, Building2 } from 'lucide-react';
import { ProductItem } from '@/components/home/ProductsHorizontalScroll';

import { RichText } from '../RichText';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!product) return null;

  const title = product.modal_title || product.modalTitle || product.card_title || product.cardTitle || 'FireSlab Product';
  const tagline = product.modal_tagline || product.modalTagline || 'Engineered Thermal Solutions';
  const description = product.modal_description || product.modalDescription || product.card_description || product.cardDesc || '';
  const img = product.card_image_url || product.cardImage || '/p1.png';
  const features = product.features || [];
  const specs = product.technical_specs || product.specs || [];
  const applications = product.applications || [];

  return (
    <div
      className="product-modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="product-modal-container">
        <button
          type="button"
          className="modal-close"
          aria-label="Close modal"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="modal-hero">
          <img src={img} alt={title} />
          <div className="modal-hero-text">
            <h2 id="modal-title-heading">{title}</h2>
            <p className="modal-tagline">{tagline}</p>
          </div>
        </div>

        {description && (
          <RichText content={description} className="modal-description" />
        )}

        {/* Key Features */}
        {features.length > 0 && (
          <>
            <h3 className="modal-section-title">Key Features</h3>
            <div className="modal-features-grid">
              {features.map((f, idx) => (
                <div key={idx} className="modal-feature-card">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Technical Specifications */}
        {specs.length > 0 && (
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
                {specs.map((s, idx) => (
                  <tr key={idx}>
                    <td>{s.param}</td>
                    <td>{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Applications */}
        {applications.length > 0 && (
          <>
            <h3 className="modal-section-title">Applications</h3>
            <ul className="modal-list">
              {applications.map((app, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/#contact"
            className="btn btn-green"
            onClick={onClose}
          >
            Request a Quote
          </Link>
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
