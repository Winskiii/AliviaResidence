import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { facilities } from "../data/facilities";
import SectionTitle from "../components/common/SectionTitle";

const FacilitiesSection = () => {
  return (
    <section id="fasilitas" className="section-padding bg-gradient-to-b from-primary-dark to-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          eyebrow="Fasilitas Lengkap"
          title="Semua yang Anda Butuhkan"
          subtitle="Kami tidak hanya menjual rumah, tapi memberikan gaya hidup nyaman dengan fasilitas lengkap yang telah disiapkan untuk seluruh keluarga."
          light={true}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {facilities.map((facility, index) => {
            const IconComponent = Icons[facility.icon] || Icons.Star;
            return (
              <motion.div
                key={facility.id}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-premium cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/20 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <IconComponent className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-gray-900 text-sm mb-1.5 transition-colors">
                  {facility.title}
                </h3>
                <p className="text-white/70 group-hover:text-gray-500 text-xs leading-relaxed transition-colors">
                  {facility.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
