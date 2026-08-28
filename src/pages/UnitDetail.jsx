import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Bed, Bath, Car, Ruler, Building2, ArrowLeft,
  CheckCircle2, ChevronLeft, ChevronRight, Phone, X, ZoomIn, ZoomOut, Maximize2
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { units } from "../data/units";
import { siteConfig } from "../data/siteConfig";
import Badge from "../components/ui/Badge";
import SectionTitle from "../components/common/SectionTitle";

const UnitDetail = () => {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const unit = units.find((u) => u.id === id);
  if (!unit) return <Navigate to="/404" replace />;

  const waLink = `https://wa.me/${siteConfig.phone}`;

  const allImages = unit.images || [unit.image];

  return (
    <>
      <Helmet>
        <title>{unit.name} — Alivia Residence Semarang</title>
        <meta
          name="description"
          content={`${unit.name} di Alivia Residence. ${unit.buildingArea}/${unit.landArea} m², ${unit.bedrooms} KT, ${unit.bathrooms} KM. Lokasi Banyumanik, Semarang.`}
        />
      </Helmet>

      <div className="pt-20 min-h-screen bg-cream">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="container-custom py-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
              <span>/</span>
              <span onClick={() => window.history.back()} className="hover:text-primary cursor-pointer transition-colors">
                Tipe Unit
              </span>
              <span>/</span>
              <span className="text-primary font-medium">{unit.name}</span>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <Link
            to="/"
            onClick={() => {
              setTimeout(() => {
                const el = document.querySelector("#unit-types");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Semua Unit
          </Link>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-premium mb-3 bg-gray-100 group" style={{ aspectRatio: "4/3" }}>
                <img
                  src={allImages[activeImg]}
                  alt={`${unit.name} - foto ${activeImg + 1}`}
                  className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setIsLightboxOpen(true)}
                />
                
                <div 
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <div className="bg-white/90 p-3 rounded-full text-gray-800 shadow-lg">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant={unit.badgeColor}>{unit.badge}</Badge>
                </div>
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i + 1) % allImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-1 aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                        i === activeImg ? "border-primary" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{unit.name}</h1>

              <p className="text-gray-600 leading-relaxed mb-6">{unit.description}</p>

              {/* Quick specs */}
              <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                {[
                  { icon: Bed, value: `${unit.bedrooms} KT`, label: "Kamar Tidur" },
                  { icon: Bath, value: `${unit.bathrooms} KM`, label: "Kamar Mandi" },
                  { icon: Car, value: `${unit.carport} CP`, label: "Carport" },
                  { icon: Ruler, value: `${unit.landArea}m²`, label: "Luas Tanah" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="font-bold text-gray-900 text-sm">{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>

              {/* LB/LT info */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 p-3 bg-primary/5 rounded-xl text-center">
                  <Building2 className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-bold text-gray-900">{unit.buildingArea} m²</div>
                  <div className="text-xs text-gray-500">Luas Bangunan</div>
                </div>
                <div className="flex-1 p-3 bg-accent/10 rounded-xl text-center">
                  <Ruler className="w-5 h-5 text-accent-dark mx-auto mb-1" />
                  <div className="text-sm font-bold text-gray-900">{unit.landArea} m²</div>
                  <div className="text-xs text-gray-500">Luas Tanah</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Fitur Unit</h3>
                <ul className="space-y-2">
                  {unit.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Spesifikasi Bangunan</h3>
                <div className="space-y-2">
                  {Object.entries(unit.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                      <span className="text-gray-500 capitalize">{key}</span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Tanya via WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={() => { setIsLightboxOpen(false); setZoomScale(1); }}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 z-50 bg-black/20 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); setZoomScale(1); }}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/10 px-6 py-3 rounded-full backdrop-blur-md z-50 border border-white/20" onClick={(e) => e.stopPropagation()}>
              <button 
                className="text-white hover:text-accent transition-colors disabled:opacity-50" 
                onClick={() => setZoomScale(s => Math.max(0.5, s - 0.25))}
                disabled={zoomScale <= 0.5}
              >
                <ZoomOut className="w-6 h-6" />
              </button>
              <span className="text-white text-sm font-medium min-w-[3rem] text-center">{Math.round(zoomScale * 100)}%</span>
              <button 
                className="text-white hover:text-accent transition-colors disabled:opacity-50" 
                onClick={() => setZoomScale(s => Math.min(3, s + 0.25))}
                disabled={zoomScale >= 3}
              >
                <ZoomIn className="w-6 h-6" />
              </button>
            </div>

            <motion.div
              className="w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={allImages[activeImg]}
                alt="Zoomed"
                className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                dragElastic={0.1}
                animate={{ scale: zoomScale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onDoubleClick={() => setZoomScale(zoomScale > 1 ? 1 : 2)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UnitDetail;
