import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 — Halaman Tidak Ditemukan | Alivia Residence</title>
      </Helmet>

      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {/* 404 number */}
            <div className="relative mb-6">
              <div className="text-[160px] md:text-[200px] font-black text-primary/10 leading-none select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-premium rotate-6">
                  <Home className="w-12 h-12 text-white -rotate-6" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <Home className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-semibold px-6 py-3 rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Halaman Sebelumnya
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
