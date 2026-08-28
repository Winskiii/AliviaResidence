import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Car, Ruler, ArrowRight } from "lucide-react";
import { units } from "../data/units";
import SectionTitle from "../components/common/SectionTitle";
import Badge from "../components/ui/Badge";
import { formatRupiah } from "../utils/formatCurrency";
import { siteConfig } from "../data/siteConfig";

const UnitCard = ({ unit, index }) => {
  const waLink = `https://wa.me/${siteConfig.phone}`;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-card overflow-hidden group card-hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={unit.image}
          alt={`Rumah ${unit.name} Alivia Residence`}
          className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={unit.badgeColor}>{unit.badge}</Badge>
        </div>


      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{unit.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{unit.description}</p>

        {/* Specs */}
        <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="text-center">
            <Bed className="w-4 h-4 text-primary mx-auto mb-0.5" />
            <div className="text-xs font-semibold text-gray-700">{unit.bedrooms} KT</div>
          </div>
          <div className="text-center">
            <Bath className="w-4 h-4 text-primary mx-auto mb-0.5" />
            <div className="text-xs font-semibold text-gray-700">{unit.bathrooms} KM</div>
          </div>
          <div className="text-center">
            <Car className="w-4 h-4 text-primary mx-auto mb-0.5" />
            <div className="text-xs font-semibold text-gray-700">{unit.carport} CP</div>
          </div>
          <div className="text-center">
            <Ruler className="w-4 h-4 text-primary mx-auto mb-0.5" />
            <div className="text-xs font-semibold text-gray-700">{unit.landArea}m²</div>
          </div>
        </div>


        <div className="flex gap-2">
          <Link
            to={`/unit/${unit.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl text-sm font-semibold transition-all"
          >
            Detail
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const UnitTypesSection = () => {
  return (
    <section id="unit-types" className="section-padding bg-cream">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Pilihan Unit"
          title="Temukan Rumah Impian Anda"
          subtitle="Tersedia 5 tipe unit dengan berbagai pilihan ukuran dan harga yang sesuai kebutuhan dan kemampuan Anda."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {units.map((unit, index) => (
            <UnitCard key={unit.id} unit={unit} index={index} />
          ))}
        </div>

        <motion.p
          className="text-center text-gray-500 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          * Harga dapat berubah sewaktu-waktu. Hubungi kami untuk info harga terkini.
        </motion.p>
      </div>
    </section>
  );
};

export default UnitTypesSection;
