import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ZoomIn, ArrowRight } from "lucide-react";
import { galleryImages, galleryCategories } from "../data/gallery";
import SectionTitle from "../components/common/SectionTitle";
import Modal from "../components/ui/Modal";

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filtered =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);
  const goNext = () => setSelectedIndex((i) => (i + 1) % filtered.length);
  const goPrev = () => setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);

  return (
    <>
      <Helmet>
        <title>Galeri Foto — Alivia Residence Semarang</title>
        <meta
          name="description"
          content="Galeri foto Alivia Residence. Lihat tampilan eksterior, interior, dan progress pembangunan perumahan kami di Semarang."
        />
      </Helmet>

      <div className="pt-20 min-h-screen bg-cream">
        <div className="container-custom section-padding">
          <SectionTitle
            eyebrow="Galeri Foto"
            title="Semua Foto Alivia Residence"
            subtitle="Jelajahi koleksi foto lengkap eksterior, interior, dan progress pembangunan."
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-video"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openImage(index)}
                layout
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs">{image.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Modal isOpen={selectedIndex !== null} onClose={closeImage} size="xl">
        {selectedIndex !== null && (
          <div className="relative">
            <img
              src={filtered[selectedIndex].src}
              alt={filtered[selectedIndex].alt}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="p-4 text-center">
              <p className="font-semibold text-gray-800">{filtered[selectedIndex].caption}</p>
              <p className="text-sm text-gray-500 mt-1">{selectedIndex + 1} / {filtered.length}</p>
            </div>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition-all"
              aria-label="Foto sebelumnya"
            >
              <ArrowRight className="w-5 h-5 text-gray-700 rotate-180" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition-all"
              aria-label="Foto berikutnya"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Gallery;
