import HeroSlider from '@/components/home/HeroSlider';
import StatsBar from '@/components/home/StatsBar';
import AboutSection from '@/components/home/AboutSection';
import ApplicationsGrid from '@/components/home/ApplicationsGrid';
import TechnologySection from '@/components/home/TechnologySection';
import ExchangerComparisonTabs from '@/components/home/ExchangerComparisonTabs';
import ProductsHorizontalScroll from '@/components/home/ProductsHorizontalScroll';
import CapacitySelector from '@/components/home/CapacitySelector';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import CertificationsBar from '@/components/home/CertificationsBar';
import ContactSection from '@/components/ContactSection';
import {
  fetchApplications,
  fetchProducts,
  fetchFeaturedProjects,
  fetchCertifications,
} from '@/lib/api';

export default async function HomePage() {
  const [applications, products, projects, certifications] = await Promise.all([
    fetchApplications(),
    fetchProducts(),
    fetchFeaturedProjects(),
    fetchCertifications(),
  ]);

  return (
    <>
      {/* 1. Hero Slider (Consumes GET /api/hero-slides) */}
      <HeroSlider />

      {/* 2. Animated Stats Bar (Consumes GET /api/company-stats) */}
      <StatsBar />

      <div className="section-spacer" />

      {/* 3. About FireSlab Section (Consumes GET /api/settings) */}
      <AboutSection />

      <div className="section-spacer" />

      {/* 4. Applications Grid (Consumes GET /api/applications) */}
      <ApplicationsGrid applications={applications} />

      <div className="section-spacer" />

      {/* 6. Why FireSlab / Technology Section (Spiral vs Conventional efficiency) */}
      <TechnologySection />

      {/* 7. Exchanger Comparison Tabs (PHE vs SHE) */}
      <ExchangerComparisonTabs />

      {/* 8. Products Horizontal Scroll (Consumes GET /api/products) */}
      <ProductsHorizontalScroll products={products} />

      {/* 9. Capacity Selector & Dynamic Sizing Specs */}
      <CapacitySelector products={products} />

      <div className="section-spacer" />

      {/* 10. Featured Projects / Case Studies (Consumes GET /api/projects?featured=true) */}
      <FeaturedProjectsSection projects={projects} />

      <div className="section-spacer" />

      {/* Lead Capture Form & Direct Contact */}
      <ContactSection />

      {/* 11. Certifications Bar (Consumes GET /api/certifications) */}
      <CertificationsBar certifications={certifications} />
    </>
  );
}
