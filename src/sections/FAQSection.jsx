import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "../data/faq";
import SectionTitle from "../components/common/SectionTitle";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="section-padding bg-cream">
      <div className="container-custom">
        <SectionTitle
          eyebrow="FAQ"
          title="Pertanyaan yang Sering Ditanyakan"
          subtitle="Temukan jawaban atas pertanyaan umum seputar pembelian unit di Alivia Residence."
        />

        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                id={`faq-btn-${faq.id}`}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    openIndex === index ? "bg-primary text-white" : "bg-primary/10 text-primary"
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <ChevronDown className={`w-5 h-5 transition-colors ${
                    openIndex === index ? "text-primary" : "text-gray-400"
                  }`} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100 ml-11">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* More questions CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-3">Masih ada pertanyaan lain?</p>
          <a
            href={`https://wa.me/6281234567890?text=${encodeURIComponent("Halo, saya ingin bertanya tentang Alivia Residence.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
          >
            Tanyakan via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
