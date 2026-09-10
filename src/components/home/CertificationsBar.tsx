'use client';

import { Award, ShieldCheck, CheckCircle2, Briefcase } from 'lucide-react';

export interface CertificationItem {
  id: string;
  title: string;
  icon_name?: string;
  badge_image_url?: string | null;
  order_index?: number;
}

function renderCertIcon(name: string) {
  switch (name?.toLowerCase()) {
    case 'shield-check':
    case 'shield':
      return <ShieldCheck size={40} className="text-[#2d6a35]" />;
    case 'check-circle':
    case 'check':
      return <CheckCircle2 size={40} className="text-[#2d6a35]" />;
    case 'briefcase':
      return <Briefcase size={40} className="text-[#2d6a35]" />;
    case 'award':
    default:
      return <Award size={40} className="text-[#2d6a35]" />;
  }
}

export default function CertificationsBar({ certifications = [] }: { certifications?: CertificationItem[] }) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section className="certifications" aria-label="Certifications & Quality Standards">
      <div className="container">
        <div className="cert-grid">
          {certifications.map((cert, idx) => (
            <div key={cert.id || idx} className="cert-item">
              {renderCertIcon(cert.icon_name || 'award')}
              <span>{cert.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
