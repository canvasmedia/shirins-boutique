'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

interface WholesaleEnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function WholesaleEnquiryForm({ isOpen, onClose, productName }: WholesaleEnquiryFormProps) {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    gst: '',
    phone: '',
    city: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-surface rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-taupe/20">
                <div>
                  <h3 className="font-playfair text-xl text-ink">Wholesale Enquiry</h3>
                  {productName && (
                    <p className="text-[12px] font-montserrat text-taupe mt-0.5">Re: {productName}</p>
                  )}
                </div>
                <button onClick={handleClose} className="text-taupe hover:text-ink transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#D4AF37' }} />
                      <h4 className="font-playfair text-2xl text-ink mb-2">Thank You!</h4>
                      <p className="text-[13px] font-montserrat text-taupe leading-relaxed mb-6">
                        We&apos;ve received your wholesale enquiry and will be in touch within 24 business hours.
                        Our team will reach out to verify your business details and share our wholesale catalogue.
                      </p>
                      <button
                        onClick={handleClose}
                        className="bg-ink text-gold text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase px-6 py-3 rounded hover:bg-ink/90 transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <p className="text-[12px] font-montserrat text-taupe mb-4 leading-relaxed">
                        Fill in your details and we&apos;ll connect you with our wholesale team.
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">
                            Your Name *
                          </label>
                          <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-ivory border border-taupe/25 rounded px-3 py-2.5 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">
                            Business Name *
                          </label>
                          <input
                            name="businessName"
                            value={form.businessName}
                            onChange={handleChange}
                            required
                            className="w-full bg-ivory border border-taupe/25 rounded px-3 py-2.5 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">
                            GST Number
                          </label>
                          <input
                            name="gst"
                            value={form.gst}
                            onChange={handleChange}
                            placeholder="22AAAAA0000A1Z5"
                            className="w-full bg-ivory border border-taupe/25 rounded px-3 py-2.5 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors placeholder-taupe/50"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">
                            Phone *
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full bg-ivory border border-taupe/25 rounded px-3 py-2.5 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">
                          City *
                        </label>
                        <input
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          required
                          className="w-full bg-ivory border border-taupe/25 rounded px-3 py-2.5 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Tell us about your boutique and what you're looking for..."
                          className="w-full bg-ivory border border-taupe/25 rounded px-3 py-2.5 text-[13px] font-montserrat text-ink outline-none focus:border-gold transition-colors placeholder-taupe/50 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-wholesale text-white text-[12px] font-montserrat font-bold tracking-[0.1em] uppercase py-3.5 rounded hover:bg-wholesale/90 transition-colors"
                        style={{ background: '#1B2A6B' }}
                      >
                        Submit Enquiry
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
