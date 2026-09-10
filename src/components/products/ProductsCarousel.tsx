'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ProductItem } from '@/components/home/ProductsHorizontalScroll';
import ProductDetailModal from '@/components/products/ProductDetailModal';

// Approved Fallback Products from FireSlab Product.docx
const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: 'pressurized-tank',
    slug: 'pressurized-tank',
    card_badge: 'Bestseller',
    card_title: 'Pressurized Hot Water Storage Tank',
    card_description:
      'For residential, commercial & industrial use. Compatible with heat pumps, solar systems, and boilers.',
    card_image_url: '/tank-1.png',
  },
  {
    id: 'non-pressurized-tank',
    slug: 'non-pressurized-tank',
    card_badge: 'Thermal Retention',
    card_title: 'Insulated Water Storage Tank',
    card_description:
      'Efficient storage for hot & cold water applications. High-density PUF insulation with SS304/SS316 construction.',
    card_image_url: '/p2.png',
  },
  {
    id: 'glass-lined-tank',
    slug: 'glass-lined-tank',
    card_badge: 'Corrosion Resistant',
    card_title: 'Glass Lined Hot Water Storage Tank',
    card_description:
      'Reliable, corrosion-resistant & energy-efficient hot water storage with advanced glass enamel internal coating.',
    card_image_url: '/p3.png',
  },
  {
    id: 'modular-panel-tank',
    slug: 'modular-panel-tank',
    card_badge: 'Modular Storage',
    card_title: 'Modular Panel Water Tank',
    card_description:
      'High-capacity modular water storage solutions for commercial, industrial & infrastructure projects.',
    card_image_url: '/panel-tank.png',
  },
  {
    id: 'heat-exchangers',
    slug: 'heat-exchangers',
    card_badge: 'Thermal Transfer',
    card_title: 'Heat Exchangers',
    card_description:
      'Spiral, Shell & Tube, and Corrugated heat exchangers for industrial process and HVAC applications.',
    card_image_url: '/tech2.jpg',
  },
  {
    id: 'heating-elements',
    slug: 'heating-elements',
    card_badge: 'Custom Wattage',
    card_title: 'Heating Elements',
    card_description:
      'Industrial-grade custom wattage heating elements for tanks, boilers, and process equipment.',
    card_image_url: '/tech3.jpg',
  },
];

interface ProductsCarouselProps {
  products: ProductItem[];
  initialProductSlug?: string | null;
}

