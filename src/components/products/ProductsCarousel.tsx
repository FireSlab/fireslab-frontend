'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ProductItem } from '@/components/home/ProductsHorizontalScroll';
import ProductDetailModal from '@/components/products/ProductDetailModal';

interface ProductsCarouselProps {
  products: ProductItem[];
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const solOrderRef = useRef<number[]>([]);
  const isAnimatingRef = useRef(false);
  const autoplayTimerRef = useRef<gsap.core.Tween | null>(null);

  const solCardWidth = 200;
  const solCardHeight = 300;
  const solGap = 40;
  const solNumberSize = 50;
  const solEase = 'sine.inOut';

  const updateDetailsContent = useCallback((item: ProductItem) => {
    const el = containerRef.current?.querySelector('#prod-details-main');
    if (!el) return;
    const catEl = el.querySelector('.sol-text');
    const t1El = el.querySelector('.sol-title-1');
    const t2El = el.querySelector('.sol-title-2');
    const descEl = el.querySelector('.sol-desc');

    const titleWords = (item.card_title || item.cardTitle || (item as any).name || 'FireSlab System').split(' ');
    const t1 = titleWords.slice(0, 2).join(' ');
    const t2 = titleWords.slice(2).join(' ');

    if (catEl) catEl.textContent = item.card_badge || (item as any).categories?.name || 'Engineered Thermal Solution';
    if (t1El) t1El.textContent = t1;
    if (t2El) t2El.textContent = t2;
    if (descEl) descEl.textContent = item.card_description || item.cardDesc || '';
  }, []);

