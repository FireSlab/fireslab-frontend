'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
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
      'Leading manufacturer of pressurized hot water storage tanks, modular panel tanks, and advanced thermal engineering solutions across India and international markets.',
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
              'Leading manufacturer of pressurized hot water storage tanks, modular panel tanks, and advanced thermal engineering solutions across India and international markets.'}
          </p>
          <div className="social-links">
            {settings.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            )}
            {settings.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            )}
            {settings.linkedin_url && (
              <a
                href={settings.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/#about">About FireSlab</a>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <a href="/#technology">Technology</a>
            </li>
            <li>
              <a href="/#applications">Applications</a>
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
              <span>{settings.address || 'Sector 15, GIDA, Uttar Pradesh, India'}</span>
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
        <div className="container footer-bottom-inner" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <p>&copy; {new Date().getFullYear()} FireSlab Industries. All rights reserved. Designed for industrial excellence.</p>
        </div>
      </div>
    </footer>
  );
}
