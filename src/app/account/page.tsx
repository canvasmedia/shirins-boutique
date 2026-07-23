'use client';

import { useEffect } from 'react';
import { SHOPIFY_ACCOUNT_URL } from '@/lib/shopify';

// Accounts are handled by Shopify's hosted customer-account page (email-OTP login).
// This route just forwards there so bookmarks / old links keep working.
export default function AccountPage() {
  useEffect(() => {
    window.location.replace(SHOPIFY_ACCOUNT_URL);
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-24 text-center">
      <p className="font-montserrat text-[13px] text-taupe">
        Taking you to sign in…{' '}
        <a href={SHOPIFY_ACCOUNT_URL} className="underline text-ink hover:text-gold">
          Click here
        </a>{' '}
        if you&apos;re not redirected.
      </p>
    </div>
  );
}
