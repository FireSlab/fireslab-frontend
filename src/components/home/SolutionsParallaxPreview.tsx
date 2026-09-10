'use client';

import React from 'react';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';

interface ParallaxSolution {
  title: string;
  image: string;
  variant: 'green' | 'blue' | 'orange';
  link: string;
}

const SOLUTIONS_PREVIEW: ParallaxSolution[] = [
  {
    title: 'Hot Water Tanks',
    image: '/tank-1.png',
    variant: 'green',
    link: '/solutions#tanks',
  },
  {
    title: 'Spiral Exchangers',
    image: '/exchanger-1.png',
    variant: 'blue',
    link: '/solutions#exchangers',
  },
  {
    title: 'Panel Tanks',
    image: '/panel-tank.png',
    variant: 'orange',
    link: '/solutions#panels',
  },
];

export default function SolutionsParallaxPreview() {
  return (
    <section id="solutions" className="solutions-parallax">
      <div className="container">
        {/* Header with Title and Link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
          <div>
            <span className="section-tag">Premium Solutions</span>
            <h2>
              Industrial Thermal <br />
              <span className="highlight">Excellence</span>
            </h2>
          </div>
          <Link
            href="/solutions"
            className="btn btn-green text-xs font-bold tracking-widest uppercase mb-2"
          >
            View All Solutions
          </Link>
        </div>

        {/* 3D Parallax Tilt Cards Grid */}
        <div className="parallax-grid">
          {SOLUTIONS_PREVIEW.map((sol, idx) => (
            <Tilt
              key={idx}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              transitionSpeed={400}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#ffffff"
              glarePosition="all"
              className={`parallax-box ${sol.variant}`}
            >
              <h2 className="sol-name">{sol.title}</h2>
              <div className="sol-circle" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sol.image}
                alt={sol.title}
                className="sol-product rounded-xl"
              />
              <Link href={sol.link} className="sol-explore">
                Explore Details
              </Link>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
