'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!product) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

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
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="product-modal-container"
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
      >
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
              {features.map((f: any, idx: number) => {
                const fTitle = typeof f === 'string' ? f : f?.title || f?.name || '';
                const fDesc = typeof f === 'object' ? f?.desc || f?.description || '' : '';
                return (
                  <div key={idx} className="modal-feature-card">
                    <h4>{fTitle}</h4>
                    {fDesc && <p>{fDesc}</p>}
                  </div>
                );
              })}
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
                {specs.map((s: any, idx: number) => (
                  <tr key={idx}>
                    <td>{s?.param || s?.parameter || s?.label || s?.key || ''}</td>
                    <td>{s?.value || s?.spec || ''}</td>
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
              {applications.map((app: any, idx: number) => {
                const appName = typeof app === 'string' ? app : app?.name || app?.label || String(app);
                return (
                  <li key={idx}>
                    <CheckCircle2 size={16} />
                    <span>{appName}</span>
                  </li>
                );
              })}
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
