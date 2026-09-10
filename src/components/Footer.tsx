'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
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
    address: 'Plot No. 42, Industrial Area, Phase II, New Delhi, India',
    linkedin_url: 'https://www.linkedin.com/company/fireslab',
    about_summary:
      'Engineered for extreme performance. Industrial heating and water storage solutions built to last decades.',
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
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand Column - Real FireSlab Logo */}
        <div className="footer-brand">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/logo-fireslab.png"
              alt="FireSlab"
              width={180}
              height={48}
              className="h-[40px] sm:h-[46px] w-auto object-contain"
            />
          </Link>
          <p>
            {settings.about_summary ||
              'Engineered for extreme performance. Industrial heating and water storage solutions built to last decades.'}
          </p>
          <div className="social-links">
            <a
              href={settings.linkedin_url || 'https://www.linkedin.com/company/fireslab'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://twitter.com/fireslab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.youtube.com/@fireslab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li>
              <a href="/#about">About FireSlab</a>
            </li>
            <li>
              <Link href="/solutions">Core Solutions</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <a href="/#technology">Technology</a>
            </li>
            <li>
              <a href="/#capacity">Specifications</a>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <MapPin size={16} />
              <span>{settings.address || 'Plot No. 42, Industrial Area, Phase II, New Delhi, India'}</span>
            </li>
            <li>
              <Phone size={16} />
              <span>{settings.phone || '+91 7310018656'}</span>
            </li>
            <li>
              <Mail size={16} />
              <span>{settings.email || 'info@fireslab.com'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} FireSlab Industries. All rights reserved. Designed for industrial excellence.</p>
          <p className="developed-by">
            Developed by{' '}
            <a href="https://brandnest.in" target="_blank" rel="noopener noreferrer">
              Brandnest
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
