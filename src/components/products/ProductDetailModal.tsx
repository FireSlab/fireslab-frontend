'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, CheckCircle2, ChevronDown, Building2 } from 'lucide-react';
import { ProductItem } from '@/components/home/ProductsHorizontalScroll';
import { RichText } from '../RichText';

interface ProductDetailModalProps {
  product: ProductItem | any | null;
  isOpen?: boolean;
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
  const img = product.card_image_url || product.cardImage || '/tank-1.png';
  const features = product.features || [];
  const materials = product.materials || [];
  const specs = product.technical_specs || product.specs || [];
  const compatibleSystems = product.compatible_systems || product.compatibleSystems || [];
  const applications = product.applications || [];
  const whyChoose = product.why_choose || product.whyChoose || [];
  const industries = product.industries || [];
  const faqs = product.faqs || [];
  const ctaText = product.cta_text || product.ctaText || 'Looking for a reliable and energy-efficient thermal storage or heat exchanger solution for your project? Contact us today for technical consultation, sizing assistance, and a customized quotation.';

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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

        {/* Modal Hero */}
        <div className="modal-hero">
          <img src={img} alt={title} />
          <div className="modal-hero-text">
            <h2 id="modal-title-heading">{title}</h2>
            <p className="modal-tagline">{tagline}</p>
          </div>
        </div>

        {/* Description */}
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

        {/* Available Materials */}
        {materials.length > 0 && (
          <>
            <h3 className="modal-section-title">Available Materials</h3>
            {materials.map((m: any, idx: number) => {
              if (typeof m === 'string') {
                return (
                  <div key={idx} className="modal-material">
                    <h4>{m}</h4>
                  </div>
                );
              }
              return (
                <div key={idx} className="modal-material">
                  <h4>{m.name}</h4>
                  {m.desc && <p>{m.desc}</p>}
                  {m.suitableFor && m.suitableFor.length > 0 && (
                    <>
                      <strong>Suitable For:</strong>
                      <ul className="modal-suitable-list">
                        {m.suitableFor.map((s: string, sIdx: number) => (
                          <li key={sIdx}>{s}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* Technical Specifications Table */}
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

        {/* Compatible Systems */}
        {compatibleSystems.length > 0 && (
          <>
            <h3 className="modal-section-title">Compatible Systems</h3>
            <ul className="modal-list">
              {compatibleSystems.map((s: any, idx: number) => {
                const name = typeof s === 'string' ? s : s?.name || String(s);
                return (
                  <li key={idx}>
                    <CheckCircle2 size={16} />
                    <span>{name}</span>
                  </li>
                );
              })}
            </ul>
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

        {/* Why Choose Our Product */}
        {whyChoose.length > 0 && (
          <>
            <h3 className="modal-section-title">Why Choose Our {title}?</h3>
            <ul className="modal-list">
              {whyChoose.map((w: any, idx: number) => {
                const text = typeof w === 'string' ? w : w?.title || w?.text || String(w);
                return (
                  <li key={idx}>
                    <CheckCircle2 size={16} />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* Industries We Serve */}
        {industries.length > 0 && (
          <>
            <h3 className="modal-section-title">Industries We Serve</h3>
            <ul className="modal-list modal-list-grid">
              {industries.map((ind: any, idx: number) => {
                const indName = typeof ind === 'string' ? ind : ind?.name || String(ind);
                return (
                  <li key={idx}>
                    <Building2 size={16} />
                    <span>{indName}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* Frequently Asked Questions */}
        {faqs.length > 0 && (
          <>
            <h3 className="modal-section-title">Frequently Asked Questions</h3>
            <div className="modal-faqs">
              {faqs.map((faq: any, idx: number) => {
                const question = faq?.q || faq?.question || '';
                const answer = faq?.a || faq?.answer || '';
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="faq-item">
                    <button
                      type="button"
                      className={`faq-question ${isOpen ? 'open' : ''}`}
                      onClick={() => toggleFaq(idx)}
                    >
                      <span>{question}</span>
                      <ChevronDown
                        className={`faq-icon ${isOpen ? 'rotate-180' : ''}`}
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
                      />
                    </button>
                    <div
                      className={`faq-answer ${isOpen ? 'open' : ''}`}
                      style={{
                        maxHeight: isOpen ? '400px' : '0',
                        padding: isOpen ? '0.8rem 1.2rem 1rem' : '0 1.2rem',
                        overflow: 'hidden',
                        transition: 'all 0.35s ease',
                      }}
                    >
                      <p>{answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* CTA Block */}
        <div className="modal-cta">
          <p>{ctaText}</p>
          <Link
            href="/#contact"
            className="btn btn-green"
            onClick={onClose}
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
