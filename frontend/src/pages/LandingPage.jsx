import Seo from "@/components/Seo";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ResultsSection } from "@/components/ResultsSection";
import { NewsSection } from "@/components/NewsSection";
import { GallerySection } from "@/components/GallerySection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0E] text-slate-50" data-testid="landing-page">
      <Seo
        title="Nusa Wiraga 2026 — Kejuaraan Nasional Pencak Silat"
        siteName="Nusa Wiraga"
        description="Pendaftaran online Kejuaraan Nasional Pencak Silat Nusa Wiraga 2026, 12-18 Oktober di GOR Patriot Candrabhaga, Bekasi. Tanding & Seni untuk semua kelompok usia."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          name: "Kejuaraan Nasional Pencak Silat Nusa Wiraga 2026",
          startDate: "2026-10-12",
          endDate: "2026-10-18",
          location: { "@type": "Place", name: "GOR Patriot Candrabhaga", address: "Bekasi, Jawa Barat" },
          organizer: { "@type": "Organization", name: "Nusa Wiraga" },
        }}
      />
      <Navbar />
      <Hero />
      <AboutSection />
      <CategoriesSection />
      <ResultsSection />
      <NewsSection />
      <GallerySection />
      <SponsorsSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
