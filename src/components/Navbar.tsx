'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  ArrowRight,
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
import { fetchCategories, fetchApplications, fetchProducts } from '@/lib/api';

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

const APPROVED_FALLBACK_PRODUCTS = [
  {
    name: 'Pressurized Hot Water Tank',
    slug: 'pressurized-tank',
    specs: '100L – 10,000+ Litres | MS / SS304 / SS316',
    icon_name: 'droplets',
  },
  {
    name: 'Non-Pressurized Insulated Tank',
    slug: 'non-pressurized-tank',
    specs: '500L – 3000 Litres | PUF Insulated',
    icon_name: 'thermometer',
  },
  {
    name: 'Glass Lined Hot Water Tank',
    slug: 'glass-lined-tank',
    specs: 'Enamel Coated | Up to 7 Bar',
    icon_name: 'shield-check',
  },
  {
    name: 'Modular Panel Tanks',
    slug: 'modular-panel-tank',
    specs: '1,000L – 250,000+ Litres | Site-assembled',
    icon_name: 'layout-grid',
  },
  {
    name: 'Heat Exchangers',
    slug: 'heat-exchangers',
    specs: 'Spiral, Shell & Tube, Corrugated',
    icon_name: 'wind',
  },
  {
    name: 'Heating Elements',
    slug: 'heating-elements',
    specs: 'Custom wattage, industrial grade',
    icon_name: 'zap',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileAppsOpen, setMobileAppsOpen] = useState(false);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([
    { id: '1', name: 'Hotels & Resorts', slug: 'hotels', icon_name: 'building-2' },
    { id: '2', name: 'Hospitals', slug: 'hospitals', icon_name: 'cross' },
    { id: '3', name: 'Swimming Pools', slug: 'pools', icon_name: 'waves' },
    { id: '4', name: 'Industrial Plants', slug: 'industrial', icon_name: 'factory' },
    { id: '5', name: 'Residential', slug: 'residential', icon_name: 'home' },
    { id: '6', name: 'Hatcheries', slug: 'hatcheries', icon_name: 'egg' },
  ]);
  const [navProducts, setNavProducts] = useState(APPROVED_FALLBACK_PRODUCTS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    fetchCategories().then((data) => {
      if (data && data.length > 0) setCategories(data);
    });

    fetchApplications().then((data) => {
      if (data && data.length > 0) setApplications(data);
    });

    fetchProducts().then((data) => {
      if (data && data.length > 0) {
        const dynamicNav = data.slice(0, 6).map((p: any) => {
          const specText =
            Array.isArray(p.card_specs) && p.card_specs.length > 0
              ? p.card_specs
                  .map((s: any) => s.value || s.text || s.label || '')
                  .filter(Boolean)
                  .join(' | ')
              : p.card_description || 'Industrial Thermal Solution';
          return {
            name: p.card_title || p.modal_title || 'FireSlab Product',
            slug: p.slug,
            specs: specText,
            icon_name: p.icon_name || 'droplets',
          };
        });
        setNavProducts(dynamicNav);
      }
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIconComponent = (name?: string, defaultIcon: LucideIcon = Droplets) => {
    if (!name) return defaultIcon;
    return ICON_MAP[name.toLowerCase()] || defaultIcon;
  };

  return (
    <header
      id="navbar"
      className={scrolled ? 'scrolled' : ''}
      style={{
        backgroundColor: '#0d0f0d',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <nav
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Brand Logo - Real FireSlab Logo */}
        <Link href="/" className="flex items-center group py-0.5 shrink-0">
          <Image
            src="/logo-fireslab.png"
            alt="FireSlab"
            width={180}
            height={48}
            className="h-[38px] sm:h-[44px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {/* Products Dropdown */}
          <li className={`has-dropdown ${mobileProductsOpen ? 'active' : ''}`}>
            <Link
              href="/products"
              onClick={(e) => {
                if (window.innerWidth <= 991) {
                  e.preventDefault();
                  setMobileProductsOpen(!mobileProductsOpen);
                }
              }}
            >
              Products <ChevronDown className="nav-arrow" />
            </Link>
            <div className="nav-dropdown">
              <div className="dropdown-grid">
                {APPROVED_FALLBACK_PRODUCTS.map((prod) => {
                  const IconComp = getIconComponent(prod.icon_name, Droplets);
                  return (
                    <Link
                      key={prod.slug}
                      href={`/products?product=${prod.slug}`}
                      className="dropdown-item"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="drop-icon">
                        <IconComp size={16} />
                      </span>
                      <span className="drop-text">
                        <strong>{prod.name}</strong>
                        <small>{prod.specs}</small>
                      </span>
                    </Link>
                  );
                })}

                {/* 4th Row: Left column gets the horizontal divider line */}
                <div
                  className="hidden md:block"
                  style={{
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                    margin: 'auto 0.75rem',
                  }}
                />

                {/* 4th Row: Right column gets the View All Products button */}
                <Link
                  href="/products"
                  className="dropdown-item"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: 'rgba(45,106,53,0.18)',
                    border: '1px solid rgba(45,106,53,0.35)',
                    borderRadius: '4px',
                    margin: '0.25rem 0.25rem',
                    padding: '0.75rem 1rem',
                  }}
                >
                  <strong
                    style={{
                      color: 'var(--green-light)',
                      fontSize: '0.85rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    View All Products <ArrowRight size={14} />
                  </strong>
                </Link>
              </div>
            </div>
          </li>

          {/* Applications Dropdown */}
          <li className={`has-dropdown ${mobileAppsOpen ? 'active' : ''}`}>
            <a
              href="/#applications"
              onClick={(e) => {
                if (window.innerWidth <= 991) {
                  e.preventDefault();
                  setMobileAppsOpen(!mobileAppsOpen);
                }
              }}
            >
              Applications <ChevronDown className="nav-arrow" />
            </a>
            <div className="nav-dropdown dropdown-list">
              {applications.map((app) => {
                const IconComp = getIconComponent(app.icon_name, Building2);
                return (
                  <Link
                    key={app.id || app.slug}
                    href={`/products?app=${app.slug}`}
                    className="dropdown-item-simple"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IconComp size={14} />
                    <span>{app.name}</span>
                  </Link>
                );
              })}
            </div>
          </li>

          <li>
            <a href="/#technology" onClick={() => setMobileMenuOpen(false)}>
              Technology
            </a>
          </li>
          <li>
            <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <a href="/#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="/#contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="nav-cta">
          <a href="/#contact" className="btn btn-green">
            Get Quote
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[1000] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
