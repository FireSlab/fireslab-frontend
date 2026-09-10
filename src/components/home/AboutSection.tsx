'use client';

import React, { useState, useEffect } from 'react';
import { fetchSiteSettings } from '@/lib/api';

interface SiteSettings {
  about_summary?: string;
  vision_text?: string;
}

export default function AboutSection() {
  const [settings, setSettings] = useState<SiteSettings>({
    about_summary:
      'FireSlab is a brand focused on heating, hot water storage, and thermal system solutions for residential, commercial, and industrial projects.',
    vision_text:
      'To build dependable and efficient thermal solutions that combine performance, durability, and practical engineering for modern projects.',
  });

  useEffect(() => {
    fetchSiteSettings().then((data) => {
      if (data) {
        setSettings((prev) => ({
          ...prev,
          about_summary: data.about_summary || prev.about_summary,
          vision_text: data.vision_text || prev.vision_text,
        }));
      }
    });
  }, []);

  return (
    <section id="about" className="about-fireslab">
      <div className="container">
        <div className="about-grid">
          {/* Main Story Column */}
          <div className="about-main">
            <span className="section-tag">About FireSlab</span>
            <h2>
              Building Thermal Solutions <br />
              <span className="highlight">That Last.</span>
            </h2>
            <p className="large-text">{settings.about_summary}</p>
            <p className="text-[#8a9b8a] text-sm sm:text-base leading-relaxed mb-6">
              What started with a simple goal &mdash; building reliable and
              long-lasting systems &mdash; has grown into a brand trusted across
              different applications and industries. From water storage tanks to
              heat exchangers and insulation systems, our products are designed
              to perform efficiently in real working conditions.
            </p>
            <div className="vision-box">
              <strong>Our Vision</strong>
              <p className="text-[#f0f4f0] text-sm sm:text-base leading-relaxed">
                {settings.vision_text}
              </p>
            </div>
          </div>

          {/* Secondary Strengths Column */}
          <div className="about-secondary">
            <div className="strength-card bg-[#161a16] p-8 border border-white/5 rounded-sm">
              <h3>Manufacturing Strength</h3>
              <p className="text-[#8a9b8a] text-sm leading-relaxed">
                Our products are manufactured using high-grade stainless steel
                and modern fabrication processes to ensure structural strength,
                corrosion resistance, and extended service life.
              </p>
              <ul className="mini-list">
                <li>Precision manufacturing &amp; automated welding</li>
                <li>Heavy-duty corrosion resistance</li>
                <li>Certified thermal insulation performance</li>
              </ul>
            </div>

            <div className="strength-card bg-[#161a16] p-8 border border-white/5 rounded-sm">
              <h3>Quality Standards</h3>
              <p className="text-[#8a9b8a] text-sm leading-relaxed mb-3">
                From certified material selection to final pneumatic and hydrostatic
                testing, every system goes through meticulous inspection to ensure
                flawless site performance.
              </p>
              <p className="text-[#8a9b8a] text-sm leading-relaxed">
                We believe products should perform reliably for decades in
                actual site conditions, not just on paper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
