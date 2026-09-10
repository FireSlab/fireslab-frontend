'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchHeroSlides } from '@/lib/api';

interface HeroSlide {
  id: string;
  tagline: string;
  title: string;
  description: string;
  primary_btn_text: string;
  primary_btn_url: string;
  secondary_btn_text: string;
  secondary_btn_url: string;
  image_url?: string | null;
  order_index: number;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: '1',
    tagline: 'Precision Engineering',
    title: 'Advanced Thermal \nSystems',
    description:
      'Custom-engineered heating and storage solutions for high-demand industrial and commercial environments.',
    primary_btn_text: 'Explore Products',
    primary_btn_url: '#products',
    secondary_btn_text: 'Consult Expert',
    secondary_btn_url: '#contact',
    image_url: '/tech3.jpg',
    order_index: 1,
  },
  {
    id: '2',
    tagline: 'Industrial Excellence',
    title: 'Maximum \nEfficiency',
    description:
      'Achieve up to 97% standby volume efficiency with our patented spiral heat exchanger technology.',
    primary_btn_text: 'View Technology',
    primary_btn_url: '#technology',
    secondary_btn_text: 'Request Quote',
    secondary_btn_url: '#contact',
    image_url: '/tech1.jpg',
    order_index: 2,
  },
  {
    id: '3',
    tagline: 'Modular Storage',
    title: 'Site-Assembled \nPanel Tanks',
    description:
      'Sectional stainless steel tanks designed for easy installation in restricted access areas and rooftops.',
    primary_btn_text: 'View Models',
    primary_btn_url: '#products',
    secondary_btn_text: 'Get Quote',
    secondary_btn_url: '#contact',
    image_url: '/panel-tank.png',
    order_index: 3,
  },
];

const FALLBACK_BGS = ['/tech3.jpg', '/tech1.jpg', '/panel-tank.png'];

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchHeroSlides().then((data) => {
      if (data && data.length > 0) {
        setSlides(data);
      }
    });
  }, []);

  useEffect(() => {
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    timerRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const handleSelectSlide = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex(idx);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  return (
    <section className="hero-slider">
      <div className="slides-container">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const bgImg = slide.image_url || FALLBACK_BGS[idx % FALLBACK_BGS.length];

          return (
            <div
              key={slide.id || idx}
              className={`slide ${isActive ? 'active' : ''}`}
            >
              <div
                className="slide-bg"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(13,15,13,0.92) 0%, rgba(13,15,13,0.5) 60%, rgba(13,15,13,0.3) 100%), url('${bgImg}')`,
                }}
              />
              <div className="container slide-content">
                <div className="content-text">
                  <span className="tagline">{slide.tagline}</span>
                  <h1>
                    {slide.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < slide.title.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h1>
                  <p>{slide.description}</p>
                  <div className="hero-btns">
                    <Link
                      href={slide.primary_btn_url || '#products'}
                      className="btn btn-green"
                    >
                      {slide.primary_btn_text || 'Explore Products'}
                    </Link>
                    <Link
                      href={slide.secondary_btn_url || '#contact'}
                      className="btn btn-outline"
                    >
                      {slide.secondary_btn_text || 'Consult Expert'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => handleSelectSlide(idx)}
            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
