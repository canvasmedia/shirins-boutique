import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Returns & Exchanges | Shirin's Boutique",
  description:
    "Shirin's Boutique hassle-free return and exchange policy. Return or exchange most items within 7 days of delivery.",
};

export default function ReturnsPage() {
  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row gap-12 items-start">
        <article className="flex-1 w-full min-w-0">
          <div className="prose prose-lg max-w-none">
            <h1
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
            >
              Returns &amp; Exchanges
            </h1>

            <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-ink)', opacity: 0.85, fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}>
              We want you to love what you&apos;re wearing. If something&apos;s not right, here&apos;s how to fix it.
            </p>

            <h2
              id="7-day-return-window"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              7-Day Return Window
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              You can return or exchange most items within{' '}
              <strong className="font-semibold" style={{ opacity: 1 }}>
                7 days of delivery
              </strong>
              , as long as:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 leading-relaxed" style={{ opacity: 0.85 }}>
              <li>The item is unused, unwashed, and unworn, with all original tags attached</li>
              <li>It&apos;s in its original packaging</li>
              <li>You have the order confirmation or invoice (email or order number is fine)</li>
            </ul>

            <h2
              id="how-to-start-a-return-or-exchange"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              How to Start a Return or Exchange
            </h2>
            <ol className="list-decimal pl-6 mb-6 space-y-2 leading-relaxed" style={{ opacity: 0.85 }}>
              <li>
                Go to <strong className="font-semibold" style={{ opacity: 1 }}>Order Tracking</strong> or your{' '}
                <strong className="font-semibold" style={{ opacity: 1 }}>Account → Orders</strong> page
              </li>
              <li>Select the order and item you&apos;d like to return or exchange</li>
              <li>Choose &quot;Return&quot; or &quot;Exchange&quot; and tell us why (helps us improve!)</li>
              <li>
                We&apos;ll schedule a free pickup from your delivery address, or share a nearby drop-off point
              </li>
              <li>
                Once we receive and inspect the item, we&apos;ll process your refund or dispatch your exchange
              </li>
            </ol>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              You can also start a return by messaging us on WhatsApp or calling +91 98765 43210.
            </p>

            <h2
              id="exchanges"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Exchanges
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              Need a different size or color? Select &quot;Exchange&quot; instead of &quot;Return&quot; during
              the request — we&apos;ll ship the new item as soon as the original is picked up (or immediately,
              for prepaid orders opting into instant exchange, subject to stock availability).
            </p>

            <h2
              id="refunds"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Refunds
            </h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 leading-relaxed" style={{ opacity: 0.85 }}>
              <li>
                <strong className="font-semibold" style={{ opacity: 1 }}>Prepaid orders:</strong> refunded to your
                original payment method within 5–7 business days of us receiving the returned item.
              </li>
              <li>
                Shipping charges (if any were paid) are non-refundable unless the return is due to our error
                (wrong/damaged/defective item).
              </li>
            </ul>

            <h2
              id="whats-not-returnable"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              What&apos;s Not Returnable
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              To keep things hygienic and fair for everyone:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 leading-relaxed" style={{ opacity: 0.85 }}>
              <li>Innerwear, petticoats, and similar intimate apparel</li>
              <li>Items marked &quot;Final Sale&quot; or purchased during clearance sales</li>
              <li>Customized or made-to-order pieces (e.g. certain blouse stitching or fall-pico work)</li>
              <li>Items without original tags, or showing signs of wear/wash</li>
            </ul>

            <h2
              id="damaged-or-wrong-item"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Damaged or Wrong Item Received?
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              If your order arrives damaged, defective, or isn&apos;t what you ordered, contact us within{' '}
              <strong className="font-semibold" style={{ opacity: 1 }}>48 hours of delivery</strong> with photos
              of the item and packaging. We&apos;ll arrange a free pickup and prioritize your replacement or
              refund — no questions asked.
            </p>

            <h2
              id="wholesale-orders"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Wholesale Orders
            </h2>
            <p className="mb-6 leading-relaxed" style={{ opacity: 0.85 }}>
              Returns and exchanges for wholesale/bulk orders are governed by the terms agreed at the time of
              purchase — please refer to your wholesale invoice or contact your Shirin&apos;s Boutique account
              manager.
            </p>

            <h2
              id="need-help"
              className="text-2xl font-bold mt-12 mb-6"
              style={{ fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)' }}
            >
              Need Help?
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
              , or WhatsApp us — we&apos;re here Mon–Sat, 10am–7pm IST.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
