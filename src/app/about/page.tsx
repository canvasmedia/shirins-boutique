import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import BackButton from '@/components/ui/BackButton';

export const metadata: Metadata = {
  title: "Our Story — Shirin's Boutique",
  description: "Discover the inspiring story of Sabnam Shirin — from a childhood dream of fashion design to founding Shirin's Boutique, a globally trusted name in timeless ethnic wear.",
};

const values = [
  { title: 'Authentic Craft', desc: 'Every piece is thoughtfully designed with meticulous attention to detail, reflecting the artistry and craftsmanship that has defined Shirin\'s Boutique since the very beginning.' },
  { title: 'Timeless Elegance', desc: 'We reject fleeting trends. Each creation is crafted to be worn for years — blending tradition with contemporary style to deliver fashion that endures.' },
  { title: 'Empowering Women', desc: 'Every design is conceived to empower. We believe clothing is more than fabric — it is an expression of identity, confidence, and grace.' },
  { title: 'Resilience & Purpose', desc: 'Born from determination and a heartfelt dream, Shirin\'s Boutique stands as a testament to what passion and perseverance can build from the ground up.' },
];

const milestones = [
  { year: '2007', event: 'The Dream Begins', desc: 'Sabnam Shirin lays the foundation for Shirin\'s Boutique, working from home with unwavering determination and a lifelong love of fashion.' },
  { year: '2010', event: 'Growing Trust', desc: 'Word-of-mouth and genuine quality earn the boutique its first loyal customers across the region.' },
  { year: '2015', event: 'Pan-India Reach', desc: 'Orders begin arriving from customers across India, marking a significant milestone in the boutique\'s journey.' },
  { year: '2019', event: 'Digital Presence', desc: 'Shirin\'s Boutique establishes its online presence, bringing timeless designs to customers beyond borders.' },
  { year: '2022', event: 'Global Recognition', desc: 'The boutique earns the confidence of customers around the world, becoming synonymous with elegance and authentic craftsmanship.' },
  { year: '2024', event: 'A Lasting Legacy', desc: 'Celebrating over 17 years of passion, perseverance, and refined design — Shirin\'s Boutique continues to empower women with timeless fashion.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="px-6 lg:px-16 pt-4" style={{ background: '#F7F2EA' }}>
        <BackButton />
      </div>
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
          <p className="text-[11px] font-montserrat tracking-[0.35em] uppercase text-gold mb-3">Since 2007</p>
          <h1 className="font-playfair text-4xl lg:text-6xl text-ivory">Our Story</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 lg:py-24" style={{ background: '#F7F2EA' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[12px] font-montserrat tracking-[0.3em] uppercase text-[#000000] font-bold mb-4">The Beginning</p>
              <h2 className="font-playfair text-3xl lg:text-4xl text-ink mb-6 leading-tight">
                A Dream Woven in
                <br />Passion &amp; Purpose
              </h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-[15px] font-montserrat text-[#000000] font-medium leading-relaxed mb-4">
                Every remarkable journey begins with a dream, and ours began in 2007.
              </p>
              <p className="text-[15px] font-montserrat text-[#000000] font-medium leading-relaxed mb-4">
                For <strong className="text-[#000000] font-bold">Sabnam Shirin</strong>, fashion was never merely about clothing. It was a form of expression, creativity, and identity. From an early age, she was captivated by fabrics, intricate craftsmanship, and the art of design, nurturing a lifelong dream of becoming a fashion designer.
              </p>
              <p className="text-[15px] font-montserrat text-[#000000] font-medium leading-relaxed mb-4">
                Life, however, led her down a different path. She pursued a career in teaching, dedicating herself to educating young minds. When she became a mother, she made the heartfelt decision to leave her profession so she could devote herself to her daughter&apos;s early years. At the same time, her family was facing financial uncertainty, inspiring her to find a way to support them without compromising the values she held closest.
              </p>
              <p className="text-[15px] font-montserrat text-[#000000] font-medium leading-relaxed">
                Determined to transform adversity into opportunity, she returned to the dream she had carried since childhood. Working from home with limited resources but unwavering determination, she laid the foundation for what would become Shirin&apos;s Boutique.
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/12579916/pexels-photo-12579916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                  alt="Sabnam Shirin — Founder of Shirin's Boutique"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-ink p-5 rounded-xl shadow-xl">
                <p className="font-playfair text-2xl text-gold">17+</p>
                <p className="text-[10px] font-montserrat uppercase tracking-wide text-ivory/60">Years of Heritage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Story */}
      <section className="py-20 lg:py-24" style={{ background: 'linear-gradient(135deg, #ede5d8 0%, #F7F2EA 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[12px] font-montserrat tracking-[0.3em] uppercase text-[#000000] font-bold mb-4">The Journey</p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-ink mb-8 leading-tight">From Dream to Legacy</h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mb-10" />
          </div>
          <div className="max-w-3xl mx-auto space-y-6 text-[15px] font-montserrat text-[#000000] font-medium leading-relaxed">
            <p>
              Every design Sabnam Shirin created reflected not only her creativity but also her resilience, perseverance, and unwavering commitment to quality. What began as a small home-based venture gradually grew through trust, dedication, and genuine craftsmanship.
            </p>
            <p>
              Over the years, Shirin&apos;s Boutique has earned the confidence of customers across India and around the world, becoming a name synonymous with elegance, authenticity, and timeless design.
            </p>
            <p>
              Today, our boutique is more than a fashion label. It is a celebration of individuality, confidence, and refined craftsmanship. Every piece is thoughtfully designed to empower women, blending tradition with contemporary style while preserving the attention to detail that has defined our journey from the very beginning.
            </p>
            <p>
              From a childhood dream to a globally trusted boutique, our story is a testament to passion, perseverance, and the belief that dreams, when pursued with courage and dedication, can become a lasting legacy.
            </p>
            <p className="font-playfair text-lg text-[#000000] italic text-center pt-4">
              &ldquo;Welcome to Shirin&apos;s Boutique — where timeless elegance meets heartfelt craftsmanship, and every creation tells a story of passion, purpose, and grace.&rdquo;
            </p>
            <p className="text-center font-montserrat text-[13px] font-semibold text-[#000000] tracking-wide">
              — Sabnam Shirin, Founder
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24" style={{ background: '#1A1A1A' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[12px] font-montserrat tracking-[0.3em] uppercase text-gold mb-3">What We Stand For</p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-ivory">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-2xl" style={{ background: 'rgba(247,242,234,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}>
                <div className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)' }}>
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <h3 className="font-playfair text-[18px] text-ivory mb-3">{v.title}</h3>
                <p className="text-[13px] font-montserrat text-[#FFFFFF] font-medium leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-24" style={{ background: '#F7F2EA' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[12px] font-montserrat tracking-[0.3em] uppercase text-[#000000] font-bold mb-3">Our Journey</p>
            <h2 className="font-playfair text-3xl lg:text-4xl text-ink">17 Years of Growth</h2>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gold/30" />
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="w-16 flex-shrink-0 text-right">
                  <span className="font-playfair text-lg text-gold">{m.year}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-gold border-2 border-ivory" />
                  <h4 className="font-montserrat font-bold text-[13px] tracking-wide uppercase text-ink mb-1">{m.event}</h4>
                  <p className="text-[14px] font-montserrat text-[#000000] font-medium leading-relaxed">{m.desc}</p>
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
          <p className="text-[15px] font-montserrat text-[#000000] font-medium mb-8 max-w-md mx-auto">
            Whether you&apos;re shopping for yourself or looking to stock your boutique — we&apos;d love to have you.
          </p>
          <div className="flex flex-nowrap justify-center gap-2 sm:gap-4">
            <Link
              href="/collections/sarees"
              className="inline-flex items-center gap-2 bg-ink text-gold font-montserrat font-bold text-[11px] sm:text-[12px] tracking-[0.06em] sm:tracking-[0.1em] uppercase px-5 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-ink/90 transition-all whitespace-nowrap"
            >
              Shop Now →
            </Link>
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 border-2 border-gold text-gold font-montserrat font-bold text-[11px] sm:text-[12px] tracking-[0.06em] sm:tracking-[0.1em] uppercase px-5 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-gold hover:text-ink transition-all whitespace-nowrap"
            >
              <span className="sm:hidden">Wholesale</span>
              <span className="hidden sm:inline">Wholesale Enquiry</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
