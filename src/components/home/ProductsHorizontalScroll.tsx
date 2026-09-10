'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import ProductDetailModal from '@/components/products/ProductDetailModal';

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
  gallery_images?: string[];
  card_specs?: any[];
  cardSpecs?: any[];
  modal_title?: string;
  modalTitle?: string;
  modal_tagline?: string;
  modalTagline?: string;
  modal_description?: string;
  modalDescription?: string;
  features?: any[];
  materials?: string[];
  capacities?: string[];
  technical_specs?: any[];
  specs?: any[];
  applications?: string[];
  faqs?: any[];
  cta_text?: string;
}

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: 'pressurized-tank',
    slug: 'pressurized-tank',
    card_badge: 'Bestseller',
    card_title: 'Pressurized Hot Water Storage Tank',
    card_description:
      'For residential, commercial & industrial use. Compatible with heat pumps, solar systems, and boilers.',
    card_image_url: '/tank-1.png',
    card_specs: [
      { label: 'Capacity', value: '100L – 10,000L' },
      { label: 'Pressure', value: 'Up to 10 Bar' },
      { label: 'Material', value: 'SS304 / SS316L' },
    ],
  },
  {
    id: 'non-pressurized-tank',
    slug: 'non-pressurized-tank',
    card_badge: 'Thermal Retention',
    card_title: 'Insulated Water Storage Tank',
    card_description:
      'Efficient storage for hot & cold water applications. High-density PUF insulation with SS304/SS316 construction.',
    card_image_url: '/p2.png',
    card_specs: [
      { label: 'Capacity', value: '500L – 3,000L' },
      { label: 'Insulation', value: '50mm High-Density PUF' },
      { label: 'Loss', value: '< 1.5°C / 24 hrs' },
    ],
  },
  {
    id: 'glass-lined-tank',
    slug: 'glass-lined-tank',
    card_badge: 'Corrosion Resistant',
    card_title: 'Glass Lined Hot Water Storage Tank',
    card_description:
      'Reliable, corrosion-resistant & energy-efficient hot water storage with advanced glass enamel internal coating.',
    card_image_url: '/p3.png',
    card_specs: [
      { label: 'Coating', value: 'DIN 4753 Vitreous Enamel' },
      { label: 'Pressure', value: 'Up to 7 Bar' },
      { label: 'Protection', value: 'Magnesium Anode Rod' },
    ],
  },
  {
    id: 'modular-panel-tank',
    slug: 'modular-panel-tank',
    card_badge: 'Modular Storage',
    card_title: 'Modular Panel Water Tank',
    card_description:
      'High-capacity modular water storage solutions for commercial, industrial & infrastructure projects.',
    card_image_url: '/panel-tank.png',
    card_specs: [
      { label: 'Capacity', value: '1,000L – 250,000L+' },
      { label: 'Structure', value: 'Sectional Bolted Panels' },
      { label: 'Installation', value: 'Site-assembled' },
    ],
  },
];

export default function ProductsHorizontalScroll({
  products = [],
}: {
  products?: ProductItem[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const displayProducts =
    products && products.length > 0 ? products : FALLBACK_PRODUCTS;

  // Mouse Drag-to-Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDownRef.current = true;
    scrollRef.current.classList.add('active');
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    if (!scrollRef.current) return;
    isDownRef.current = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    isDownRef.current = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.8;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  // Wheel horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  const scrollByAmount = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="products-section">
      <div className="container">
        {/* Section Header with Left/Right Arrows */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <span className="section-tag">Our Products</span>
            <h2>Complete Heating Solutions</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByAmount(-380)}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#2d6a35] bg-neutral-900/80 hover:bg-[#2d6a35] text-white flex items-center justify-center transition"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(380)}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#2d6a35] bg-neutral-900/80 hover:bg-[#2d6a35] text-white flex items-center justify-center transition"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
            <Link
              href="/products"
              className="btn btn-green text-xs font-bold tracking-widest uppercase ml-2"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Horizontal Drag-to-Scroll Area */}
        <div
          ref={scrollRef}
          className="horizontal-scroll-wrapper"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
        >
          <div className="products-grid">
            {displayProducts.map((p, idx) => {
              const title = p.card_title || p.cardTitle || 'FireSlab Product';
              const desc =
                p.card_description ||
                p.cardDesc ||
                p.modal_tagline ||
                'High-performance industrial thermal engineering system.';
              const badge = p.card_badge || p.cardBadge;
              const img =
                p.card_image_url ||
                p.cardImage ||
                FALLBACK_PRODUCTS[idx % FALLBACK_PRODUCTS.length].card_image_url ||
                '/tank-1.png';

              const rawSpecs = (p.card_specs || (p as any).cardSpecs || []) as any[];
              const specsList = Array.isArray(rawSpecs) ? rawSpecs.slice(0, 3) : [];

              return (
                <div key={p.id || p.slug || idx} className="product-card select-none">
                  <div className="card-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={title} draggable={false} />
                    {badge && <span className="card-badge">{badge}</span>}
                  </div>

                  <div className="card-body">
                    <h3>{title}</h3>
                    <p className="line-clamp-2">{desc}</p>

                    {specsList.length > 0 && (
                      <ul className="card-specs">
                        {specsList.map((s, sIdx) => {
                          const val = s?.value || s?.text || '';
                          const lbl = s?.label || s?.param || '';
                          const display =
                            lbl && val && !val.toLowerCase().includes(lbl.toLowerCase())
                              ? `${lbl}: ${val}`
                              : val || lbl;
                          return (
                            <li key={sIdx}>
                              <CheckCircle2 size={14} className="text-[#2d6a35] shrink-0" />
                              <span className="truncate">{display}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    <div className="mt-auto pt-2 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(p)}
                        className="btn btn-outline btn-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#2d6a35] hover:border-[#2d6a35] transition"
                      >
                        View Details
                      </button>

                      <Link
                        href={`/products?product=${p.slug}`}
                        className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition"
                      >
                        Explore <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2d6a35] hover:text-emerald-400 transition"
          >
            Browse Full Product Catalog <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
