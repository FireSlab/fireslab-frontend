'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Droplets,
  Thermometer,
  ShieldCheck,
  LayoutGrid,
  Wind,
  Zap,
  Building2,
  Cross,
  Waves,
  Factory,
  Home,
  Egg,
  LucideIcon,
} from 'lucide-react';
import { fetchCategories, fetchApplications } from '@/lib/api';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon_name?: string;
}

interface ApplicationItem {
  id: string;
  name: string;
  slug: string;
  icon_name?: string;
}

// Icon helper mapping
const ICON_MAP: Record<string, LucideIcon> = {
  droplets: Droplets,
  thermometer: Thermometer,
  'shield-check': ShieldCheck,
  'layout-grid': LayoutGrid,
  wind: Wind,
  zap: Zap,
  'building-2': Building2,
  cross: Cross,
  waves: Waves,
  factory: Factory,
  home: Home,
  egg: Egg,
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileAppsOpen, setMobileAppsOpen] = useState(false);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Fetch dynamic categories and applications
    fetchCategories().then((data) => {
      if (data && data.length > 0) setCategories(data);
      else {
        // Fallback to demo items
        setCategories([
          { id: '1', name: 'Pressurized Hot Water Tank', slug: 'pressurized-tank', description: '100L – 10,000+ Litres | MS / SS304 / SS316', icon_name: 'droplets' },
          { id: '2', name: 'Non-Pressurized Insulated Tank', slug: 'non-pressurized-tank', description: '500L – 3000 Litres | PUF Insulated', icon_name: 'thermometer' },
          { id: '3', name: 'Glass Lined Hot Water Tank', slug: 'glass-lined-tank', description: 'Enamel Coated | Up to 7 Bar', icon_name: 'shield-check' },
          { id: '4', name: 'Modular Panel Tanks', slug: 'modular-panel-tank', description: '1,000L – 250,000+ Litres | Site-assembled', icon_name: 'layout-grid' },
          { id: '5', name: 'Heat Exchangers', slug: 'heat-exchangers', description: 'Spiral, Shell & Tube, Corrugated', icon_name: 'wind' },
          { id: '6', name: 'Heating Elements', slug: 'heating-elements', description: 'Custom wattage, industrial grade', icon_name: 'zap' },
        ]);
      }
    });

    fetchApplications().then((data) => {
      if (data && data.length > 0) setApplications(data);
      else {
        // Fallback to demo items
        setApplications([
          { id: '1', name: 'Hotels & Resorts', slug: 'hotels', icon_name: 'building-2' },
          { id: '2', name: 'Hospitals', slug: 'hospitals', icon_name: 'cross' },
          { id: '3', name: 'Swimming Pools', slug: 'pools', icon_name: 'waves' },
          { id: '4', name: 'Industrial Plants', slug: 'industrial', icon_name: 'factory' },
          { id: '5', name: 'Residential', slug: 'residential', icon_name: 'home' },
          { id: '6', name: 'Hatcheries', slug: 'hatcheries', icon_name: 'egg' },
        ]);
      }
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIconComponent = (name?: string, defaultIcon: LucideIcon = Droplets) => {
    if (!name) return defaultIcon;
    return ICON_MAP[name.toLowerCase()] || defaultIcon;
  };

  const hasSolidNav = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        hasSolidNav
          ? 'bg-[#0d0f0d]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group py-0.5">
          <Image
            src="/logo-fireslab.png"
            alt="FireSlab"
            width={220}
            height={60}
            className="h-[48px] sm:h-[54px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-8 font-['Barlow_Condensed'] tracking-wider uppercase text-sm font-semibold text-white/80">
          {/* Products Dropdown */}
          <li className="relative group/dropdown">
            <Link
              href="/products"
              className="flex items-center gap-1.5 py-2 hover:text-[#4a9b55] transition-colors"
            >
              <span>Products</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/dropdown:rotate-180" />
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:pointer-events-auto transition-all duration-200 ease-out z-50">
              <div className="w-[620px] bg-[#0d0f0d]/98 backdrop-blur-2xl border border-white/10 rounded-lg p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {categories.map((cat) => {
                    const IconComp = getIconComponent(cat.icon_name, Droplets);
                    return (
                      <Link
                        key={cat.id}
                        href={`/products#${cat.slug}`}
                        className="flex items-start gap-3.5 group/item transition-colors"
                      >
                        <span className="w-10 h-10 rounded-md bg-[#1c2b1e] border border-[#2d6a35]/40 text-[#4a9b55] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#2d6a35] group-hover/item:text-white group-hover/item:border-[#4a9b55] transition-all shadow-sm">
                          <IconComp className="w-5 h-5" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <strong className="block font-['Barlow_Condensed'] text-white text-sm font-bold uppercase tracking-wider group-hover/item:text-[#4a9b55] transition-colors leading-tight">
                            {cat.name}
                          </strong>
                          {cat.description && (
                            <small className="block text-xs text-[#8a9b8a] normal-case leading-snug mt-1 font-normal font-sans">
                              {cat.description}
                            </small>
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 pt-4 mt-6">
                  <Link
                    href="/products"
                    className="flex items-center justify-center gap-2 text-[#4a9b55] hover:text-white text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </li>

          {/* Applications Dropdown */}
          <li className="relative group/apps">
            <Link
              href="/#applications"
              className="flex items-center gap-1.5 py-2 hover:text-[#4a9b55] transition-colors"
            >
              <span>Applications</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/apps:rotate-180" />
            </Link>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible pointer-events-none group-hover/apps:opacity-100 group-hover/apps:visible group-hover/apps:pointer-events-auto transition-all duration-200 ease-out z-50">
              <div className="w-[540px] bg-[#0d0f0d]/98 backdrop-blur-2xl border border-white/10 rounded-lg p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                  {applications.map((app) => {
                    const IconComp = getIconComponent(app.icon_name, Building2);
                    return (
                      <Link
                        key={app.id}
                        href={`/products?app=${app.slug}`}
                        className="flex items-center gap-3.5 p-2 rounded-md hover:bg-[#2d6a35]/20 group/app transition-colors"
                      >
                        <span className="w-9 h-9 rounded-md bg-[#1c2b1e] border border-[#2d6a35]/40 text-[#4a9b55] flex items-center justify-center shrink-0 group-hover/app:bg-[#2d6a35] group-hover/app:text-white transition-all shadow-sm">
                          <IconComp className="w-4 h-4" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <strong className="block font-['Barlow_Condensed'] text-white text-sm font-bold uppercase tracking-wider group-hover/app:text-[#4a9b55] transition-colors leading-tight">
                            {app.name}
                          </strong>
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 pt-4 mt-5">
                  <Link
                    href="/products"
                    className="flex items-center justify-center gap-2 text-[#4a9b55] hover:text-white text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    <span>Explore All Applications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </li>

          <li>
            <Link href="/#technology" className="py-2 hover:text-[#4a9b55] transition-colors">
              Technology
            </Link>
          </li>
          <li>
            <Link href="/projects" className="py-2 hover:text-[#4a9b55] transition-colors">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/#about" className="py-2 hover:text-[#4a9b55] transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="py-2 hover:text-[#4a9b55] transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            className="hidden sm:inline-flex btn btn-green text-xs tracking-widest uppercase"
          >
            Get Quote
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#4a9b55] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#0d0f0d]/98 backdrop-blur-3xl border-b border-white/10 px-6 py-8 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl">
          <div className="space-y-4 font-['Barlow_Condensed'] uppercase tracking-wider text-base font-semibold">
            {/* Mobile Products Accordion */}
            <div>
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between text-white/90 py-2 border-b border-white/5"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileProductsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 py-3 space-y-3 bg-white/5 rounded-md mt-2">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/products#${c.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm normal-case text-white/70 hover:text-[#4a9b55]"
                    >
                      {c.name}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs text-[#4a9b55] font-bold pt-1"
                  >
                    View All Products &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Applications Accordion */}
            <div>
              <button
                onClick={() => setMobileAppsOpen(!mobileAppsOpen)}
                className="w-full flex items-center justify-between text-white/90 py-2 border-b border-white/5"
              >
                <span>Applications</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileAppsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAppsOpen && (
                <div className="pl-4 py-3 space-y-3 bg-white/5 rounded-md mt-2">
                  {applications.map((a) => (
                    <Link
                      key={a.id}
                      href={`/products?app=${a.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm normal-case text-white/70 hover:text-[#4a9b55]"
                    >
                      {a.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#technology"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white/90 py-2 border-b border-white/5"
            >
              Technology
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white/90 py-2 border-b border-white/5"
            >
              Projects
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white/90 py-2 border-b border-white/5"
            >
              About
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white/90 py-2 border-b border-white/5"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full btn btn-green text-center text-xs tracking-widest uppercase block"
          >
            Get Quote
          </Link>
        </div>
      )}
    </header>
  );
}
