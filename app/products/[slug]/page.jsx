import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct } from "@/services/products";

function parseSpecs(specsString) {
  if (!specsString) return null;
  return specsString
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { payload: product } = await getProduct(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const { payload: product } = await getProduct(slug);

  if (!product) notFound();

  const specs = parseSpecs(product.specs);

  const waLink = `https://wa.me/254700000000?text=${encodeURIComponent(
    `I'm interested in ${product.name}`,
  )}`;

  return (
    <section className="py-16 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        <nav className="mb-8">
          <Link
            href={`/categories/${product.category.slug}`}
            className="inline-flex items-center gap-2 text-[#888] hover:text-[#2b2b2b]
                       transition-colors text-sm no-underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to {product.category.name.toLowerCase()} products
          </Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-sm aspect-square">
            <Image
              src={product.image ? product.image : null}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="font-playfair text-[2.8rem] text-[#2b2b2b] mt-2 leading-tight">
              {product.name}
            </h1>

            <p className="font-dm-sans text-2xl font-normal text-[#2b2b2b] mt-1 mb-6">
              <b>Ksh.</b> {product.price}
            </p>

            <div className="mb-6 text-[#555] leading-relaxed">
              {product.description}
            </div>

            <div className="mb-8">
              <h5 className="text-[0.9rem] font-bold uppercase tracking-widest mb-4 text-[#2b2b2b]">
                Details
              </h5>
              <ul className="list-none p-0 space-y-2">
                {specs
                  ? specs.map((spec, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[#555] text-[0.95rem]"
                      >
                        <svg
                          className="w-4 h-4 text-[#c05a2a] shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {spec}
                      </li>
                    ))
                  : [
                      "Hand-crafted finish",
                      "Sustainable sourcing",
                      "Built to last",
                    ].map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-[#555] text-[0.95rem]"
                      >
                        <svg
                          className="w-4 h-4 text-[#c05a2a] shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {s}
                      </li>
                    ))}
              </ul>
            </div>

            <div className="bg-[#f1ece4] text-[#555] text-sm rounded-xl p-4 mb-6">
              <span className="font-bold">Dimensions: </span>
              {product.dimensions ?? "Standard sizing"}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <a href={waLink} className="btn-whatsapp">
                {/* bi-whatsapp icon — install bootstrap-icons or swap with an SVG */}
                <i className="bi bi-whatsapp" />
                CONTACT VIA WHATSAPP
              </a>
              <a
                href="https://instagram.com/cozycorner"
                className="btn-instagram"
              >
                <i className="bi bi-instagram" />
                CONTACT VIA INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
