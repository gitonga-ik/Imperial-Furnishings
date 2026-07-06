// app/visit/page.jsx — replaces location.html

export const metadata = { title: 'Visit Us' };

export default function VisitPage() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="font-playfair text-4xl font-bold mb-3">Visit Our Showroom</h1>
        <p className="text-[#555] mb-8">We'd love to welcome you</p>

        {/* Google Maps embed — same coordinates as the original Django template */}
        <div className="w-full rounded-2xl overflow-hidden shadow-md">
          <iframe
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=-1.286389,36.817223&output=embed"
            title="Imperial Furnishings Showroom Location"
          />
        </div>
      </div>
    </section>
  );
}
