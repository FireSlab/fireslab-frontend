'use client';

import React from 'react';
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { RichText } from '../RichText';

export interface SolutionItem {
  id: string;
  category_tag: string;
  title_line1: string;
  title_line2: string;
  description: string;
  image_url: string;
  features?: string[] | null;
  linked_product_id?: string | null;
  order_index?: number;
}

interface SolutionExpandedSpecsProps {
  solution: SolutionItem | null;
}

export default function SolutionExpandedSpecs({ solution }: SolutionExpandedSpecsProps) {
  if (!solution) {
    return (
      <section id="expanded-details" className="sol-expanded-section">
        <div className="container mx-auto px-4 max-w-6xl text-center py-16 text-white/50">
          <h3 className="text-xl font-display uppercase tracking-wider text-white mb-2">
            Select a solution to view detailed specifications
          </h3>
          <p className="text-sm text-white/60">
            Click on any card above or use the arrows to explore our range.
          </p>
        </div>
      </section>
    );
  }

  const defaultFeatures = [
    'High efficiency heat transfer & minimal delta-T loss',
    'Industrial grade SS 304 / SS 316L fabrication',
    'Low maintenance, self-cleaning flow geometry',
    'Certified to ASME, CE & ISO 9001:2015 safety standards',
  ];

  const featuresList = (solution.features && solution.features.length > 0)
    ? solution.features
    : defaultFeatures;

  return (
    <section id="expanded-details" className="sol-expanded-section">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="expanded-sol-content">
          {/* Left Text Column */}
          <div className="expanded-text">
            <span className="sol-tag">
              {solution.category_tag || 'Engineered Thermal Solution'}
            </span>
            <h2 className="text-white">
              {solution.title_line1} {solution.title_line2}
            </h2>
            <div className="large-desc">
              <RichText content={solution.description} />
            </div>

            {/* Features 2-column Grid */}
            <div className="sol-features-grid">
              {featuresList.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <CheckCircle className="w-5 h-5 text-[#2d6a35] flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* Quote / Inquiry CTA */}
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2d6a35] hover:bg-[#388543] text-white text-xs font-mono uppercase tracking-widest font-semibold rounded transition-all shadow-lg hover:shadow-[#2d6a35]/25"
              >
                <span>Request Quote for this Solution</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="expanded-image">
            <img
              src={solution.image_url || '/tank-1.png'}
              alt={`${solution.title_line1} ${solution.title_line2}`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
