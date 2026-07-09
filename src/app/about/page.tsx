import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Story — Shirin's Boutique",
  description: 'Learn about the craftsmanship, artisans, and heritage behind Shirin\'s Boutique.',
};

const values = [
  { title: 'Authentic Craft', desc: 'Every piece is sourced directly from master artisan clusters in Varanasi, Kanchipuram, Lucknow, and Jaipur. We maintain direct relationships with over 120 weaver families.' },
  { title: 'Ethical Trade', desc: 'Fair wages, safe working conditions, and sustainable practices are non-negotiable. We believe beautiful fashion should never come at the cost of the people who create it.' },
  { title: 'Timeless Quality', desc: 'We reject fast fashion. Every fabric is tested for colorfastness, durability, and finish before it reaches you. Our pieces are made to be worn for decades.' },
  { title: 'Inclusive Luxury', desc: 'Luxury shouldn\'t mean unaffordable. We work hard to offer genuine quality at accessible price points, and our wholesale program extends these values to boutiques nationwide.' },
];

const milestones = [
  { year: '1999', event: 'Founded in Jaipur', desc: 'Shirin Kapoor opens a small workshop with 3 artisan families.' },
  { year: '2005', event: 'First Retail Store', desc: 'Flagship boutique opens in Jaipur\'s old city.' },
  { year: '2010', event: 'Wholesale Launch', desc: 'B2B program begins, partnering with 50 boutiques in Year 1.' },
  { year: '2016', event: 'Pan-India Reach', desc: 'Operations expand to all 28 states. 200+ artisan families partnered.' },
  { year: '2020', event: 'Digital First', desc: 'Launch of online store. 10,000+ orders in Year 1.' },
  { year: '2024', event: 'Heritage Certification', desc: 'Recognized by the Indian Ministry of Textiles for authentic craft preservation.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/20790061/pexels-photo-20790061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
          alt="Our Story"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-montserrat tracking-[0.35em] uppercase text-gold/70 mb-3">Since 1999</p>
          <h1 className="font-playfair text-4xl lg:text-6xl text-ivory">Our Story</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 lg:py-24" style={{ background: '#F7F2EA' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-4">The Beginning</p>
              <h2 className="font-playfair text-3xl lg:text-4xl text-ink mb-6 leading-tight">
                Born from a Reverence
                <br />for Indian Craft
              </h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-[14px] font-montserrat text-taupe leading-relaxed mb-4">
                Shirin&apos;s Boutique was born in 1999 from a simple but powerful belief: that India&apos;s extraordinary textile heritage deserves to be celebrated, preserved, and made accessible to every woman who loves beauty and culture.
              </p>
              <p className="text-[14px] font-montserrat text-taupe leading-relaxed mb-4">
                Our founder, Shirin Kapoor, grew up watching her grandmother drape Banarasi silk sarees for every celebration — from Diwali to weddings. She saw firsthand how these fabrics carried memories, how they told stories of the hands that wove them.
              </p>
              <p className="text-[14px] font-montserrat text-taupe leading-relaxed">
                With a small investment and a deep respect for craftspeople, she started Shirin&apos;s Boutique in a workshop in Jaipur&apos;s old city, working directly with three weaver families. Twenty-five years later, we work with over 120 artisan families across India&apos;s most celebrated craft clusters.
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                  alt="Shirin's Boutique Founder"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-ink p-5 rounded-xl shadow-xl">
                <p className="font-playfair text-2xl text-gold">25+</p>
                <p className="text-[10px] font-montserrat uppercase tracking-wide text-ivory/60">Years of Heritage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24" style={{ background: '#1A1A1A' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-3">What We Stand For</p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-ivory">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-2xl" style={{ background: 'rgba(247,242,234,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}>
                <div className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)' }}>
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <h3 className="font-playfair text-[18px] text-ivory mb-3">{v.title}</h3>
                <p className="text-[12px] font-montserrat text-ivory/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-24" style={{ background: '#F7F2EA' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[11px] font-montserrat tracking-[0.3em] uppercase text-gold mb-3">Our Journey</p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-ink">25 Years of Growth</h2>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gold/30" />
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="w-16 flex-shrink-0 text-right">
                  <span className="font-playfair text-lg text-gold">{m.year}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-gold border-2 border-ivory" />
                  <h4 className="font-montserrat font-bold text-[13px] tracking-wide uppercase text-ink mb-1">{m.event}</h4>
                  <p className="text-[12px] font-montserrat text-taupe">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #F7F2EA 0%, #ede5d8 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <h2 className="font-playfair text-3xl lg:text-4xl text-ink mb-4">Be Part of Our Story</h2>
          <p className="text-[14px] font-montserrat text-taupe mb-8 max-w-md mx-auto">
            Whether you&apos;re shopping for yourself or looking to stock your boutique — we&apos;d love to have you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/collections/sarees"
              className="inline-flex items-center gap-2 bg-ink text-gold font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 rounded hover:bg-ink/90 transition-all"
            >
              Shop Now →
            </Link>
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 border-2 border-gold text-gold font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase px-8 py-4 rounded hover:bg-gold hover:text-ink transition-all"
            >
              Wholesale Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
