import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Layanan', href: '#services' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'Kontak', href: '#cta' },
  ];

  const services = [
    'Konsultasi Online',
    'Pemeriksaan Rutin',
    'Penanganan Darurat',
    'Laboratorium',
    'Kesehatan Anak',
    'Rehabilitasi',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-medical-primary text-white overflow-hidden">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-accent via-medical-secondary to-medical-accent" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-accent to-medical-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl">Medika</span>
            </a>
            <p className="text-white/70 mb-6 leading-relaxed">
              Klinik Medika adalah pusat layanan kesehatan terdepan yang
              berkomitmen memberikan pelayanan berkualitas tinggi untuk
              kesejahteraan masyarakat.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-accent transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Tautan Cepat</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-white/70 hover:text-medical-accent transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Layanan Kami</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-white/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Hubungi Kami</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-medical-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Araya (Dekat Binus)
                </span>
              </div>
              <a href="tel:+62116704139" className="flex items-center gap-3 text-white/70 hover:text-medical-accent transition-colors">
                <Phone className="w-5 h-5 text-medical-accent flex-shrink-0" />
                <span>+62 116 704 139</span>
              </a>
              <a href="mailto:pemudabanjir@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-medical-accent transition-colors">
                <Mail className="w-5 h-5 text-medical-accent flex-shrink-0" />
                <span>pemudabanjir@gmail.com</span>
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-medium mb-3">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full"
                />
                <Button className="bg-medical-accent hover:bg-medical-accent/90 rounded-full px-4">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Klinik Medika. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-medical-accent hover:bg-medical-accent/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