  const solStep = useCallback(
    (direction: 'next' | 'prev' = 'next') => {
      if (isAnimatingRef.current || !containerRef.current || products.length === 0) {
        return Promise.resolve();
      }
      isAnimatingRef.current = true;

      return new Promise<void>((resolve) => {
        const order = solOrderRef.current;
        if (direction === 'next') {
          const first = order.shift()!;
          order.push(first);
        } else {
          const last = order.pop()!;
          order.unshift(last);
        }

        const activeItemIndex = order[0];
        const activeItem = products[activeItemIndex];

        const width = window.innerWidth;
        const height = window.innerHeight;
        const solOffsetTop = height - 430;
        const solOffsetLeft = Math.max(20, width - 830);

        const textTl = gsap.timeline();
        textTl
          .to('#prod-details-main', { opacity: 0, y: -15, duration: 0.25, ease: 'power2.in' })
          .call(() => {
            updateDetailsContent(activeItem);
          })
          .set('#prod-details-main', { y: 40 })
          .set('#prod-details-main .sol-text', { y: 40 })
          .set('#prod-details-main .sol-title-1', { y: 60 })
          .set('#prod-details-main .sol-title-2', { y: 60 })
          .set('#prod-details-main .sol-desc', { y: 30 })
          .set('#prod-details-main .sol-cta', { y: 30 })
          .to('#prod-details-main', { opacity: 1, y: 0, duration: 0.4, ease: solEase })
          .to(
            ['#prod-details-main .sol-text', '#prod-details-main .sol-title-1', '#prod-details-main .sol-title-2'],
            { y: 0, stagger: 0.05, duration: 0.5, ease: solEase },
            '-=0.3'
          )
          .to(
            ['#prod-details-main .sol-desc', '#prod-details-main .sol-cta'],
            { y: 0, stagger: 0.05, duration: 0.4, ease: solEase },
            '-=0.2'
          );

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        gsap.set(`#prod-card-${prv}`, { zIndex: 10 });
        gsap.set(`#prod-card-${active}`, { zIndex: 20 });
        gsap.to(`#prod-card-${prv}`, { scale: 1.5, ease: solEase });

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

        gsap.to(`#prod-card-${active}`, {
          x: 0,
          y: 0,
          ease: solEase,
          width: width,
          height: height,
          borderRadius: 0,
          onComplete: () => {
            const xNew = solOffsetLeft + (rest.length - 1) * (solCardWidth + solGap);
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
            gsap.set(`#prod-slide-item-${prv}`, { x: rest.length * solNumberSize });

            isAnimatingRef.current = false;
            resolve();
          },
        });

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
              delay: 0.1 * (index + 1),
            });
            gsap.to(`#prod-card-content-${i}`, {
              x: xNew,
              y: solOffsetTop + solCardHeight - 100,
              opacity: 1,
              zIndex: 40,
              ease: solEase,
              delay: 0.1 * (index + 1),
            });
            gsap.to(`#prod-slide-item-${i}`, {
              x: (index + 1) * solNumberSize,
              ease: solEase,
            });
          }
        });
      });
    },
    [products, updateDetailsContent]
  );

  useEffect(() => {
    if (!products || products.length === 0 || !containerRef.current) return;
    solOrderRef.current = products.map((_, i) => i);
    const order = solOrderRef.current;
    const [active, ...rest] = order;

    updateDetailsContent(products[active]);

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
    gsap.set('#prod-details-main', { opacity: 0, zIndex: 22, y: 60 });
    gsap.set('#prod-details-main .sol-text', { y: 60 });
    gsap.set('#prod-details-main .sol-title-1', { y: 80 });
    gsap.set('#prod-details-main .sol-title-2', { y: 80 });
    gsap.set('#prod-details-main .sol-desc', { y: 40 });
    gsap.set('#prod-details-main .sol-cta', { y: 40 });

    gsap.set('.prod-progress-fg', {
      width: 320 * (1 / order.length) * (active + 1),
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

    const startDelay = 0.4;
    gsap.to('.prod-cover', {
      x: width + 400,
      delay: 0.2,
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
    gsap.to('#prod-pagination', { y: 0, opacity: 1, ease: solEase, delay: startDelay });
    gsap.to('#prod-details-main', { opacity: 1, y: 0, ease: solEase, delay: startDelay });
    gsap.to(
      ['#prod-details-main .sol-text', '#prod-details-main .sol-title-1', '#prod-details-main .sol-title-2'],
      { y: 0, stagger: 0.05, duration: 0.6, ease: solEase, delay: startDelay + 0.1 }
    );
    gsap.to(
      ['#prod-details-main .sol-desc', '#prod-details-main .sol-cta'],
      { y: 0, stagger: 0.05, duration: 0.5, ease: solEase, delay: startDelay + 0.2 }
    );

    let isMounted = true;
    const runLoop = async () => {
      while (isMounted) {
        await new Promise((r) => {
          autoplayTimerRef.current = gsap.to('.prod-indicator', {
            x: 0,
            duration: 4.5,
            ease: 'none',
            onComplete: r,
          });
        });
        if (!isMounted) break;
        await new Promise((r) => {
          gsap.to('.prod-indicator', {
            x: window.innerWidth,
            duration: 0.6,
            ease: 'power2.in',
            onComplete: r,
          });
        });
        gsap.set('.prod-indicator', { x: -window.innerWidth });
        if (!isMounted) break;
        await solStep('next');
      }
    };

    const loopTimeout = setTimeout(() => {
      runLoop();
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(loopTimeout);
      if (autoplayTimerRef.current) autoplayTimerRef.current.kill();
    };
  }, [products, solStep, updateDetailsContent]);

  const handleCardClick = (index: number) => {
    if (isAnimatingRef.current) return;
    const item = products[index];
    setSelectedProduct(item);
  };

  const handleExploreActive = () => {
    const activeIndex = solOrderRef.current[0] ?? 0;
    const item = products[activeIndex];
    if (item) setSelectedProduct(item);
  };

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--steel-gray)' }}>
        <h3>No products found for the selected filter.</h3>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <section id="solutions" className="solutions-animated" ref={containerRef} style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <div className="solutions-indicator prod-indicator" />

        <div id="solutions-demo">
          {products.map((item, idx) => {
            const titleWords = (item.card_title || item.cardTitle || (item as any).name || 'FireSlab System').split(' ');
            const t1 = titleWords.slice(0, 2).join(' ');
            const t2 = titleWords.slice(2).join(' ');
            const badge = item.card_badge || (item as any).categories?.name || 'FireSlab';
            const img = item.card_image_url || item.cardImage || '/tank-1.png';

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
                    backgroundColor: 'rgba(18, 22, 18, 0.95)',
                  }}
                  onClick={() => handleCardClick(idx)}
                />
                <div id={`prod-card-content-${idx}`} className="sol-card-content">
                  <div className="sol-content-place">{badge}</div>
                  <div className="sol-content-title-1">{t1}</div>
                  <div className="sol-content-title-2">{t2}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="sol-details" id="prod-details-main">
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
          <div className="sol-cta">
            <button
              type="button"
              onClick={handleExploreActive}
              className="px-7 py-3.5 bg-[#2d6a35] hover:bg-[#388543] text-white text-xs font-mono uppercase tracking-widest font-semibold rounded transition-all shadow-lg hover:shadow-[#2d6a35]/25 cursor-pointer"
            >
              Explore Full Specs
            </button>
          </div>
        </div>

        <div className="sol-pagination" id="prod-pagination">
          <div className="sol-arrow sol-arrow-left" onClick={() => solStep('prev')} aria-label="Previous Slide">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div className="sol-arrow sol-arrow-right" onClick={() => solStep('next')} aria-label="Next Slide">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div className="sol-progress-container">
            <div className="sol-slide-numbers" id="sol-slide-numbers">
              {products.map((_, index) => (
                <div key={index} className="sol-item" id={`prod-slide-item-${index}`}>
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

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
