import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Home, Phone } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import Button from "../ui/Button";

const navLinks = [
  { label: "Beranda", to: "/", hash: "#hero" },
  { label: "Tipe Unit", to: "/", hash: "#unit-types" },
  { label: "Fasilitas", to: "/", hash: "#fasilitas" },
  { label: "Galeri", to: "/galeri" },
  { label: "Lokasi", to: "/", hash: "#lokasi" },
  { label: "FAQ", to: "/", hash: "#faq" },
  { label: "Kontak", to: "/kontak" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.hash) {
      setTimeout(() => {
        const el = document.querySelector(link.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const waLink = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md group-hover:bg-primary-dark transition-colors">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div
                className={`font-bold text-lg tracking-tight transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Alivia
              </div>
              <div
                className={`text-xs font-medium tracking-widest transition-colors ${
                  isScrolled ? "text-accent" : "text-accent-light"
                }`}
              >
                RESIDENCE
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => handleNavClick(link)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary/10 ${
                  isScrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href={waLink}
              target="_blank"
              variant="whatsapp"
              size="sm"
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-white shadow-xl border-t border-gray-100`}
      >
        <div className="container-custom py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => handleNavClick(link)}
              className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-primary/5 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 pb-1">
            <Button href={waLink} target="_blank" variant="whatsapp" className="w-full justify-center">
              <Phone className="w-4 h-4" />
              Hubungi via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
