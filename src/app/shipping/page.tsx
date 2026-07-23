import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Shipping & Delivery | Shirin's Boutique",
  description:
    "Learn about Shirin's Boutique shipping timelines, charges, order tracking, and delivery information across India.",
};

export default function ShippingPage() {
  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row gap-12 items-start">
        <article className="flex-1 w-full min-w-0">
          <div className="prose prose-lg max-w-none">
            <h1
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
            >
              Shipping &amp; Delivery
            </h1>

            <h2
              id="delivery-timelines"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Delivery Timelines
            </h2>

            <div className="overflow-x-auto w-full my-8">
              <table
                className="w-full text-left border-collapse min-w-[600px]"
                style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
              >
                <thead>
                  <tr>
                    <th
                      className="py-4 px-4 border-b-2 font-semibold text-sm uppercase tracking-wider"
                      style={{
                        borderColor: 'rgba(17,24,39,0.1)',
                        background: 'rgba(17,24,39,0.03)',
                      }}
                    >
                      Location
                    </th>
                    <th
                      className="py-4 px-4 border-b-2 font-semibold text-sm uppercase tracking-wider"
                      style={{
                        borderColor: 'rgba(17,24,39,0.1)',
                        background: 'rgba(17,24,39,0.03)',
                      }}
                    >
                      Estimated Delivery
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="py-4 px-4 border-b leading-relaxed text-sm"
                      style={{ borderColor: 'rgba(17,24,39,0.05)', opacity: 0.8 }}
                    >
                      Metro cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune)
                    </td>
                    <td
                      className="py-4 px-4 border-b leading-relaxed text-sm"
                      style={{ borderColor: 'rgba(17,24,39,0.05)', opacity: 0.8 }}
                    >
                      2–4 business days
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="py-4 px-4 border-b leading-relaxed text-sm"
                      style={{ borderColor: 'rgba(17,24,39,0.05)', opacity: 0.8 }}
                    >
                      Rest of India
                    </td>
                    <td
                      className="py-4 px-4 border-b leading-relaxed text-sm"
                      style={{ borderColor: 'rgba(17,24,39,0.05)', opacity: 0.8 }}
                    >
                      4–7 business days
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="py-4 px-4 border-b leading-relaxed text-sm"
                      style={{ borderColor: 'rgba(17,24,39,0.05)', opacity: 0.8 }}
                    >
                      Remote/rural pin codes
                    </td>
                    <td
                      className="py-4 px-4 border-b leading-relaxed text-sm"
                      style={{ borderColor: 'rgba(17,24,39,0.05)', opacity: 0.8 }}
                    >
                      7–10 business days
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              Orders are processed and dispatched within 24–48 hours of confirmation (excluding Sundays and
              public holidays).
            </p>

            <h2
              id="shipping-charges"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Shipping Charges
            </h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 leading-relaxed" style={{ opacity: 0.85 }}>
              <li>
                <strong className="font-semibold" style={{ opacity: 1 }}>
                  Free shipping
                </strong>{' '}
                on all prepaid orders over{' '}
                <strong className="font-semibold" style={{ opacity: 1 }}>
                  ₹2,999
                </strong>
              </li>
              <li>₹99 flat shipping fee on orders below ₹2,999</li>
            </ul>

            <h2
              id="order-tracking"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Order Tracking
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              Once your order is dispatched, you&apos;ll receive a tracking link via SMS/email. You can also
              track your order anytime from{' '}
              <strong className="font-semibold" style={{ opacity: 1 }}>
                Account → Orders
              </strong>{' '}
              or our{' '}
              <Link
                href="/account"
                className="underline hover:text-gold transition-colors font-medium"
              >
                Order Tracking
              </Link>{' '}
              page.
            </p>

            <h2
              id="wholesale-dispatch"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Wholesale Dispatch
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              Wholesale/bulk orders are dispatched pan-India via our logistics partners, with timelines
              depending on order volume and destination — confirmed at the time of order on your wholesale
              invoice.
            </p>

            <h2
              id="delays"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Delays
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              While we work with trusted logistics partners, delivery timelines are estimates and may
              occasionally be affected by weather, regional restrictions, or courier delays. We&apos;ll keep
              you updated via SMS/email if your order is delayed.
            </p>

            <h2
              id="questions"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Questions?
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              Email{' '}
              <strong className="font-semibold" style={{ opacity: 1 }}>
                <Link
                  href="mailto:hello@shirinsboutique.in"
                  className="underline hover:text-gold transition-colors font-medium"
                >
                  hello@shirinsboutique.in
                </Link>
              </strong>
              , call{' '}
              <strong className="font-semibold" style={{ opacity: 1 }}>
                +91 98765 43210
              </strong>
              , or message us on WhatsApp — Mon–Sat, 10am–7pm IST.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
