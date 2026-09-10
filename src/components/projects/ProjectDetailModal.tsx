'use client';

import React, { useEffect } from 'react';
import { X, MapPin, Wrench, Calendar, Building, ArrowRight } from 'lucide-react';
import { RichText } from '../RichText';
import Link from 'next/link';

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  location: string;
  category: string;
  product_used: string;
  product_id?: string | null;
  image_url: string;
  description: string;
  client_name?: string | null;
  completion_year?: string | number | null;
  is_featured?: boolean;
}

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#111411] border border-white/10 rounded-xl overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/70 hover:text-white hover:bg-black/90 transition-colors border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-80 bg-black overflow-hidden flex-shrink-0">
          <img
            src={project.image_url || '/app1.jpg'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111411] via-transparent to-black/30" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-[#2d6a35] text-white text-xs font-mono uppercase tracking-wider rounded mb-2">
              {project.product_used || project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-lg text-sm">
            <div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-mono uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#e04e32]" /> Location
              </div>
              <p className="text-white font-medium">{project.location}</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-mono uppercase tracking-wider mb-1">
                <Wrench className="w-3.5 h-3.5 text-[#2d6a35]" /> System Type
              </div>
              <p className="text-white font-medium">{project.product_used || 'Thermal System'}</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-mono uppercase tracking-wider mb-1">
                <Building className="w-3.5 h-3.5 text-[#2d6a35]" /> Client
              </div>
              <p className="text-white font-medium">{project.client_name || 'Commercial Client'}</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-mono uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#e04e32]" /> Year
              </div>
              <p className="text-white font-medium">{project.completion_year || '2024'}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#e04e32] mb-2">
              Project Overview & Engineering Scope
            </h4>
            <div className="text-white/80 leading-relaxed text-sm sm:text-base">
              <RichText content={project.description} />
            </div>
          </div>

          {/* Key Advantages */}
          <div className="border-t border-white/10 pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/60 mb-3">
              Key Engineering Highlights
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d6a35]" />
                <span>Heavy gauge SS 304 / SS 316L construction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d6a35]" />
                <span>Continuous thermal load optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d6a35]" />
                <span>Zero-loss insulation with rockwool & cladding</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d6a35]" />
                <span>Turnkey installation & on-site testing</span>
              </div>
            </div>
          </div>

          {/* Modal Footer / CTA */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/50">
              Need a similar industrial or commercial installation?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white border border-white/10 rounded hover:bg-white/5 transition-colors w-full sm:w-auto"
              >
                Close
              </button>
              <Link
                href="/#contact"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-[#2d6a35] hover:bg-[#388543] rounded flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#2d6a35]/25 w-full sm:w-auto"
              >
                <span>Request Similar Installation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
