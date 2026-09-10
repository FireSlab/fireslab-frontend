'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { submitLeadInquiry, fetchSiteSettings } from '@/lib/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    solution_interest: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    phone: '+91 7310018656',
    email: 'info@fireslab.com',
    address: 'Sector 15, GIDA, Uttar Pradesh, India',
  });

  useEffect(() => {
    fetchSiteSettings().then((data) => {
      if (data) {
        setSettings({
          phone: data.phone || '+91 7310018656',
          email: data.email || 'info@fireslab.com',
          address: data.address || 'Sector 15, GIDA, Uttar Pradesh, India',
        });
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    try {
      await submitLeadInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        solution_interest: formData.solution_interest || 'General Inquiry',
        message: formData.message.trim() || undefined,
      });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        solution_interest: '',
        message: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-grid">
        {/* Contact Info */}
        <div className="contact-info">
          <span className="hero-tag">Get in Touch</span>
          <h2>
            Ready to Optimize Your <br />
            <span className="highlight">Thermal Efficiency?</span>
          </h2>
          <p>
            Our engineering team is ready to design a custom solution for your specific industrial requirements.
          </p>

          <div className="contact-methods">
            <div className="method">
              <Phone size={24} />
              <div>
                <strong>Call Us</strong>
                <p>{settings.phone}</p>
              </div>
            </div>
            <div className="method">
              <Mail size={24} />
              <div>
                <strong>Email Us</strong>
                <p>{settings.email}</p>
              </div>
            </div>
            <div className="method">
              <MapPin size={24} />
              <div>
                <strong>Visit Us</strong>
                <p>{settings.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Wrapper */}
        <div className="contact-form-wrapper">
          {submitSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle size={48} style={{ color: 'var(--green-light)', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#fff', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                Inquiry Sent Successfully!
              </h3>
              <p style={{ color: 'var(--steel-gray)', fontSize: '0.9rem', maxWidth: '320px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Our engineering team has received your project details and will contact you within 24 hours.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSubmitSuccess(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />

              <select
                required
                value={formData.solution_interest}
                onChange={(e) => setFormData({ ...formData, solution_interest: e.target.value })}
              >
                <option value="" disabled>
                  Select Solution Interest
                </option>
                <option value="Hot Water Tanks">Hot Water Tanks</option>
                <option value="Heat Exchangers">Heat Exchangers</option>
                <option value="Modular Panel Tanks">Modular Panel Tanks</option>
                <option value="Heating Elements">Heating Elements</option>
                <option value="Custom Engineering">Custom Engineering</option>
              </select>

              <textarea
                placeholder="Tell us about your project requirements..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              {serverError && (
                <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{serverError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-green w-100"
                style={{ width: '100%', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
