import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/common/SectionTitle";

const LocationSection = () => {
  return (
    <section id="lokasi" className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Lokasi Strategis"
          title="Mudah Dijangkau ke Mana Saja"
          subtitle="Alivia Residence berlokasi di Banyumanik — pusat pengembangan kota Semarang dengan akses infrastruktur terbaik."
        />

        <div className="grid lg:grid-cols-2 gap-10 mt-12 items-start">
          {/* Map */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-premium border border-gray-100 h-[400px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Alivia Residence di Semarang"
            />
          </motion.div>

          {/* Locations list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Dekat dengan Berbagai Fasilitas Penting
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {siteConfig.location}
            </p>

            <div className="space-y-3">
              {siteConfig.strategicLocations.map((loc, index) => {
                const IconComponent = Icons[loc.icon] || Icons.MapPin;
                return (
                  <motion.div
                    key={loc.label}
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-primary/5 rounded-xl transition-colors border border-transparent hover:border-primary/10 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{loc.label}</div>
                    </div>
                    <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      ± {loc.distance}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              <Icons.MapPin className="w-4 h-4" />
              Buka di Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
