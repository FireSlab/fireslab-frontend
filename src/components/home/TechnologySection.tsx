'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function TechnologySection() {
  const [barsVisible, setBarsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="technology" ref={sectionRef} className="why-fireslab">
      <div className="container">
        {/* Feature 1 */}
        <div className="feature-row">
          <div className="feature-image">
            <img
              src="/tech1.jpg"
              alt="Spiral Heat Exchanger"
              loading="lazy"
            />
          </div>
          <div className="feature-text">
            <h3>Spiral Heat Exchanger</h3>
            <p>
              Achieve 97% standby volume efficiency. Our spiral design ensures uniform heating and eliminates cold zones.
            </p>
            <div className="comparison-bar">
              <div className="bar-label">FireSlab SHE Efficiency</div>
              <div className="bar-container">
                <div
                  className="bar-fill green"
                  style={{
                    width: barsVisible ? '97%' : '0%',
                    transition: 'width 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  97%
                </div>
              </div>
            </div>
            <div className="comparison-bar">
              <div className="bar-label">Conventional Efficiency</div>
              <div className="bar-container">
                <div
                  className="bar-fill gray"
                  style={{
                    width: barsVisible ? '70%' : '0%',
                    transition: 'width 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                  }}
                >
                  70%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 (Reverse) */}
        <div className="feature-row reverse">
          <div className="feature-image">
            <img
              src="/tech2.jpg"
              alt="Shell & Tube with Turbulators"
              loading="lazy"
            />
          </div>
          <div className="feature-text">
            <h3>Shell &amp; Tube with Turbulators</h3>
            <p>
              Maximum heat transfer rate (3,500–5,000 W/m²K) using advanced turbulator rod technology.
            </p>
            <div className="stats-mini">
              <div className="mini-stat">
                <span className="val">5000+</span>
                <span className="unit">W/m²K</span>
              </div>
              <div className="mini-stat">
                <span className="val">40%</span>
                <span className="unit">Faster Heating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="feature-row">
          <div className="feature-image">
            <img
              src="/tech3.jpg"
              alt="Premium Stainless Steel"
              loading="lazy"
            />
          </div>
          <div className="feature-text">
            <h3>Premium Stainless Steel</h3>
            <p>
              Built using SS 304 and SS 316L grades for maximum corrosion resistance and longevity.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle2 className="icon-green shrink-0" size={20} />
                <span>25+ Year Service Life</span>
              </li>
              <li>
                <CheckCircle2 className="icon-green shrink-0" size={20} />
                <span>Food Grade Certification</span>
              </li>
              <li>
                <CheckCircle2 className="icon-green shrink-0" size={20} />
                <span>Zero Maintenance Design</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
