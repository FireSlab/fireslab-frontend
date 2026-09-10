'use client';

import React, { useState, useEffect, useRef } from 'react';
import { fetchCompanyStats } from '@/lib/api';

interface CompanyStat {
  id: string;
  target_value: number;
  suffix: string;
  label: string;
  order_index: number;
}

const DEFAULT_STATS: CompanyStat[] = [
  { id: '1', target_value: 25, suffix: '+', label: 'Years Experience', order_index: 1 },
  { id: '2', target_value: 1500, suffix: '+', label: 'Projects Delivered', order_index: 2 },
  { id: '3', target_value: 97, suffix: '%', label: 'Thermal Efficiency', order_index: 3 },
  { id: '4', target_value: 10, suffix: 'Bar', label: 'Pressure Tested', order_index: 4 },
];

export default function StatsBar() {
  const [stats, setStats] = useState<CompanyStat[]>(DEFAULT_STATS);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetchCompanyStats().then((data) => {
      if (data && data.length > 0) {
        setStats(data);
        setCounts(new Array(data.length).fill(0));
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // 120 frames at 16ms interval (~1.92s) matching demo exactly
          let frame = 0;
          const totalFrames = 120;
          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            setCounts(
              stats.map((s) => Math.round(s.target_value * Math.min(progress, 1)))
            );

            if (frame >= totalFrames) {
              setCounts(stats.map((s) => s.target_value));
              clearInterval(timer);
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [stats, hasAnimated]);

  return (
    <section ref={sectionRef} className="stats-bar">
      <div className="container grid-4">
        {stats.map((stat, idx) => (
          <div key={stat.id || idx} className="stat-item">
            <span className="number">{counts[idx] ?? 0}</span>
            <span className="suffix">{stat.suffix}</span>
            <span className="label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
