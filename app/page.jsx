import Link from "next/link";

export const metadata = { title: "Home" };

export default async function HomePage() {
  return (
    <>
      <section
        className="relative flex items-center min-h-screen"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
        }}
      >
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
            <Link href="/visit" className="btn-imperial">
              Visit our Showroom <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-4 text-[#2b2b2b]">
            Explore &amp; Create
          </h2>
          <p className="font-dm-sans text-lg text-[#2b2b2b]/70 mb-12 max-w-xl mx-auto">
            Browse our latest pieces or tell us about the design you have in mind.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-[10px] border border-[#c05a2a]/20 bg-white shadow-sm p-8 flex flex-col items-center">
              <h3 className="font-playfair text-xl font-semibold text-[#2b2b2b] mb-2">
                View Our Products
              </h3>
              <p className="font-dm-sans text-sm text-[#2b2b2b]/60 mb-6">
                See our latest handcrafted pieces on Instagram.
              </p>
              <a
                href="https://instagram.com/imperial_furnishings_"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-instagram max-w-[220px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                Follow on Instagram
              </a>
            </div>

            <div className="rounded-[10px] border border-[#c05a2a]/20 bg-white shadow-sm p-8 flex flex-col items-center">
              <h3 className="font-playfair text-xl font-semibold text-[#2b2b2b] mb-2">
                Contact Us With Your Design
              </h3>
              <p className="font-dm-sans text-sm text-[#2b2b2b]/60 mb-6">
                Send us a photo or idea and we&apos;ll get back to you with a quote.
              </p>
              <a
                href="https://wa.me/+254704338341?text=Hi%2C%20I%27d%20like%20to%20share%20a%20design%20idea"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp max-w-[220px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11a16.6 16.6 0 0 1-1.63-.6c-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.21.71-.83.9-1.11.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
                </svg>
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
