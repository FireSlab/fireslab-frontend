'use client';

import React, { useState } from 'react';
import SolutionsKineticSlider from './SolutionsKineticSlider';
import SolutionExpandedSpecs, { SolutionItem } from './SolutionExpandedSpecs';

interface SolutionsPageClientProps {
  initialSolutions: SolutionItem[];
}

export default function SolutionsPageClient({ initialSolutions }: SolutionsPageClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSolution = initialSolutions[activeIndex] || initialSolutions[0] || null;

  return (
    <div className="bg-[#0b0e0b] min-h-screen">
      {/* Full-screen Kinetic GSAP Slider */}
      <SolutionsKineticSlider
        solutions={initialSolutions}
        onActiveChange={(idx) => setActiveIndex(idx)}
      />

      {/* Expanded Technical Specifications Section */}
      <SolutionExpandedSpecs solution={activeSolution} />
    </div>
  );
}