export default function ProductsCarousel({
  products: initialProducts,
  initialProductSlug,
}: ProductsCarouselProps) {
  // Use passed products or fallback if empty
  const activeProducts =
    initialProducts && initialProducts.length > 0
      ? initialProducts
      : FALLBACK_PRODUCTS;

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const solOrderRef = useRef<number[]>([]);
  const solDetailsEvenRef = useRef(true);
  const isAnimatingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isModalOpenRef = useRef(false);
  isModalOpenRef.current = !!selectedProduct;

  const solCardWidth = 200;
  const solCardHeight = 300;
  const solGap = 40;
  const solNumberSize = 50;
  const solEase = 'sine.inOut';

  const getProductTitleParts = (item: ProductItem) => {
    const full =
      item.card_title || item.cardTitle || (item as any).name || 'FireSlab Product';
    const words = full.split(' ');
    if (words.length <= 2) {
      return { t1: full, t2: '' };
    }
    return {
      t1: words.slice(0, 2).join(' '),
      t2: words.slice(2).join(' '),
    };
  };

  const updateDetailsBox = useCallback(
    (boxId: string, item: ProductItem) => {
      const box = containerRef.current?.querySelector(boxId);
      if (!box) return;
      const catEl = box.querySelector('.sol-text');
      const t1El = box.querySelector('.sol-title-1');
      const t2El = box.querySelector('.sol-title-2');
      const descEl = box.querySelector('.sol-desc');

      const { t1, t2 } = getProductTitleParts(item);
      const badge =
        item.card_badge ||
        item.cardBadge ||
        (item as any).categories?.name ||
        'FireSlab Industrial';

      if (catEl) catEl.textContent = badge;
      if (t1El) t1El.textContent = t1;
      if (t2El) t2El.textContent = t2;
      if (descEl)
        descEl.textContent =
          item.card_description || item.cardDesc || item.modal_tagline || '';

      const specsBox = box.querySelector('.sol-specs-list');
      if (specsBox) {
        const specs = (item.card_specs || (item as any).cardSpecs || []) as any[];
        if (Array.isArray(specs) && specs.length > 0) {
          specsBox.innerHTML = specs
            .map((s) => {
              const val = s?.value || s?.text || '';
              const lbl = s?.label || s?.param || '';
              const display =
                lbl && val && !val.toLowerCase().includes(lbl.toLowerCase())
                  ? `${lbl}: ${val}`
                  : val || lbl;
              return `<span style="background: rgba(45, 106, 53, 0.2); border: 1px solid rgba(45, 106, 53, 0.4); color: var(--green-light); font-size: 0.78rem; font-family: var(--font-labels); text-transform: uppercase; letter-spacing: 0.05em; padding: 0.2rem 0.65rem; border-radius: 2px;">${display}</span>`;
            })
            .join(' ');
        } else {
          specsBox.innerHTML = '';
        }
      }
    },
    []
  );

  const solStep = useCallback(
    (direction: 'next' | 'prev' = 'next'): Promise<void> => {
      if (
        !containerRef.current ||
        activeProducts.length === 0 ||
        isAnimatingRef.current
      ) {
        return Promise.resolve();
      }
      isAnimatingRef.current = true;

      return new Promise<void>((resolve) => {
        const order = solOrderRef.current;
        if (direction === 'next') {
          const shifted = order.shift()!;
          order.push(shifted);
        } else {
          const popped = order.pop()!;
          order.unshift(popped);
        }

        solDetailsEvenRef.current = !solDetailsEvenRef.current;
        const detailsActive = solDetailsEvenRef.current
          ? '#prod-details-even'
          : '#prod-details-odd';
        const detailsInactive = solDetailsEvenRef.current
          ? '#prod-details-odd'
          : '#prod-details-even';

        const activeIdx = order[0];
        const activeItem = activeProducts[activeIdx];
        updateDetailsBox(detailsActive, activeItem);

        const width = window.innerWidth;
        const height = window.innerHeight;
        const solOffsetTop = height - 430;
        const solOffsetLeft = Math.max(20, width - 830);

        // Staggered text reveal for active box
        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.3, ease: solEase });
        gsap.to(`${detailsActive} .sol-text`, {
          y: 0,
          delay: 0.1,
          duration: 0.6,
          ease: solEase,
        });
        gsap.to(`${detailsActive} .sol-title-1`, {
          y: 0,
          delay: 0.15,
          duration: 0.6,
          ease: solEase,
        });
        gsap.to(`${detailsActive} .sol-title-2`, {
          y: 0,
          delay: 0.15,
          duration: 0.6,
          ease: solEase,
        });
        gsap.to(`${detailsActive} .sol-desc`, {
          y: 0,
          delay: 0.25,
          duration: 0.4,
          ease: solEase,
        });
        gsap.to(`${detailsActive} .sol-cta`, {
          y: 0,
          delay: 0.3,
          duration: 0.4,
          ease: solEase,
        });

        // Hide inactive box
        gsap.set(detailsInactive, { zIndex: 12 });

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        gsap.set(`#prod-card-${prv}`, { zIndex: 10 });
        gsap.set(`#prod-card-${active}`, { zIndex: 20 });
        gsap.to(`#prod-card-${prv}`, { scale: 1.4, ease: solEase });

        gsap.to(`#prod-card-content-${active}`, {
          y: solOffsetTop + solCardHeight - 10,
          opacity: 0,
          duration: 0.3,
          ease: solEase,
        });
        gsap.to(`#prod-slide-item-${active}`, { x: 0, ease: solEase });
        gsap.to(`#prod-slide-item-${prv}`, { x: -solNumberSize, ease: solEase });
        gsap.to('.prod-progress-fg', {
          width: 320 * (1 / order.length) * (active + 1),
          ease: solEase,
        });

        // Expand active card to full viewport
        gsap.to(`#prod-card-${active}`, {
          x: 0,
          y: 0,
          ease: solEase,
          width: width,
          height: height,
          borderRadius: 0,
          onComplete: () => {
            const xNew =
              solOffsetLeft + (rest.length - 1) * (solCardWidth + solGap);
            gsap.set(`#prod-card-${prv}`, {
              x: xNew,
              y: solOffsetTop,
              width: solCardWidth,
              height: solCardHeight,
              zIndex: 30,
              borderRadius: 10,
              scale: 1,
            });
            gsap.set(`#prod-card-content-${prv}`, {
              x: xNew,
              y: solOffsetTop + solCardHeight - 100,
              opacity: 1,
              zIndex: 40,
            });
            gsap.set(`#prod-slide-item-${prv}`, {
              x: rest.length * solNumberSize,
            });

            // Reset inactive details box coordinates
            gsap.set(detailsInactive, { opacity: 0 });
            gsap.set(`${detailsInactive} .sol-text`, { y: 100 });
            gsap.set(`${detailsInactive} .sol-title-1`, { y: 100 });
            gsap.set(`${detailsInactive} .sol-title-2`, { y: 100 });
            gsap.set(`${detailsInactive} .sol-desc`, { y: 50 });
            gsap.set(`${detailsInactive} .sol-cta`, { y: 60 });

            isAnimatingRef.current = false;
            resolve();
          },
        });

        // Slide remaining deck cards forward
        rest.forEach((i, index) => {
          if (i !== prv) {
            const xNew = solOffsetLeft + index * (solCardWidth + solGap);
            gsap.set(`#prod-card-${i}`, { zIndex: 30 });
            gsap.to(`#prod-card-${i}`, {
              x: xNew,
              y: solOffsetTop,
              width: solCardWidth,
              height: solCardHeight,
              ease: solEase,
              delay: 0.08 * (index + 1),
            });
            gsap.to(`#prod-card-content-${i}`, {
              x: xNew,
              y: solOffsetTop + solCardHeight - 100,
              opacity: 1,
              zIndex: 40,
              ease: solEase,
              delay: 0.08 * (index + 1),
            });
            gsap.to(`#prod-slide-item-${i}`, {
              x: (index + 1) * solNumberSize,
              ease: solEase,
            });
          }
        });
      });
    },
    [activeProducts, updateDetailsBox]
  );

  const triggerNext = useCallback(() => {
    if (isAnimatingRef.current || isModalOpenRef.current) return;
    solStep('next');
  }, [solStep]);

  const triggerPrev = useCallback(() => {
    if (isAnimatingRef.current || isModalOpenRef.current) return;
    solStep('prev');
  }, [solStep]);

  // Initialize GSAP positions on mount
  useEffect(() => {
    if (!containerRef.current || activeProducts.length === 0) return;

    // Set initial order (optionally start at requested product slug)
    const initialOrder = activeProducts.map((_, i) => i);
    if (initialProductSlug) {
      const matchIdx = activeProducts.findIndex(
        (p) => p.slug === initialProductSlug || p.id === initialProductSlug
      );
      if (matchIdx > 0) {
        const target = initialOrder.splice(matchIdx, 1)[0];
        initialOrder.unshift(target);
      }
    }
    solOrderRef.current = initialOrder;

    const [active, ...rest] = initialOrder;
    solDetailsEvenRef.current = true;
    const detailsActive = '#prod-details-even';
    const detailsInactive = '#prod-details-odd';

    updateDetailsBox(detailsActive, activeProducts[active]);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const solOffsetTop = height - 430;
    const solOffsetLeft = Math.max(20, width - 830);

    gsap.set('#prod-pagination', {
      top: solOffsetTop + 330,
      left: solOffsetLeft,
      y: 200,
      opacity: 0,
      zIndex: 60,
    });
    gsap.set(`#prod-card-${active}`, {
      x: 0,
      y: 0,
      width: width,
      height: height,
      borderRadius: 0,
      zIndex: 20,
    });
    gsap.set(`#prod-card-content-${active}`, { x: 0, y: 0, opacity: 0 });

    gsap.set(detailsActive, { opacity: 0, zIndex: 22, y: 100 });
    gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
    gsap.set(`${detailsInactive} .sol-text`, { y: 100 });
    gsap.set(`${detailsInactive} .sol-title-1`, { y: 100 });
    gsap.set(`${detailsInactive} .sol-title-2`, { y: 100 });
    gsap.set(`${detailsInactive} .sol-desc`, { y: 50 });
    gsap.set(`${detailsInactive} .sol-cta`, { y: 60 });

    gsap.set('.prod-progress-fg', {
      width: 320 * (1 / initialOrder.length) * (active + 1),
    });

    rest.forEach((i, index) => {
      gsap.set(`#prod-card-${i}`, {
        x: solOffsetLeft + 400 + index * (solCardWidth + solGap),
        y: solOffsetTop,
        width: solCardWidth,
        height: solCardHeight,
        zIndex: 30,
        borderRadius: 10,
      });
      gsap.set(`#prod-card-content-${i}`, {
        x: solOffsetLeft + 400 + index * (solCardWidth + solGap),
        zIndex: 40,
        y: solOffsetTop + solCardHeight - 100,
      });
      gsap.set(`#prod-slide-item-${i}`, { x: (index + 1) * solNumberSize });
    });

    gsap.set('.prod-indicator', { x: -width });

    const startDelay = 0.5;
    gsap.to('.prod-cover', {
      x: width + 400,
      delay: 0.3,
      duration: 0.8,
      ease: solEase,
    });

    rest.forEach((i, index) => {
      gsap.to(`#prod-card-${i}`, {
        x: solOffsetLeft + index * (solCardWidth + solGap),
        zIndex: 30,
        delay: 0.05 * index + startDelay,
        ease: solEase,
      });
      gsap.to(`#prod-card-content-${i}`, {
        x: solOffsetLeft + index * (solCardWidth + solGap),
        zIndex: 40,
        delay: 0.05 * index + startDelay,
        ease: solEase,
      });
    });

    gsap.to('#prod-pagination', {
      y: 0,
      opacity: 1,
      ease: solEase,
      delay: startDelay,
    });
    gsap.to(detailsActive, { opacity: 1, y: 0, ease: solEase, delay: startDelay });

    // Auto-open modal if a specific product slug was requested (from navbar dropdown click)
    let autoOpenTimer: ReturnType<typeof setTimeout> | null = null;
    if (initialProductSlug) {
      const matchIdx = activeProducts.findIndex(
        (p) => p.slug === initialProductSlug || p.id === initialProductSlug
      );
      if (matchIdx >= 0) {
        autoOpenTimer = setTimeout(() => {
          setSelectedProduct(activeProducts[matchIdx]);
        }, 850); // wait for entrance animation to partially play
      }
    }

    // Autoplay Timer (Pauses if hovered or modal open)
    const interval = setInterval(() => {
      if (
        !isModalOpenRef.current &&
        !isHoveredRef.current &&
        !isAnimatingRef.current
      ) {
        gsap.to('.prod-indicator', {
          x: 0,
          duration: 2.0,
          ease: 'none',
          onComplete: () => {
            gsap.to('.prod-indicator', {
              x: window.innerWidth,
              duration: 0.6,
              ease: 'power2.in',
              onComplete: () => {
                gsap.set('.prod-indicator', { x: -window.innerWidth });
                if (
                  !isModalOpenRef.current &&
                  !isHoveredRef.current &&
                  !isAnimatingRef.current
                ) {
                  triggerNext();
                }
              },
            });
          },
        });
      }
    }, 6500);

    return () => {
      clearInterval(interval);
      if (autoOpenTimer) clearTimeout(autoOpenTimer);
    };
  }, [activeProducts, initialProductSlug, triggerNext, updateDetailsBox]);

  // Debounced Wheel Navigation (Container only)
  const lastWheelRef = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    if (selectedProduct || isAnimatingRef.current) return;
    const now = Date.now();
    if (now - lastWheelRef.current < 700) return;
    if (Math.abs(e.deltaY) > 30) {
      lastWheelRef.current = now;
      if (e.deltaY > 0) {
        triggerNext();
      } else {
        triggerPrev();
      }
    }
  };

  // Touch Swipe Navigation
  const touchStartXRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (selectedProduct) return;
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (selectedProduct || touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(diff) > 40) {
      if (diff > 0) triggerNext();
      else triggerPrev();
    }
  };

  const handleCardClick = (clickedIdx: number) => {
    const currentActiveIdx = solOrderRef.current[0];
    if (clickedIdx === currentActiveIdx) {
      // Clicked on active product -> open modal
      setSelectedProduct(activeProducts[clickedIdx]);
    } else {
      // Advance forward
      triggerNext();
    }
  };

  const handleExploreActive = () => {
    const activeIdx = solOrderRef.current[0] ?? 0;
    const item = activeProducts[activeIdx];
    if (item) setSelectedProduct(item);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0b0e0b',
      }}
      onWheel={handleWheel}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <section
        id="solutions"
        className="solutions-animated full-page-sol"
        ref={containerRef}
        style={{ height: '100vh', width: '100%', position: 'relative' }}
      >
        <div className="solutions-indicator prod-indicator" />

        <div id="solutions-demo">
          {activeProducts.map((item, idx) => {
            const { t1, t2 } = getProductTitleParts(item);
            const badge =
              item.card_badge ||
              item.cardBadge ||
              (item as any).categories?.name ||
              'FireSlab Industrial';
            const img =
              item.card_image_url ||
              item.cardImage ||
              FALLBACK_PRODUCTS[idx % FALLBACK_PRODUCTS.length].card_image_url ||
              '/tank-1.png';

            return (
              <React.Fragment key={item.id || item.slug || idx}>
                <div
                  id={`prod-card-${idx}`}
                  className="sol-card cursor-pointer"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'rgba(11, 14, 11, 0.95)',
                  }}
                  onClick={() => handleCardClick(idx)}
                />
                <div
                  id={`prod-card-content-${idx}`}
                  className="sol-card-content"
                >
                  <div className="sol-content-start" />
                  <div className="sol-content-place">{badge}</div>
                  <div className="sol-content-title-1">{t1}</div>
                  <div className="sol-content-title-2">{t2}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Dual Alternating Details Containers for Seamless Crossfade */}
        <div className="sol-details" id="prod-details-even">
          <div className="sol-place-box">
            <div className="sol-text" />
          </div>
          <div className="sol-title-box-1">
            <div className="sol-title-1" />
          </div>
          <div className="sol-title-box-2">
            <div className="sol-title-2" />
          </div>
          <div className="sol-desc" />
          <div
            className="sol-specs-list"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              margin: '0.8rem 0 1.2rem',
            }}
          />
          <div className="sol-cta">
            <button
              type="button"
              onClick={handleExploreActive}
              className="btn btn-green explore-sol-btn cursor-pointer"
            >
              Explore Full Specs
            </button>
          </div>
        </div>

        <div className="sol-details" id="prod-details-odd">
          <div className="sol-place-box">
            <div className="sol-text" />
          </div>
          <div className="sol-title-box-1">
            <div className="sol-title-1" />
          </div>
          <div className="sol-title-box-2">
            <div className="sol-title-2" />
          </div>
          <div className="sol-desc" />
          <div
            className="sol-specs-list"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              margin: '0.8rem 0 1.2rem',
            }}
          />
          <div className="sol-cta">
            <button
              type="button"
              onClick={handleExploreActive}
              className="btn btn-green explore-sol-btn cursor-pointer"
            >
              Explore Full Specs
            </button>
          </div>
        </div>

        {/* Carousel Pagination & Arrows */}
        <div className="sol-pagination" id="prod-pagination">
          <div
            className="sol-arrow sol-arrow-left cursor-pointer"
            onClick={triggerPrev}
            aria-label="Previous Slide"
            role="button"
            tabIndex={0}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div
            className="sol-arrow sol-arrow-right cursor-pointer"
            onClick={triggerNext}
            aria-label="Next Slide"
            role="button"
            tabIndex={0}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div className="sol-progress-container">
            <div className="sol-slide-numbers" id="sol-slide-numbers">
              {activeProducts.map((_, index) => (
                <div
                  key={index}
                  className="sol-item"
                  id={`prod-slide-item-${index}`}
                >
                  0{index + 1}
                </div>
              ))}
            </div>
            <div className="sol-progress-bg">
              <div className="sol-progress-fg prod-progress-fg" />
            </div>
          </div>
        </div>

        <div className="sol-cover prod-cover" />
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
