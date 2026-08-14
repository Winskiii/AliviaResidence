import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";
import SectionTitle from "../components/common/SectionTitle";

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((i) => (i + 1) % testimonials.length);
  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const active = testimonials[activeIndex];

  return (
    <section id="testimoni" className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Testimoni"
          title="Kata Mereka yang Sudah Tinggal"
          subtitle="Ribuan keluarga telah mempercayakan hunian impian mereka kepada Alivia Residence."
        />

        <div className="mt-12 max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-primary/10 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Quote icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-md">
                    <Quote className="w-7 h-7 text-white fill-white" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Comment */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic max-w-2xl mx-auto">
                  "{active.comment}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md">
                    {active.initials}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{active.name}</div>
                    <div className="text-sm text-gray-500">{active.role}</div>
                    <div className="text-xs text-primary font-medium mt-0.5">
                      Pembeli {active.location} · {active.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Testimoni sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Testimoni berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-gray-300 hover:bg-primary/50"
                }`}
                aria-label={`Testimoni ${i + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail row */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                  i === activeIndex
                    ? "ring-2 ring-primary ring-offset-2 bg-primary text-white scale-110"
                    : "bg-gray-200 text-gray-600 hover:bg-primary/20"
                }`}
                aria-label={`Testimoni dari ${t.name}`}
              >
                {t.initials}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
