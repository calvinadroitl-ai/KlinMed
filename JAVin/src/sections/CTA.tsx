import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse repulsion
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          particle.vx -= (dx / dist) * force * 0.5;
          particle.vy -= (dy / dist) * force * 0.5;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? 'rgba(0, 201, 183, 0.6)' : 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 50 },
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
        '.cta-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Particle Canvas Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-medical-primary via-[#1e3a6f] to-medical-primary">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - CTA Content */}
          <div className="cta-content">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Jadwalkan <span className="text-medical-accent">Konsultasi</span>
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Konsultasikan kesehatan Anda dengan tim medis profesional kami.
              Kami siap membantu Anda menjalani hidup yang lebih sehat dan
              berkualitas.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-medical-accent hover:bg-medical-accent/90 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-glow group">
                    Buat Janji Temu
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-medical-primary">
                      Buat Janji Temu
                    </DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nama Depan</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nama Belakang</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input id="phone" placeholder="+62 116 704 139" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Layanan</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih layanan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Konsultasi Umum</SelectItem>
                          <SelectItem value="checkup">Pemeriksaan Rutin</SelectItem>
                          <SelectItem value="specialist">Konsultasi Spesialis</SelectItem>
                          <SelectItem value="lab">Pemeriksaan Laboratorium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Tanggal</Label>
                      <Input id="date" type="date" />
                    </div>
                    <Button className="w-full bg-medical-primary hover:bg-medical-primary/90 text-white py-3">
                      Konfirmasi Janji
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                asChild
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-medical-primary px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 bg-transparent"
              >
                <a href="tel:+62116704139">
                  <Phone className="mr-2 w-5 h-5" />
                  Hubungi Kami
                </a>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <a href="tel:+62116704139" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+62 116 704 139</span>
              </a>
              <a href="mailto:pemudabanjir@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span>pemudabanjir@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Araya (Dekat Binus)</span>
              </div>
            </div>
          </div>

          {/* Right - Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Jam Operasional',
                content: 'Senin - Minggu\n24 Jam Nonstop',
                highlight: true,
              },
              {
                title: 'Layanan Darurat',
                content: 'IGD 24 Jam\nSiap Siaga',
                highlight: false,
              },
              {
                title: 'Booking Online',
                content: 'Pesan Janji\nMudah & Cepat',
                highlight: false,
              },
              {
                title: 'Asuransi',
                content: 'Menerima\nSemua Asuransi',
                highlight: true,
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`cta-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                  card.highlight
                    ? 'bg-medical-accent text-white'
                    : 'bg-white/10 backdrop-blur-sm text-white'
                }`}
              >
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm opacity-80 whitespace-pre-line">
                  {card.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
