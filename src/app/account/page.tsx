'use client';

import { useState } from 'react';
import { User, Mail, Lock, Package, Heart, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BackButton from '@/components/ui/BackButton';

const perks = [
  { Icon: Package, label: 'Track your orders' },
  { Icon: Heart, label: 'Sync your wishlist across devices' },
  { Icon: MapPin, label: 'Save addresses for faster checkout' },
];

export default function AccountPage() {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Account' },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-10">
      <div className="mb-3">
        <BackButton />
      </div>
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 max-w-3xl mx-auto lg:max-w-none">
        {/* Info side */}
        <div className="flex flex-col justify-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}>
            <User size={24} className="text-gold" />
          </div>
          <h1 className="font-playfair text-3xl text-ink mb-3">Your Account</h1>
          <p className="text-[13px] font-montserrat text-taupe leading-relaxed mb-6">
            Sign in to track orders, manage your wishlist, and check out faster next time.
          </p>
          <ul className="space-y-3">
            {perks.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon size={15} className="text-gold flex-shrink-0" />
                <span className="text-[13px] font-montserrat text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form side */}
        <div className="bg-surface rounded-2xl p-6 lg:p-8 shadow-sm border border-taupe/10">
          <div className="flex gap-6 mb-6 border-b border-taupe/20">
            <button
              onClick={() => setTab('signin')}
              className={`pb-3 text-[12px] font-montserrat font-bold tracking-[0.08em] uppercase transition-colors ${
                tab === 'signin' ? 'text-ink border-b-2 border-gold' : 'text-taupe hover:text-ink'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`pb-3 text-[12px] font-montserrat font-bold tracking-[0.08em] uppercase transition-colors ${
                tab === 'register' ? 'text-ink border-b-2 border-gold' : 'text-taupe hover:text-ink'
              }`}
            >
              Create Account
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {tab === 'register' && (
              <div>
                <label htmlFor="acc-name" className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">Full Name</label>
                <div className="flex items-center gap-2 bg-ivory border border-taupe/25 rounded-lg px-4 py-3 focus-within:border-gold transition-colors">
                  <User size={14} className="text-taupe flex-shrink-0" />
                  <input id="acc-name" type="text" required className="flex-1 bg-transparent text-[13px] font-montserrat text-ink outline-none" />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="acc-email" className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">Email</label>
              <div className="flex items-center gap-2 bg-ivory border border-taupe/25 rounded-lg px-4 py-3 focus-within:border-gold transition-colors">
                <Mail size={14} className="text-taupe flex-shrink-0" />
                <input id="acc-email" type="email" required className="flex-1 bg-transparent text-[13px] font-montserrat text-ink outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="acc-password" className="block text-[11px] font-montserrat tracking-wide uppercase text-taupe mb-1">Password</label>
              <div className="flex items-center gap-2 bg-ivory border border-taupe/25 rounded-lg px-4 py-3 focus-within:border-gold transition-colors">
                <Lock size={14} className="text-taupe flex-shrink-0" />
                <input id="acc-password" type="password" required className="flex-1 bg-transparent text-[13px] font-montserrat text-ink outline-none" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-ink text-gold font-montserrat font-bold text-[12px] tracking-[0.1em] uppercase py-4 rounded-xl hover:bg-ink/90 transition-all"
            >
              {tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
            <p className="text-center text-[11px] font-montserrat text-taupe">
              Accounts are coming soon — this is a preview of what&apos;s next.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
