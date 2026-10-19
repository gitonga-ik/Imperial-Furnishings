import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-6 font-dm-sans">

      {/* Main grid */}
      <div className="max-w-300 mx-auto px-5 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">

        {/* Brand column */}
        <div>
          <Image
            src="/images/footer.svg"
            alt="Imperial Furnishings"
            width={160}
            height={50}
            className="mb-4"
          />
          <p className="text-[#cccccc] text-sm leading-relaxed">
            Crafting luxury and comfort for your home. Experience the elegance of Imperial Furnishings.
          </p>

          {/* Social links */}
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              aria-label="Facebook"
              className="text-[#cccccc] hover:text-[#d4af37] transition-colors text-lg"
            >
              {/* Facebook icon — install @fortawesome/react-fontawesome or replace with an SVG icon component */}
              <i className="bi bi-facebook" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-[#cccccc] hover:text-[#d4af37] transition-colors text-lg"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              className="text-[#cccccc] hover:text-[#d4af37] transition-colors text-lg"
            >
              <i className="fab fa-pinterest" />
            </a>
          </div>
        </div>

        {/* Shop column */}
        <div>
          <h4 className="text-[#d4af37] uppercase text-sm font-semibold tracking-wider mb-5">
            Shop
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Living Room', slug: 'living-room' },
              { label: 'Bedroom',     slug: 'bedroom' },
              { label: 'Dining Room', slug: 'dining-room' },
            ].map(({ label, slug }) => (
              <li key={slug}>
                {/* replaces {% url 'category-details' slug=slug %} */}
                <Link
                  href={`/categories/${slug}`}
                  className="text-[#cccccc] text-sm hover:text-[#d4af37] transition-colors no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h4 className="text-[#d4af37] uppercase text-sm font-semibold tracking-wider mb-5">
            Reach Out
          </h4>
          <div className="flex flex-col gap-5">

            {/* Phone */}
            <a
              href="tel:+254700000000"
              className="flex items-center gap-4 text-white no-underline
                         transition-transform duration-300
                         hover:translate-x-2 hover:text-[#d4af37] group"
            >
              <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-xl shrink-0
                              group-hover:bg-[#c05a2a] transition-colors duration-300">
                <i className="bi bi-telephone-inbound" />
              </div>
              <div>
                <span className="block text-[#888] text-[0.7rem] uppercase tracking-widest">Call Us</span>
                <strong className="block font-dm-sans text-base">+254 700 000 000</strong>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/254700000000?text=Hello%2C%20I%20have%20an%20inquiry%20about%20Imperial%20Furnishings"
              className="flex items-center gap-4 text-white no-underline
                         transition-transform duration-300
                         hover:translate-x-2 hover:text-[#d4af37] group"
            >
              <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-xl text-[#25d366] shrink-0
                              group-hover:bg-[#c05a2a] group-hover:text-white transition-colors duration-300">
                <i className="bi bi-whatsapp" />
              </div>
              <div>
                <span className="block text-[#888] text-[0.7rem] uppercase tracking-widest">WhatsApp</span>
                <strong className="block font-dm-sans text-base">Chat with an Expert</strong>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-5 border-t border-[#333] text-[#888] text-xs">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <p className="m-0">&copy; {year} Imperial Furnishings. All rights reserved.</p>
          <ul className="flex gap-4 list-none m-0 p-0">
            <li><a href="#" className="text-[#888] hover:text-[#d4af37] transition-colors no-underline">Privacy Policy</a></li>
            <li><a href="#" className="text-[#888] hover:text-[#d4af37] transition-colors no-underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>

    </footer>
  );
}
