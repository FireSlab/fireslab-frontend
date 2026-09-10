'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { SolutionItem } from './SolutionExpandedSpecs';

interface SolutionsKineticSliderProps {
  solutions: SolutionItem[];
  onActiveChange: (index: number) => void;
}

export default function SolutionsKineticSlider({
  solutions,
  onActiveChange,
}: SolutionsKineticSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const solOrderRef = useRef<number[]>([]);
  const isAnimatingRef = useRef(false);
  const autoplayTimerRef = useRef<gsap.core.Tween | null>(null);

  const solCardWidth = 200;
  const solCardHeight = 300;
  const solGap = 40;
  const solNumberSize = 50;
  const solEase = 'sine.inOut';

  const updateDetailsContent = useCallback(
    (item: SolutionItem) => {
      const el = containerRef.current?.querySelector('#sol-details-main');
      if (!el) return;
      const catEl = el.querySelector('.sol-place-box .sol-text');
      const t1El = el.querySelector('.sol-title-1');
      const t2El = el.querySelector('.sol-title-2');
      const descEl = el.querySelector('.sol-desc');
      if (catEl) catEl.textContent = item.category_tag || 'Engineered Thermal Solution';
      if (t1El) t1El.textContent = item.title_line1 || '';
      if (t2El) t2El.textContent = item.title_line2 || '';
      if (descEl) descEl.textContent = item.description || '';
    },
    []
  );

  const solStep = useCallback(
    (direction: 'next' | 'prev' = 'next') => {
      if (isAnimatingRef.current || !containerRef.current || solutions.length === 0) {
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
        const activeItem = solutions[activeItemIndex];
        onActiveChange(activeItemIndex);

        const width = window.innerWidth;
        const height = window.innerHeight;
        const solOffsetTop = height - 430;
        const solOffsetLeft = width - 830;

        // Kinetic text transition timeline
        const textTl = gsap.timeline();
        textTl
          .to('#sol-details-main', { opacity: 0, y: -15, duration: 0.25, ease: 'power2.in' })
          .call(() => {
            updateDetailsContent(activeItem);
          })
          .set('#sol-details-main', { y: 40 })
          .set('#sol-details-main .sol-text', { y: 40 })
          .set('#sol-details-main .sol-title-1', { y: 60 })
          .set('#sol-details-main .sol-title-2', { y: 60 })
          .set('#sol-details-main .sol-desc', { y: 30 })
          .set('#sol-details-main .sol-cta', { y: 30 })
          .to('#sol-details-main', { opacity: 1, y: 0, duration: 0.4, ease: solEase })
          .to(
            ['#sol-details-main .sol-text', '#sol-details-main .sol-title-1', '#sol-details-main .sol-title-2'],
            { y: 0, stagger: 0.05, duration: 0.5, ease: solEase },
            '-=0.3'
          )
          .to(
            ['#sol-details-main .sol-desc', '#sol-details-main .sol-cta'],
            { y: 0, stagger: 0.05, duration: 0.4, ease: solEase },
            '-=0.2'
          );

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        gsap.set(`#sol-card-${prv}`, { zIndex: 10 });
        gsap.set(`#sol-card-${active}`, { zIndex: 20 });
        gsap.to(`#sol-card-${prv}`, { scale: 1.5, ease: solEase });

        gsap.to(`#sol-card-content-${active}`, {
          y: solOffsetTop + solCardHeight - 10,
          opacity: 0,
          duration: 0.3,
          ease: solEase,
        });
        gsap.to(`#sol-slide-item-${active}`, { x: 0, ease: solEase });
        gsap.to(`#sol-slide-item-${prv}`, { x: -solNumberSize, ease: solEase });
        gsap.to('.sol-progress-fg', {
          width: 320 * (1 / order.length) * (active + 1),
          ease: solEase,
        });

        gsap.to(`#sol-card-${active}`, {
          x: 0,
          y: 0,
          ease: solEase,
          width: width,
          height: height,
          borderRadius: 0,
          onComplete: () => {
            const xNew = solOffsetLeft + (rest.length - 1) * (solCardWidth + solGap);
            gsap.set(`#sol-card-${prv}`, {
              x: xNew,
              y: solOffsetTop,
              width: solCardWidth,
              height: solCardHeight,
              zIndex: 30,
              borderRadius: 10,
              scale: 1,
            });
            gsap.set(`#sol-card-content-${prv}`, {
              x: xNew,
              y: solOffsetTop + solCardHeight - 100,
              opacity: 1,
              zIndex: 40,
            });
            gsap.set(`#sol-slide-item-${prv}`, { x: rest.length * solNumberSize });

            isAnimatingRef.current = false;
            resolve();
          },
        });

        rest.forEach((i, index) => {
          if (i !== prv) {
            const xNew = solOffsetLeft + index * (solCardWidth + solGap);
            gsap.set(`#sol-card-${i}`, { zIndex: 30 });
            gsap.to(`#sol-card-${i}`, {
              x: xNew,
              y: solOffsetTop,
              width: solCardWidth,
              height: solCardHeight,
              ease: solEase,
              delay: 0.1 * (index + 1),
            });
            gsap.to(`#sol-card-content-${i}`, {
              x: xNew,
              y: solOffsetTop + solCardHeight - 100,
              opacity: 1,
              zIndex: 40,
              ease: solEase,
              delay: 0.1 * (index + 1),
            });
            gsap.to(`#sol-slide-item-${i}`, {
              x: (index + 1) * solNumberSize,
              ease: solEase,
            });
          }
        });
      });
    },
    [solutions, onActiveChange, updateDetailsContent]
  );

  // Initialize Layout
  useEffect(() => {
    if (!solutions || solutions.length === 0 || !containerRef.current) return;
    solOrderRef.current = solutions.map((_, i) => i);
    const order = solOrderRef.current;
    const [active, ...rest] = order;

    updateDetailsContent(solutions[active]);
    onActiveChange(active);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const solOffsetTop = height - 430;
    const solOffsetLeft = width - 830;

    gsap.set('#sol-pagination', {
      top: solOffsetTop + 330,
      left: solOffsetLeft,
      y: 200,
      opacity: 0,
      zIndex: 60,
    });
    gsap.set(`#sol-card-${active}`, {
      x: 0,
      y: 0,
      width: width,
      height: height,
      borderRadius: 0,
      zIndex: 20,
    });
    gsap.set(`#sol-card-content-${active}`, { x: 0, y: 0, opacity: 0 });
    gsap.set('#sol-details-main', { opacity: 0, zIndex: 22, y: 60 });
    gsap.set('#sol-details-main .sol-text', { y: 60 });
    gsap.set('#sol-details-main .sol-title-1', { y: 80 });
    gsap.set('#sol-details-main .sol-title-2', { y: 80 });
    gsap.set('#sol-details-main .sol-desc', { y: 40 });
    gsap.set('#sol-details-main .sol-cta', { y: 40 });

    gsap.set('.sol-progress-fg', {
      width: 320 * (1 / order.length) * (active + 1),
    });

    rest.forEach((i, index) => {
      gsap.set(`#sol-card-${i}`, {
        x: solOffsetLeft + 400 + index * (solCardWidth + solGap),
        y: solOffsetTop,
        width: solCardWidth,
        height: solCardHeight,
        zIndex: 30,
        borderRadius: 10,
      });
      gsap.set(`#sol-card-content-${i}`, {
        x: solOffsetLeft + 400 + index * (solCardWidth + solGap),
        zIndex: 40,
        y: solOffsetTop + solCardHeight - 100,
      });
      gsap.set(`#sol-slide-item-${i}`, { x: (index + 1) * solNumberSize });
    });

    gsap.set('.solutions-indicator', { x: -width });

    const startDelay = 0.5;
    gsap.to('.sol-cover', {
      x: width + 400,
      delay: 0.3,
      duration: 0.8,
      ease: solEase,
    });
    rest.forEach((i, index) => {
      gsap.to(`#sol-card-${i}`, {
        x: solOffsetLeft + index * (solCardWidth + solGap),
        zIndex: 30,
        delay: 0.05 * index + startDelay,
        ease: solEase,
      });
      gsap.to(`#sol-card-content-${i}`, {
        x: solOffsetLeft + index * (solCardWidth + solGap),
        zIndex: 40,
        delay: 0.05 * index + startDelay,
        ease: solEase,
      });
    });
    gsap.to('#sol-pagination', { y: 0, opacity: 1, ease: solEase, delay: startDelay });
    gsap.to('#sol-details-main', { opacity: 1, y: 0, ease: solEase, delay: startDelay });
    gsap.to(
      ['#sol-details-main .sol-text', '#sol-details-main .sol-title-1', '#sol-details-main .sol-title-2'],
      { y: 0, stagger: 0.05, duration: 0.6, ease: solEase, delay: startDelay + 0.1 }
    );
    gsap.to(
      ['#sol-details-main .sol-desc', '#sol-details-main .sol-cta'],
      { y: 0, stagger: 0.05, duration: 0.5, ease: solEase, delay: startDelay + 0.2 }
    );

    // Auto Loop Timeline
    let isMounted = true;
    const runLoop = async () => {
      while (isMounted) {
        await new Promise((r) => {
          autoplayTimerRef.current = gsap.to('.solutions-indicator', {
            x: 0,
            duration: 4,
            ease: 'none',
            onComplete: r,
          });
        });
        if (!isMounted) break;
        await new Promise((r) => {
          gsap.to('.solutions-indicator', {
            x: window.innerWidth,
            duration: 0.6,
            ease: 'power2.in',
            onComplete: r,
          });
        });
        gsap.set('.solutions-indicator', { x: -window.innerWidth });
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
  }, [solutions, onActiveChange, solStep, updateDetailsContent]);

  const handleCardClick = (index: number) => {
    if (isAnimatingRef.current) return;
    solStep('next');
    const expandedSec = document.getElementById('expanded-details');
    if (expandedSec) {
      setTimeout(() => {
        expandedSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };

  const handleArrowNext = () => {
    solStep('next');
  };

  const handleArrowPrev = () => {
    solStep('prev');
  };

  return (
    <section id="solutions" className="solutions-animated" ref={containerRef}>
      {/* Sweeping progress indicator */}
      <div className="solutions-indicator" />

      {/* Cards container */}
      <div id="solutions-demo">
        {solutions.map((item, idx) => (
          <React.Fragment key={item.id}>
            <div
              id={`sol-card-${idx}`}
              className="sol-card cursor-pointer"
              style={{ backgroundImage: `url(${item.image_url || '/tank-1.png'})` }}
              onClick={() => handleCardClick(idx)}
            />
            <div id={`sol-card-content-${idx}`} className="sol-card-content">
              <div className="sol-content-start" />
              <div className="sol-content-place">{item.category_tag}</div>
              <div className="sol-content-title-1">{item.title_line1}</div>
              <div className="sol-content-title-2">{item.title_line2}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Kinetic Details Main Block */}
      <div className="sol-details" id="sol-details-main">
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
          <a
            href="#expanded-details"
            className="px-6 py-3 bg-[#2d6a35] hover:bg-[#388543] text-white text-xs font-mono uppercase tracking-widest font-semibold rounded transition-all shadow-lg hover:shadow-[#2d6a35]/25"
          >
            Explore Full Specs
          </a>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="sol-pagination" id="sol-pagination">
        <div className="sol-arrow sol-arrow-left" onClick={handleArrowPrev} aria-label="Previous Slide">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="sol-arrow sol-arrow-right" onClick={handleArrowNext} aria-label="Next Slide">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="sol-progress-container">
          <div className="sol-slide-numbers" id="sol-slide-numbers">
            {solutions.map((_, index) => (
              <div key={index} className="sol-item" id={`sol-slide-item-${index}`}>
                0{index + 1}
              </div>
            ))}
          </div>
          <div className="sol-progress-bg">
            <div className="sol-progress-fg" />
          </div>
        </div>
      </div>

      {/* Initial load mask cover */}
      <div className="sol-cover" />
    </section>
  );
}
