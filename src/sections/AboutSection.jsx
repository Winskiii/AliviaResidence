import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Award, ShieldCheck, MapPin } from "lucide-react";
import SectionTitle from "../components/common/SectionTitle";

const highlights = [
  { icon: Award, label: "Developer Terpercaya", desc: "Berpengalaman lebih dari 10 tahun" },
  { icon: ShieldCheck, label: "Bebas Banjir", desc: "Lingkungan aman dan terhindar dari banjir" },
  { icon: CheckCircle2, label: "SHM Langsung", desc: "Sertifikat Hak Milik atas nama pembeli" },
  { icon: MapPin, label: "Lokasi Strategis", desc: "Dekat tol, kampus, dan pusat kota" },
];

const points = [
  "Desain minimalis modern yang timeless",
  "Material bangunan berkualitas SNI",
  "Kawasan one gate system dengan keamanan 24 jam",
  "Lingkungan hijau dan tertata rapi",
  "Proses KPR dibantu tim marketing kami",
  "After-sales service yang responsif",
];

const AboutSection = () => {
  return (
    <section id="tentang" className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-premium">
              <img
                src="/Brosur baru/MASTERPLAN2.jpg"
                alt="Alivia Residence kawasan perumahan"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-card p-5 border border-gray-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-primary mb-1">10+</div>
              <div className="text-sm text-gray-600 font-medium">Tahun Pengalaman</div>
              <div className="text-xs text-gray-400">dalam pengembangan properti</div>
            </motion.div>

            {/* Accent decoration */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-2xl rotate-12 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-xl rotate-6 -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              eyebrow="Tentang Kami"
              title="Membangun Rumah, Merajut Mimpi"
              subtitle="Alivia Residence hadir sebagai solusi hunian modern bagi keluarga Indonesia yang menginginkan kenyamanan tanpa menguras kantong."
              center={false}
            />

            <p className="text-gray-600 leading-relaxed mb-6">
              Berlokasi di kawasan Banyumanik, Semarang — area yang terus berkembang dengan
              infrastruktur lengkap — Alivia Residence menawarkan perpaduan sempurna antara
              kenyamanan hunian, keindahan desain, dan nilai investasi yang terus meningkat.
            </p>

            {/* Points */}
            <ul className="space-y-2.5 mb-8">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{point}</span>
                </li>
              ))}
            </ul>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{label}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
