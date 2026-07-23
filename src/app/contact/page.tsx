'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '1, British Indian Street, 6th Floor, Room No. 603, Kolkata – 700069\n(Opposite Merlin Chamber Building)',
  },
  { icon: Phone, label: 'Phone', value: '+91 9836380078' },
  { icon: Mail, label: 'Email', value: 'hello@shirinsboutique.in' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10am–7pm IST' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Page header */}
      <div className="px-6 lg:px-16 pt-4 pb-2" style={{ background: '#1A1A1A' }}>
        <BackButton />
      </div>
      <div className="py-14 text-center" style={{ background: '#1A1A1A' }}>
        <p className="text-[10px] font-montserrat tracking-[0.35em] uppercase text-gold/60 mb-3">We&apos;re Here to Help</p>
        <h1 className="font-playfair text-4xl lg:text-5xl text-ivory">Contact Us</h1>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12">
          {/* Info */}
          <div>
            <h2 className="font-playfair text-2xl text-ink mb-6">Get in Touch</h2>
            <p className="text-[13px] font-montserrat text-taupe leading-relaxed mb-8">
              Whether you have a question about an order, need styling advice, want to enquire about wholesale, or just want to say hello — we&apos;re here for you.
            </p>

            <div className="space-y-5 mb-10">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                  >
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] font-montserrat tracking-[0.15em] uppercase text-taupe">{label}</p>
                    <p className="text-[13px] font-montserrat text-ink font-medium mt-0.5 whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919836380078"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-montserrat font-bold text-[12px] tracking-[0.08em] uppercase px-6 py-4 rounded-xl hover:bg-[#20ba59] transition-all shadow-lg shadow-green-500/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact form */}
          <div className="bg-surface rounded-2xl p-8 shadow-sm border border-taupe/10">
            <h3 className="font-playfair text-xl text-ink mb-6">Send a Message</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(212,175,55,0.1)' }}
                >
                  <span className="text-3xl">✓</span>
                </div>
                <h4 className="font-playfair text-2xl text-ink mb-2">Message Sent!</h4>
                <p className="text-[13px] font-montserrat text-taupe">
                  Thank you for reaching out. We&apos;ll get back to you within 24 business hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">Name *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      className="w-full bg-ivory border border-taupe/25 rounded-lg px-4 py-3 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">Email *</label>
                    <input
                      name="email" type="email" required value={form.email} onChange={handleChange}
                      className="w-full bg-ivory border border-taupe/25 rounded-lg px-4 py-3 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">Subject *</label>
                  <select
                    name="subject" required value={form.subject} onChange={handleChange}
                    className="w-full bg-ivory border border-taupe/25 rounded-lg px-4 py-3 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option>Order Enquiry</option>
                    <option>Product Information</option>
                    <option>Wholesale Enquiry</option>
                    <option>Return / Exchange</option>
                    <option>General Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">Message *</label>
                  <textarea
                    name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full bg-ivory border border-taupe/25 rounded-lg px-4 py-3 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors resize-none placeholder-taupe/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ink text-gold font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase py-4 rounded-xl hover:bg-ink/90 transition-all"
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
