import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Phone, MessageSquare, Home, CheckCircle2, AlertCircle } from "lucide-react";
import { units } from "../data/units";
import { siteConfig } from "../data/siteConfig";
import SectionTitle from "../components/common/SectionTitle";
const initialForm = {
  name: "",
  phone: "",
  unitType: "",
  message: "",
};

const ContactSection = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi";
    } else if (!/^[0-9+]{8,15}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Format nomor HP tidak valid";
    }
    if (!form.unitType) newErrors.unitType = "Pilih tipe unit yang diminati";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const selectedUnit = units.find((u) => u.id === form.unitType);
    const message =
      `Halo Alivia Residence! 🏠\n\n` +
      `Nama: ${form.name}\n` +
      `No. HP: ${form.phone}\n` +
      `Minat: ${selectedUnit?.name || form.unitType}\n` +
      (form.message ? `Pesan: ${form.message}\n` : "") +
      `\nSaya ingin mendapatkan informasi lebih lanjut. Terima kasih!`;

    const waUrl = `https://wa.me/${siteConfig.phone}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:ring-red-400/30"
        : "border-gray-200 bg-gray-50 focus:border-primary/50 focus:bg-white"
    } text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`;

  return (
    <section id="kontak" className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Hubungi Kami"
          title="Tertarik? Konsultasi Gratis!"
          subtitle="Isi formulir di bawah dan tim kami akan segera menghubungi Anda via WhatsApp dalam waktu kurang dari 1 jam."
        />

        <div className="max-w-2xl mx-auto mt-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Pesan Terkirim!
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  WhatsApp sudah terbuka. Tim kami akan segera merespons Anda.
                </p>
                <button
                  onClick={resetForm}
                  className="text-primary font-semibold hover:text-primary-dark text-sm transition-colors"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Formulir Konsultasi</h3>
                <p className="text-sm text-gray-500 mb-5">
                  Pesan akan dikirim langsung ke WhatsApp kami.
                </p>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={form.name}
                      onChange={handleChange}
                      className={`${inputClass("name")} pl-10`}
                    />
                  </div>
                  {errors.name && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nomor HP / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="08xx-xxxx-xxxx"
                      value={form.phone}
                      onChange={handleChange}
                      className={`${inputClass("phone")} pl-10`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Unit type */}
                <div>
                  <label htmlFor="contact-unit" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Tipe Unit yang Diminati *
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      id="contact-unit"
                      name="unitType"
                      value={form.unitType}
                      onChange={handleChange}
                      className={`${inputClass("unitType")} pl-10 appearance-none cursor-pointer`}
                    >
                      <option value="">-- Pilih Tipe Unit --</option>
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                      <option value="belum-tahu">Belum tahu / Mau tanya dulu</option>
                    </select>
                  </div>
                  {errors.unitType && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.unitType}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Pesan / Pertanyaan (opsional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Tulis pertanyaan atau kebutuhan Anda..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass("message")} pl-10 resize-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Kirim via WhatsApp
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
