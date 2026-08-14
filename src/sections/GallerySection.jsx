import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image, ArrowRight, ZoomIn } from "lucide-react";
import { galleryImages } from "../data/gallery";
import SectionTitle from "../components/common/SectionTitle";
import Modal from "../components/ui/Modal";

const GallerySection = ({ preview = true }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const displayImages = preview ? galleryImages.slice(0, 6) : galleryImages;

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const goNext = () =>
    setSelectedIndex((i) => (i + 1) % displayImages.length);
  const goPrev = () =>
    setSelectedIndex((i) => (i - 1 + displayImages.length) % displayImages.length);

  return (
    <section id="galeri" className="section-padding bg-cream">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            eyebrow="Galeri Foto"
            title="Lihat Sendiri Keindahannya"
            subtitle="Foto nyata dari kawasan dan unit Alivia Residence."
            center={false}
          />
          {preview && (
            <Link
              to="/galeri"
              className="flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors whitespace-nowrap"
            >
              Lihat Semua Foto
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                index === 0 ? "col-span-2 md:col-span-1 row-span-2" : ""
              }`}
              style={{ aspectRatio: index === 0 ? "auto" : "4/3", minHeight: "180px" }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => openImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={selectedIndex !== null} onClose={closeImage} size="xl">
        {selectedIndex !== null && (
          <div className="relative">
            <img
              src={displayImages[selectedIndex].src}
              alt={displayImages[selectedIndex].alt}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="p-4 text-center">
              <p className="font-semibold text-gray-800">{displayImages[selectedIndex].caption}</p>
              <p className="text-sm text-gray-500 mt-1">{selectedIndex + 1} / {displayImages.length}</p>
            </div>
            {/* Nav buttons */}
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
    </section>
  );
};

export default GallerySection;
