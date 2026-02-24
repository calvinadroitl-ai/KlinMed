import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Stethoscope, 
  Heart, 
  BriefcaseMedical, 
  Microscope, 
  Baby, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Stethoscope,
    title: 'Konsultasi Online',
    description: 'Konsultasi dengan dokter spesialis kapan saja, di mana saja melalui video call atau chat.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Heart,
    title: 'Pemeriksaan Rutin',
    description: 'Pemeriksaan kesehatan berkala lengkap dengan peralatan medis modern dan canggih.',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    icon: BriefcaseMedical,
    title: 'Penanganan Darurat',
    description: 'Layanan gawat darurat 24/7 dengan respons cepat dan penanganan profesional.',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Microscope,
    title: 'Laboratorium',
    description: 'Fasilitas laboratorium lengkap untuk berbagai jenis pemeriksaan dan tes kesehatan.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Baby,
    title: 'Kesehatan Anak',
    description: 'Perawatan khusus untuk kesehatan dan perkembangan anak dengan pendekatan yang ramah.',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Activity,
    title: 'Rehabilitasi',
    description: 'Program rehabilitasi medis dan fisioterapi untuk pemulihan optimal pasien.',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.services-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.services-subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-medical-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-medical-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-medical-primary">
              Layanan Kami
            </span>
          </div>
          <h2 className="services-title text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-4">
            Layanan <span className="text-medical-accent">Unggulan</span>
          </h2>
          <p className="services-subtitle text-lg text-gray-600">
            Solusi kesehatan komprehensif untuk segala kebutuhan medis Anda,
            didukung oleh tim profesional dan teknologi terkini.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card group relative p-6 lg:p-8 bg-white border-0 shadow-medical hover:shadow-medical-lg transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-20`} />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon - Single */}
                <div className={`w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="w-7 h-7 text-gray-700" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-medical-primary mb-3 group-hover:text-medical-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Link - Raised with padding */}
                <div className="flex items-center gap-2 text-medical-primary font-medium group-hover:text-medical-accent transition-colors duration-300 pb-2">
                  <span className="text-sm">Pelajari Lebih Lanjut</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-medical-accent/20 transition-colors duration-500" />
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300"
          >
            Lihat Semua Layanan
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
