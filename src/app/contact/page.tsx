import { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Engineering & Sales | FireSlab Industries',
  description:
    'Get in touch with FireSlab Industries for technical consultations, equipment sizing, and customized commercial hot water system quotations.',
};

export const revalidate = 60;

export default function ContactPage() {
  return (
    <div className="pt-36 pb-16 bg-[#0d0f0d] min-h-screen">
      <ContactSection />
    </div>
  );
}
