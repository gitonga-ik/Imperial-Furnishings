export const metadata = { title: 'Sign In | Admin — Imperial Furnishings' };

import LoginForm from './LoginForm';

export default function LoginPage() {  return (
    <div className="min-h-screen flex font-dm-sans">

      {/* ── Left decorative panel ─────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-end w-1/2 bg-[#1a1a1a] p-14 relative"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white">
          <p className="text-[#d4af37] text-xs uppercase tracking-widest mb-4 font-semibold">
            Imperial Furnishings
          </p>
          <h1 className="font-playfair text-5xl font-bold leading-tight mb-4">
            Admin<br />Console
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Manage your products, categories, and team from one place.
          </p>
        </div>
      </div>

      {/* ── Right form panel ──────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-[#faf7f2] px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <p className="lg:hidden text-[#c05a2a] font-semibold uppercase tracking-widest text-xs mb-6">
            Imperial Furnishings · Admin
          </p>

          <h2 className="font-playfair text-3xl font-bold text-[#2b2b2b] mb-1">Welcome back</h2>
          <p className="text-[#888] text-sm mb-8">Sign in to your admin account</p>

          <LoginForm />

        </div>
      </div>
    </div>
  );
}
