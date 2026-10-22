import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fireslab.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FireSlab | Premium Industrial Heating Systems & Storage Solutions',
    template: '%s | FireSlab Industries',
  },
  description:
    'FireSlab Industries manufactures high-performance pressurized hot water tanks, spiral heat exchangers, and modular stainless steel storage solutions.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'FireSlab Industries',
    title: 'FireSlab | Premium Industrial Heating Systems & Storage Solutions',
    description:
      'FireSlab Industries manufactures high-performance pressurized hot water tanks, spiral heat exchangers, and modular stainless steel storage solutions.',
    images: [
      {
        url: '/logo-fireslab.png',
        width: 800,
        height: 600,
        alt: 'FireSlab Industries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FireSlab | Premium Industrial Heating Systems & Storage Solutions',
    description:
      'FireSlab Industries manufactures high-performance pressurized hot water tanks, spiral heat exchangers, and modular stainless steel storage solutions.',
    images: ['/logo-fireslab.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'Manufacturer'],
      '@id': `${siteUrl}/#organization`,
      name: 'FireSlab Industries',
      legalName: 'FireSlab Industries',
      url: siteUrl,
      logo: `${siteUrl}/logo-fireslab.png`,
      image: `${siteUrl}/logo-fireslab.png`,
      description:
        'FireSlab Industries manufactures high-performance pressurized hot water tanks, spiral heat exchangers, and modular stainless steel storage solutions.',
      telephone: '+91 7310018656',
      email: 'info@fireslab.com',
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sector 15, GIDA',
        addressLocality: 'Gorakhpur',
        addressRegion: 'Uttar Pradesh',
        postalCode: '273209',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '26.7460',
        longitude: '83.2762',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'State', name: 'Uttar Pradesh' },
        { '@type': 'AdministrativeArea', name: 'Pan-India' },
      ],
      sameAs: [
        'https://www.facebook.com/fireslabindia',
        'https://www.instagram.com/fireslab',
        'https://www.linkedin.com/company/fireslab',
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '09:00',
          closes: '18:00',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'FireSlab Industries',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-[#0d0f0d] text-[#f0f4f0] antialiased selection:bg-[#2d6a35] selection:text-white">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
