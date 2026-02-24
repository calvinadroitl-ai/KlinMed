import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Award, Users, HeartPulse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: 10, suffix: '+', label: 'Tahun Pengalaman' },
  { icon: Users, value: 50, suffix: '+', label: 'Tenaga Medis' },
  { icon: HeartPulse, value: 10000, suffix: '+', label: 'Pasien Puas' },
];

const features = [
  'Fasilitas modern dan lengkap',
  'Tim dokter berpengalaman',
  'Pelayanan 24 jam nonstop',
  'Teknologi medis terkini',
  'Harga terjangkau',
  'Lokasi strategis',
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.about-title',
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

      // Content animation
      gsap.fromTo(
        '.about-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Features animation
      gsap.fromTo(
        '.about-feature',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter: () => {
          stats.forEach((stat, index) => {
            gsap.to(
              { value: 0 },
              {
                value: stat.value,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = Math.floor(this.targets()[0].value);
                    return newCounters;
                  });
                },
              }
            );
          });
        },
        once: true,
      });

      // Stats cards animation
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-medical-secondary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            {/* Decorative shapes */}
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-medical-accent/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-medical-secondary/10 rounded-full blur-2xl" />

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-medical-lg">
              <img
                src="/about-team.jpg"
                alt="Tim Medis Klinik Medika"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-white rounded-2xl shadow-medical-lg p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-medical-accent rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-medical-primary text-lg">ISO 9001</p>
                  <p className="text-sm text-gray-500">Sertifikasi Internasional</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-accent/10 rounded-full mb-4">
              <span className="text-sm font-medium text-medical-accent">
                Tentang Kami
              </span>
            </div>

            <h2 className="about-title text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-6">
              Klinik <span className="text-medical-accent">Medika</span>
            </h2>

            <div className="about-content space-y-4 text-gray-600 mb-8">
              <p className="leading-relaxed">
                Klinik Medika adalah pusat layanan kesehatan terdepan yang telah
                melayani masyarakat selama lebih dari 10 tahun. Kami berkomitmen
                untuk memberikan pelayanan kesehatan berkualitas tinggi dengan
                mengutamakan kenyamanan dan keselamatan pasien.
              </p>
              <p className="leading-relaxed">
                Dengan tim dokter spesialis berpengalaman dan fasilitas medis
                modern, kami siap menjadi partner kesehatan terpercaya untuk Anda
                dan keluarga. Visi kami adalah menciptakan masyarakat yang lebih
                sehat melalui pelayanan medis yang profesional dan berkelanjutan.
              </p>
            </div>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="about-feature flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-medical-accent flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid sm:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card relative p-6 lg:p-8 bg-white rounded-2xl shadow-medical hover:shadow-medical-lg transition-all duration-500 group"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-medical-accent/5 to-medical-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-center gap-4 lg:gap-6">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl lg:text-4xl font-bold text-medical-primary">
                    {counters[index].toLocaleString()}
                    {stat.suffix}
                  </p>
                  <p className="text-gray-500 font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
