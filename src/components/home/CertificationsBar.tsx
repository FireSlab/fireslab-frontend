'use client';

import { Award, ShieldCheck, CheckCircle2, Briefcase } from 'lucide-react';

export interface CertificationItem {
  id?: string;
  title: string;
  icon_name?: string;
  badge_image_url?: string | null;
  order_index?: number;
}

const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
  { id: 'cert-1', title: 'ISO 9001:2015', icon_name: 'award' },
  { id: 'cert-2', title: 'ASME Certified', icon_name: 'shield-check' },
  { id: 'cert-3', title: 'CE Marking', icon_name: 'check-circle' },
  { id: 'cert-4', title: 'MSME Registered', icon_name: 'briefcase' },
];

function renderCertIcon(name: string) {
  switch (name?.toLowerCase()) {
    case 'shield-check':
    case 'shield':
      return <ShieldCheck size={40} style={{ color: 'var(--green-brand)' }} />;
    case 'check-circle':
    case 'check':
      return <CheckCircle2 size={40} style={{ color: 'var(--green-brand)' }} />;
    case 'briefcase':
      return <Briefcase size={40} style={{ color: 'var(--green-brand)' }} />;
    case 'award':
    default:
      return <Award size={40} style={{ color: 'var(--green-brand)' }} />;
  }
}

export default function CertificationsBar({
  certifications = [],
}: {
  certifications?: CertificationItem[];
}) {
  const displayCerts =
    certifications && certifications.length >= 4
      ? certifications
      : DEFAULT_CERTIFICATIONS;

  return (
    <section className="certifications reveal" aria-label="Certifications & Quality Standards">
      <div className="container">
        <div className="cert-grid">
          {displayCerts.map((cert, idx) => (
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
