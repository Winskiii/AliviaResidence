import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import UnitTypesSection from "../sections/UnitTypesSection";
import FacilitiesSection from "../sections/FacilitiesSection";
import GallerySection from "../sections/GallerySection";
import TestimonialSection from "../sections/TestimonialSection";
import LocationSection from "../sections/LocationSection";
import FAQSection from "../sections/FAQSection";
import ContactSection from "../sections/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Alivia Residence — Hunian Nyaman & Strategis di Semarang</title>
        <meta
          name="description"
          content="Perumahan modern di Banyumanik, Semarang. Tersedia Tipe 36–72, harga mulai Rp 350 juta. Lokasi strategis dekat tol, kampus UNDIP, dan pusat kota. KPR mudah dibantu."
        />
        <meta property="og:title" content="Alivia Residence — Hunian Nyaman di Semarang" />
        <meta
          property="og:description"
          content="Perumahan modern di lokasi strategis Semarang dengan desain minimalis premium."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        <HeroSection />
        <AboutSection />
        <UnitTypesSection />
        <FacilitiesSection />
        <GallerySection preview={true} />
        <TestimonialSection />
        <LocationSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
