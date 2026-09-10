'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { fetchSiteSettings } from '@/lib/api';

interface SiteSettings {
  company_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  about_summary?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({
    company_name: 'FireSlab Industries',
    phone: '+91 7310018656',
    email: 'info@fireslab.com',
    address: 'Sector 15, GIDA, Uttar Pradesh, India',
    facebook_url: 'https://www.facebook.com/fireslabindia',
    instagram_url: 'https://www.instagram.com/fireslab',
    linkedin_url: 'https://www.linkedin.com/company/fireslab',
    about_summary:
      "India's leading manufacturer of premium heating and water storage solutions.",
  });

  useEffect(() => {
    fetchSiteSettings().then((data) => {
      if (data) {
        setSettings((prev) => ({
          ...prev,
          ...data,
        }));
      }
    });
  }, []);

  return (
    <footer className="bg-[#0a0c0a] border-t border-white/5 pt-16 pb-12 text-[#8a9b8a]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block py-1">
              <Image
                src="/logo-fireslab.png"
                alt="FireSlab"
                width={170}
                height={40}
                className="h-[38px] sm:h-[42px] w-auto object-contain"
              />
            </Link>
            <p className="text-sm max-w-md text-[#8a9b8a] leading-relaxed">
              {settings.about_summary ||
                "India's leading manufacturer of premium heating and water storage solutions."}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2d6a35] text-white/80 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2d6a35] text-white/80 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2d6a35] text-white/80 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-['Barlow_Condensed'] uppercase tracking-wider text-base font-bold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#products"
                  className="hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/#applications"
                  className="hover:text-white transition-colors"
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="hover:text-white transition-colors"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/#technology"
                  className="hover:text-white transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-['Barlow_Condensed'] uppercase tracking-wider text-base font-bold text-white">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#4a9b55] flex-shrink-0" />
                <a
                  href={`tel:${settings.phone?.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone || '+91 7310018656'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#4a9b55] flex-shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.email || 'info@fireslab.com'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#4a9b55] flex-shrink-0 mt-1" />
                <span>{settings.address || 'GIDA, Uttar Pradesh, India'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom (Clean - NO agency/BrandNest reference) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} FireSlab Industries. All Rights Reserved.</p>
          <p className="tracking-wide">Engineered for Industrial Excellence</p>
        </div>
      </div>
    </footer>
  );
}
