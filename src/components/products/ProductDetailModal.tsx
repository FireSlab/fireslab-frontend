'use client';

import { useState, useEffect, useMemo } from 'react';
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

  // Determine main image
  const primaryImg = product?.card_image_url || product?.cardImage || '/p1.png';

  // Multi-image gallery list
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.gallery_images && Array.isArray(product.gallery_images) && product.gallery_images.length > 0) {
      return product.gallery_images;
    }
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }

    // Default angle shots for approved products so multi-image switching is immediately visible
    const slug = String(product.slug || product.id || '').toLowerCase();
    if (slug.includes('pressur') || slug === '1') {
      return ['/p1.png', '/tank-1.png', '/tech1.jpg'];
    }
    if (slug.includes('non-pressur') || slug === '2') {
      return ['/p2.png', '/tank-1.png', '/tech2.jpg'];
    }
    if (slug.includes('glass') || slug === '3') {
      return ['/p3.png', '/p1.png', '/tech1.jpg'];
    }
    if (slug.includes('panel') || slug === '4') {
      return ['/panel-tank.png', '/p4.png', '/tech3.jpg'];
    }
    return [primaryImg, '/tech1.jpg', '/tech2.jpg'];
  }, [product, primaryImg]);

  const [activeImage, setActiveImage] = useState<string>(primaryImg);

  useEffect(() => {
    if (product) {
      setActiveImage(primaryImg);
      setOpenFaq(null);
    }
  }, [product, primaryImg]);

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
  const features = product.features || [];
  const materials = product.materials || [];
  const cardSpecs = Array.isArray(product.card_specs)
    ? product.card_specs
    : Array.isArray(product.cardSpecs)
      ? product.cardSpecs
      : [];
  const specs =
    product.technical_specs && product.technical_specs.length > 0
      ? product.technical_specs
      : product.specs && product.specs.length > 0
        ? product.specs
        : cardSpecs.length > 0
          ? cardSpecs.map((s: any) => ({
              param: s.label || s.param || s.key || s.icon || 'Specification',
              value: s.value || s.text || s.val || '',
            }))
          : [];
  const compatibleSystems = product.compatible_systems || product.compatibleSystems || [];
  const applications = product.applications || [];
  const whyChoose = product.why_choose || product.whyChoose || [];
  const industries = product.industries || [];
  const faqs = product.faqs || [];
  const ctaText = product.cta_text || product.ctaText || 'Looking for a reliable and energy-efficient thermal storage or heat exchanger solution for your project? Our team can help you select the right capacity, material, and configuration based on your hot water demand, application, and budget. Contact us today for technical consultation, sizing assistance, and a customized quotation.';

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div
      id="product-modal"
      className="product-modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="product-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          id="modal-close"
          className="modal-close"
          aria-label="Close modal"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Modal Hero with Multi-Image Gallery */}
        <div className="modal-hero">
          <div className="modal-hero-gallery">
            <div className="modal-main-img-box">
              <img src={activeImage} alt={title} />
            </div>

            {/* Multi-image Thumbnails Row */}
            {galleryImages.length > 1 && (
              <div className="modal-thumbs-row">
                {galleryImages.map((thumb: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    className={`modal-thumb-btn ${activeImage === thumb ? 'active' : ''}`}
                    onClick={() => setActiveImage(thumb)}
                    title={`View angle ${idx + 1}`}
                  >
                    <img src={thumb} alt={`Angle ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-hero-text">
            <h2 id="modal-title-heading">{title}</h2>
            <p className="modal-tagline">{tagline}</p>

            {/* Quick Specs Badges from Admin */}
            {cardSpecs.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                {cardSpecs.map((s: any, idx: number) => {
                  const val = s?.value || s?.text || '';
                  const lbl = s?.label || s?.param || '';
                  const display =
                    lbl && val && !val.toLowerCase().includes(lbl.toLowerCase())
                      ? `${lbl}: ${val}`
                      : val || lbl;
                  return (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(45, 106, 53, 0.2)',
                        border: '1px solid rgba(45, 106, 53, 0.4)',
                        color: 'var(--green-light)',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-labels)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '2px',
                      }}
                    >
                      {display}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          typeof description === 'string' && !description.includes('<') ? (
            <div className="modal-description">
              {description.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="modal-description" style={{ marginBottom: '1rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <RichText content={description} className="modal-description" />
          )
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

        {/* Available Materials with Left Green Border & Suitable For Pills */}
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
              const matName = m?.name || m?.title || '';
              const matDesc = m?.desc || m?.description || '';
              const suitableList = m?.suitableFor || m?.suitable_for || [];
              return (
                <div key={idx} className="modal-material">
                  <h4>{matName}</h4>
                  {matDesc && <p>{matDesc}</p>}
                  {suitableList.length > 0 && (
                    <>
                      <strong>Suitable For:</strong>
                      <ul className="modal-suitable-list">
                        {suitableList.map((s: string, sIdx: number) => (
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
                    <CheckCircle2 size={15} />
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
                    <CheckCircle2 size={15} />
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
                    <CheckCircle2 size={15} />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* Industries We Serve (3-Column Grid with Building2 Icon) */}
        {industries.length > 0 && (
          <>
            <h3 className="modal-section-title">Industries We Serve</h3>
            <ul className="modal-list modal-list-grid">
              {industries.map((ind: any, idx: number) => {
                const indName = typeof ind === 'string' ? ind : ind?.name || String(ind);
                return (
                  <li key={idx}>
                    <Building2 size={15} />
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
                      aria-expanded={isOpen}
                    >
                      <span>{question}</span>
                      <ChevronDown
                        className="faq-icon"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </button>
                    <div
                      className={`faq-answer ${isOpen ? 'open' : ''}`}
                    >
                      <p>{answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Modal CTA */}
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
