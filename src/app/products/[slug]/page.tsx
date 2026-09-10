import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RichText } from '@/components/RichText';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, ArrowRight, Shield, Layers, HelpCircle } from 'lucide-react';
import { fetchProductBySlug, fetchProducts } from '@/lib/api';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p: any) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | FireSlab Industries',
      description: 'The requested industrial product could not be found.',
    };
  }

  const title = product.modal_title || product.card_title || 'Industrial Heating & Storage Solution';
  const description =
    product.modal_description ||
    product.card_description ||
    'Custom engineered thermal heating and water storage equipment by FireSlab Industries.';

  return {
    title: `${title} | FireSlab Industries`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${title} | FireSlab Industries`,
      description: description.slice(0, 160),
      images: product.card_image_url ? [{ url: product.card_image_url }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const title = product.modal_title || product.card_title;
  const tagline = product.modal_tagline || product.card_badge;
  const description = product.modal_description || product.card_description;
  const image = product.card_image_url || '/tank-1.png';

  return (
    <div className="min-h-screen bg-[#0d0f0d] text-white pt-36 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8a9e8d] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products Showcase</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#141814] border border-white/10 p-8 sm:p-12 rounded-xl mb-12 shadow-2xl">
          {/* Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-[#0b0e0b] rounded-lg p-6 border border-white/5 flex items-center justify-center">
              <img
                src={image}
                alt={title}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-7">
            {tagline && (
              <span className="inline-block px-3 py-1 bg-[#2d6a35]/30 text-[#2d6a35] border border-[#2d6a35]/40 text-xs font-mono uppercase tracking-wider rounded mb-4">
                {tagline}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-wide text-white mb-4 leading-tight">
              {title}
            </h1>
            <div className="text-sm sm:text-base text-white/70 leading-relaxed font-light mb-8">
              <RichText content={description} />
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="px-6 py-3 bg-[#2d6a35] hover:bg-[#388543] text-white text-xs font-mono uppercase tracking-widest font-semibold rounded flex items-center gap-2 transition-all shadow-lg hover:shadow-[#2d6a35]/25"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-widest font-semibold rounded border border-white/10 transition-colors"
              >
                View Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Engineering Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-display uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#e04e32]" />
              <span>Key Engineering Features</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feat: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 bg-[#141814] border border-white/5 rounded-lg hover:border-[#2d6a35]/40 transition-colors"
                >
                  <h3 className="text-base font-display uppercase tracking-wide text-[#e04e32] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2d6a35]" />
                    <span>{feat.title || feat}</span>
                  </h3>
                  {feat.desc && <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{feat.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Specs Table */}
        {product.technical_specs && product.technical_specs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-display uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2d6a35]" />
              <span>Technical Specifications</span>
            </h2>
            <div className="overflow-x-auto border border-white/10 rounded-lg bg-[#141814]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-[#8a9e8d]">
                    <th className="py-3 px-6">Specification Parameter</th>
                    <th className="py-3 px-6">Engineering Standard / Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {product.technical_specs.map((spec: any, idx: number) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-6 font-mono text-xs text-white/60">{spec.param}</td>
                      <td className="py-3.5 px-6 font-medium text-white">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Variants Table */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-display uppercase tracking-wider text-white mb-6">
              Available Standard Models &amp; Sizing
            </h2>
            <div className="overflow-x-auto border border-white/10 rounded-lg bg-[#141814]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-[#8a9e8d]">
                    <th className="py-3 px-6">Model Code</th>
                    <th className="py-3 px-6">Capacity</th>
                    <th className="py-3 px-6">Diameter (mm)</th>
                    <th className="py-3 px-6">Height (mm)</th>
                    <th className="py-3 px-6">Connections</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {product.variants.map((v: any) => (
                    <tr key={v.id} className="hover:bg-white/[0.02] transition-colors font-mono text-xs">
                      <td className="py-3.5 px-6 font-bold text-[#e04e32]">{v.model_code}</td>
                      <td className="py-3.5 px-6 text-white">{v.capacity_litres} Litres</td>
                      <td className="py-3.5 px-6 text-white/80">{v.diameter_mm || '—'}</td>
                      <td className="py-3.5 px-6 text-white/80">{v.height_mm || '—'}</td>
                      <td className="py-3.5 px-6 text-white/80">{v.connection_inch || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FAQs */}
        {product.faqs && product.faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-display uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#e04e32]" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-4">
              {product.faqs.map((faq: any, idx: number) => (
                <div key={idx} className="p-6 bg-[#141814] border border-white/5 rounded-lg">
                  <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#141814] to-[#1c241c] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-display uppercase tracking-wide text-white mb-2">
              Need Engineering Sizing or a Quotation?
            </h3>
            <p className="text-sm text-white/70 font-light max-w-xl">
              Our technical team provides custom capacity sizing, ASME pressure rating calculations, and tailored CAD drawings for consulting engineers.
            </p>
          </div>
          <Link
            href="/#contact"
            className="px-7 py-3.5 bg-[#2d6a35] hover:bg-[#388543] text-white text-xs font-mono uppercase tracking-widest font-semibold rounded whitespace-nowrap transition-all shadow-lg hover:shadow-[#2d6a35]/25"
          >
            Contact Engineering Team
          </Link>
        </div>
      </div>
    </div>
  );
}
