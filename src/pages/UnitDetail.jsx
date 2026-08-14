import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Bed, Bath, Car, Ruler, Building2, ArrowLeft,
  CheckCircle2, ChevronLeft, ChevronRight, Phone
} from "lucide-react";
import { units } from "../data/units";
import { siteConfig } from "../data/siteConfig";
import Badge from "../components/ui/Badge";
import { formatRupiah } from "../utils/formatCurrency";
import KPRCalculator from "../components/common/KPRCalculator";

const UnitDetail = () => {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);

  const unit = units.find((u) => u.id === id);
  if (!unit) return <Navigate to="/404" replace />;

  const waLink = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan ${unit.name} di Alivia Residence (${unit.priceDisplay}). Apakah masih tersedia? Mohon info lebih lanjut.`
  )}`;

  const allImages = unit.images || [unit.image];

  return (
    <>
      <Helmet>
        <title>{unit.name} — Alivia Residence Semarang</title>
        <meta
          name="description"
          content={`${unit.name} di Alivia Residence. ${unit.buildingArea}/${unit.landArea} m², ${unit.bedrooms} KT, ${unit.bathrooms} KM. Harga mulai ${unit.priceDisplay}. Lokasi Banyumanik, Semarang.`}
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
              <div className="relative rounded-2xl overflow-hidden shadow-premium mb-3 bg-gray-100" style={{ aspectRatio: "4/3" }}>
                <img
                  src={allImages[activeImg]}
                  alt={`${unit.name} - foto ${activeImg + 1}`}
                  className="w-full h-full object-cover"
                />
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
              <div className="text-sm text-gray-500 mb-2">Sisa {unit.stock} unit tersedia</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{unit.name}</h1>
              <div className="text-3xl font-bold text-primary mb-4">{unit.priceDisplay}</div>

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

          {/* KPR Calculator */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Simulasi KPR untuk {unit.name}
            </h2>
            <KPRCalculator defaultPrice={unit.price} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitDetail;
