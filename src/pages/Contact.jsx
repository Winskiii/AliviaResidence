import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/common/SectionTitle";
import ContactSection from "../sections/ContactSection";

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Kontak Kami — Alivia Residence Semarang</title>
        <meta
          name="description"
          content="Hubungi tim marketing Alivia Residence. Konsultasi gratis pembelian unit, KPR, dan kunjungan lokasi. WhatsApp: +62 812-3456-7890."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-dark to-primary py-20 text-white text-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Kontak Kami
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Kami Siap Membantu Anda
              </h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto">
                Tim marketing kami siap melayani konsultasi Senin–Minggu, pukul 08.00–20.00 WIB.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact info cards */}
        <div className="bg-cream py-12">
          <div className="container-custom">
            <div className="grid sm:grid-cols-3 gap-5 -mt-16 relative z-10">
              {[
                {
                  icon: Phone,
                  title: "Telepon / WhatsApp",
                  content: siteConfig.phoneDisplay,
                  link: `https://wa.me/${siteConfig.phone}`,
                  color: "text-[#25D366]",
                  bg: "bg-green-50",
                },
                {
                  icon: InstagramIcon,
                  title: "Instagram",
                  content: "@aliviaresidence",
                  link: siteConfig.socials.instagram,
                  color: "text-pink-600",
                  bg: "bg-pink-50",
                },
                {
                  icon: MapPin,
                  title: "Alamat Kantor",
                  content: siteConfig.location,
                  link: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.location)}`,
                  color: "text-primary",
                  bg: "bg-primary/5",
                },
              ].map(({ icon: Icon, title, content, link, color, bg }, i) => (
                <motion.a
                  key={title}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl shadow-card p-6 flex items-start gap-4 hover:-translate-y-1 hover:shadow-card-hover transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`p-3 ${bg} rounded-xl shrink-0`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">{title}</div>
                    <div className="text-gray-600 text-sm">{content}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Reuse ContactSection */}
        <ContactSection />

        {/* Map */}
        <div className="bg-white py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Lokasi Kami</h2>
            <div className="rounded-2xl overflow-hidden shadow-premium border border-gray-100" style={{ height: "400px" }}>
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta lokasi Alivia Residence"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
