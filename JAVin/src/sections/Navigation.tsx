import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Layanan', href: '#services' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'Kontak', href: '#cta' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-medical py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-primary to-medical-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span
                className={`font-bold text-xl transition-colors duration-300 ${
                  isScrolled ? 'text-medical-primary' : 'text-medical-primary'
                }`}
              >
                Medika
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm font-medium transition-all duration-300 hover:text-medical-accent relative group ${
                    isScrolled ? 'text-medical-dark' : 'text-medical-dark'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+62116704139"
                className="flex items-center gap-2 text-sm font-medium text-medical-primary hover:text-medical-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+62 116 704 139</span>
              </a>
              <Button
                onClick={() => scrollToSection('#cta')}
                className="bg-medical-primary hover:bg-medical-primary/90 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-medical-lg hover:-translate-y-0.5"
              >
                Buat Janji
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-medical-primary" />
              ) : (
                <Menu className="w-6 h-6 text-medical-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-medical-lg p-6 transition-all duration-500 ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-lg font-medium text-medical-dark hover:text-medical-accent transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <hr className="border-gray-100" />
            <a
              href="tel:+62116704139"
              className="flex items-center gap-2 text-medical-primary font-medium py-2"
            >
              <Phone className="w-5 h-5" />
              <span>+62 116 704 139</span>
            </a>
            <Button
              onClick={() => scrollToSection('#cta')}
              className="bg-medical-primary hover:bg-medical-primary/90 text-white w-full rounded-full py-3"
            >
              Buat Janji Temu
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
