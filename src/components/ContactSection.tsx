'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
  Send,
} from 'lucide-react';
import { submitLeadInquiry, fetchSiteSettings } from '@/lib/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    solution_interest: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
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

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.solution_interest) {
      errors.solution_interest = 'Please select a solution of interest';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitLeadInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        solution_interest: formData.solution_interest,
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
      setFormErrors({});
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0d0f0d] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details Column */}
          <div className="space-y-8">
            <div>
              <span className="font-['Barlow_Condensed'] text-[#e07b2a] tracking-widest uppercase font-bold text-sm block mb-2">
                Consult With Engineers
              </span>
              <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                Request a Custom Quote
              </h2>
              <p className="text-[#8a9b8a] mt-4 text-base leading-relaxed max-w-lg">
                Speak directly with our technical team to discuss sizing, materials,
                thermal efficiency ratings, and delivery timelines for your specific facility.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Phone */}
              <div className="flex items-start gap-4 p-5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#2d6a35]/40 transition-colors">
                <div className="w-11 h-11 rounded-md bg-[#2d6a35]/20 text-[#4a9b55] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white font-['Barlow_Condensed'] tracking-wider uppercase text-base">
                    Direct Line
                  </strong>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-sm text-[#8a9b8a] hover:text-white transition-colors"
                  >
                    {settings.phone}
                  </a>
                  <span className="block text-xs text-white/40 mt-0.5">
                    Monday to Saturday, 9:00 AM – 6:00 PM IST
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#2d6a35]/40 transition-colors">
                <div className="w-11 h-11 rounded-md bg-[#2d6a35]/20 text-[#4a9b55] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white font-['Barlow_Condensed'] tracking-wider uppercase text-base">
                    Engineering Inquiries
                  </strong>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm text-[#8a9b8a] hover:text-white transition-colors"
                  >
                    {settings.email}
                  </a>
                  <span className="block text-xs text-white/40 mt-0.5">
                    Technical documentation & CAD requests
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#2d6a35]/40 transition-colors">
                <div className="w-11 h-11 rounded-md bg-[#2d6a35]/20 text-[#4a9b55] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white font-['Barlow_Condensed'] tracking-wider uppercase text-base">
                    Manufacturing Facility
                  </strong>
                  <p className="text-sm text-[#8a9b8a]">
                    {settings.address}
                  </p>
                  <span className="block text-xs text-white/40 mt-0.5">
                    Industrial Development Authority Complex
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Form Column */}
          <div className="bg-[#161a16] p-8 sm:p-12 border border-white/10 rounded-sm shadow-2xl relative">
            {submitSuccess ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#2d6a35]/30 text-[#4a9b55] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-['Barlow_Condensed'] text-3xl font-bold uppercase tracking-wider text-white">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-sm text-[#8a9b8a] max-w-sm mx-auto">
                  Our engineering team will review your requirements and get back to you within 24 hours.
                </p>
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="btn btn-outline text-xs tracking-widest uppercase"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form space-y-5">
                {serverError && (
                  <div className="p-4 bg-red-950/40 border border-red-900/60 rounded flex items-center gap-3 text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={formErrors.name ? '!border-red-500' : ''}
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={formErrors.email ? '!border-red-500' : ''}
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Company / Organization Name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>

                {/* Solution Interest */}
                <div>
                  <select
                    value={formData.solution_interest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        solution_interest: e.target.value,
                      })
                    }
                    className={
                      formErrors.solution_interest ? '!border-red-500' : ''
                    }
                  >
                    <option value="" disabled>
                      Select Solution Interest *
                    </option>
                    <option value="Pressurized Hot Water Tanks">
                      Pressurized Hot Water Tanks
                    </option>
                    <option value="Non-Pressurized Insulated Tanks">
                      Non-Pressurized Insulated Tanks
                    </option>
                    <option value="Glass Lined Hot Water Tanks">
                      Glass Lined Hot Water Tanks
                    </option>
                    <option value="Modular Panel Tanks">
                      Modular Panel Tanks
                    </option>
                    <option value="Spiral Heat Exchangers">
                      Spiral Heat Exchangers
                    </option>
                    <option value="Shell & Tube Heat Exchangers">
                      Shell & Tube Heat Exchangers
                    </option>
                    <option value="Industrial Heating Elements">
                      Industrial Heating Elements
                    </option>
                    <option value="Custom Engineering Project">
                      Custom Engineering Project
                    </option>
                  </select>
                  {formErrors.solution_interest && (
                    <p className="text-red-400 text-xs mt-1">
                      {formErrors.solution_interest}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project requirements, capacity needed, operating pressure, or site conditions..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-green text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 py-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
