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
  const waLink = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan ${unit.name} di Alivia Residence. Mohon info lebih lanjut.`
  )}`;

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
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={unit.badgeColor}>{unit.badge}</Badge>
        </div>

        {/* Stock indicator */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
          Sisa {unit.stock} unit
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

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-gray-500">Harga mulai</div>
            <div className="text-xl font-bold text-primary">{unit.priceDisplay}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">LB/LT</div>
            <div className="text-sm font-semibold text-gray-700">
              {unit.buildingArea}/{unit.landArea} m²
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/unit/${unit.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl text-sm font-semibold transition-all"
          >
            Detail
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-xl text-sm font-semibold transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Tanya WA
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const UnitTypesSection = () => {
  return (
    <section id="unit-types" className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Pilihan Unit"
          title="Temukan Rumah Impian Anda"
          subtitle="Tersedia 4 tipe unit dengan berbagai pilihan ukuran dan harga yang sesuai kebutuhan dan kemampuan Anda."
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
