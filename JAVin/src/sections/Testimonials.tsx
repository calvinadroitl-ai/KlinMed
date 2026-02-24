import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Pasien Rutin',
    image: '/testimonial-1.jpg',
    content:
      'Pelayanan yang sangat memuaskan! Dokter-dokternya sangat profesional dan ramah. Saya merasa nyaman setiap kali berkunjung ke Klinik Medika. Fasilitasnya juga sangat modern dan bersih.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Tanaka',
    role: 'Pasien Baru',
    image: '/testimonial-2.jpg',
    content:
      'Dokter sangat profesional dan menjelaskan kondisi saya dengan detail. Sistem booking online juga sangat memudahkan. Tidak perlu antri lama dan pelayanan sangat cepat.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Richardson',
    role: 'Ibu Rumah Tangga',
    image: '/testimonial-3.jpg',
    content:
      'Fasilitas modern dan nyaman. Anak-anak saya juga suka datang ke sini karena suasana yang friendly. Staff-nya sangat perhatian dan selalu siap membantu.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.testimonials-title',
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
        '.testimonials-subtitle',
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

      // Cards animation
      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-medical-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-medical-primary">
              Testimoni
            </span>
          </div>
          <h2 className="testimonials-title text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-4">
            Apa Kata <span className="text-medical-accent">Pasien Kami</span>
          </h2>
          <p className="testimonials-subtitle text-lg text-gray-600">
            Dengarkan pengalaman langsung dari pasien yang telah mempercayakan
            kesehatan mereka kepada Klinik Medika.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonial-card relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="relative bg-white rounded-3xl shadow-medical-lg p-8 lg:p-12 overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 lg:top-8 lg:right-8 w-16 h-16 bg-medical-accent/10 rounded-full flex items-center justify-center">
              <Quote className="w-8 h-8 text-medical-accent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-medical-accent/20"
                    />
                    <div>
                      <p className="font-bold text-medical-primary text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-primary via-medical-accent to-medical-secondary" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-medical-accent w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { value: '4.9', label: 'Rating Google' },
            { value: '98%', label: 'Kepuasan Pasien' },
            { value: '24/7', label: 'Layanan' },
          ].map((badge, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-medical-primary">
                {badge.value}
              </p>
              <p className="text-gray-500 text-sm">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
