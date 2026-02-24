import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fluid Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f8f9fa');
      gradient.addColorStop(0.5, '#e8f4f8');
      gradient.addColorStop(1, '#f0f9ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing circles
      const colors = ['rgba(0, 201, 183, 0.08)', 'rgba(74, 144, 226, 0.06)', 'rgba(26, 43, 92, 0.04)'];
      
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * (0.2 + i * 0.15) + Math.sin(time + i) * 50;
        const y = canvas.height * (0.3 + i * 0.1) + Math.cos(time + i * 0.5) * 30;
        const radius = 150 + i * 50 + Math.sin(time * 2 + i) * 30;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
      }

      // Draw connecting lines
      ctx.strokeStyle = 'rgba(0, 201, 183, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const x1 = canvas.width * (0.1 + i * 0.12);
        const y1 = canvas.height * 0.2 + Math.sin(time + i) * 100;
        const x2 = canvas.width * (0.15 + i * 0.12);
        const y2 = canvas.height * 0.8 + Math.cos(time + i) * 100;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(
          (x1 + x2) / 2 + Math.sin(time * 2) * 50,
          (y1 + y2) / 2 + Math.cos(time * 2) * 50,
          x2,
          y2
        );
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5,
        }
      );

      gsap.fromTo(
        '.hero-buttons',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.7,
        }
      );

      gsap.fromTo(
        '.hero-features',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.9,
        }
      );

      // Image animation with mask reveal
      gsap.fromTo(
        imageRef.current,
        { 
          opacity: 0, 
          scale: 1.1,
          clipPath: 'circle(0% at 50% 50%)'
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Scroll parallax
      gsap.to(imageRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-content', {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Fluid Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="hero-content max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-accent/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-medical-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-medical-accent">
                Klinik Kesehatan Terpercaya
              </span>
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-medical-primary leading-tight mb-6">
              Kesehatan Anda,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-secondary to-medical-accent">
                Prioritas Kami
              </span>
            </h1>

            <p className="hero-subtitle text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Layanan medis profesional dengan teknologi terkini untuk
              kesejahteraan keluarga Anda. Tim dokter berpengalaman siap
              melayani dengan penuh perhatian.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 mb-10">
              <Button
                onClick={() => scrollToSection('#cta')}
                className="bg-medical-primary hover:bg-medical-primary/90 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-medical-lg hover:-translate-y-1 group"
              >
                Jadwalkan Konsultasi
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => scrollToSection('#services')}
                variant="outline"
                className="border-2 border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300"
              >
                Lihat Layanan
              </Button>
            </div>

            <div className="hero-features flex flex-wrap gap-6">
              {[
                { icon: Shield, text: 'Tersertifikasi' },
                { icon: Clock, text: '24/7 Siaga' },
                { icon: Calendar, text: 'Booking Online' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <feature.icon className="w-5 h-5 text-medical-accent" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div
              ref={imageRef}
              className="relative w-full max-w-lg lg:max-w-none"
            >
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-medical-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-medical-secondary/20 rounded-full blur-2xl" />
              
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-medical-lg">
                <img
                  src="/hero-doctor.jpg"
                  alt="Dokter Profesional"
                  className="w-full h-auto object-cover"
                />
                {/* Glass overlay card */}
                <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-medical-accent rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-medical-primary">
                        10+ Tahun Pengalaman
                      </p>
                      <p className="text-sm text-gray-500">
                        Melayani dengan sepenuh hati
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-medical-light to-transparent z-10" />
    </section>
  );
};

export default Hero;
