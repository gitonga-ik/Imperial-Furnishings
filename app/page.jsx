import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Home" };

export default async function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center min-h-screen"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
        }}
      >
        {/* Overlay */}
        <div className="hero-overlay absolute inset-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="font-playfair text-[4.5rem] md:text-[4.5rem] text-[3rem] font-bold leading-[1.1] mb-6">
              Furniture That Tells <br />a Story
            </h1>
            <p className="font-dm-sans text-xl leading-relaxed mb-10 opacity-90">
              Handcrafted pieces designed for the way you live. <br />
              Timeless quality meets modern elegance.
            </p>
            <Link href="/categories" className="btn-imperial">
              Explore Collection <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-10">
            Our Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <p>Our categories</p>
          </div>
        </div>
      </section>

      {/* ── Showroom CTA ─────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center mb-4">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#2b2b2b]">
          Visit Our Showroom
        </h2>
        <p className="mt-3 text-[#555] max-w-md mx-auto">
          Experience our furniture in person. Touch the materials, feel the
          comfort, find your perfect piece.
        </p>
        {/* replaces {% url 'location' %} */}
        <Link href="/visit" className="btn-imperial mt-8 inline-flex">
          Find Us
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-5 h-5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>
    </>
  );
}
