import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategory } from "@/services/category";

export async function generateMetadata({ params }) {
  const slug = await params;
  const { payload: category } = await getCategory(slug);
  return { title: category?.name ?? "Collection" };
}

export default async function CollectionPage({ params }) {
  const slug = await params;
  const { payload: category } = await getCategory(slug);
  if (!category) notFound();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="font-playfair text-4xl font-bold mb-10">
          {category.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {category.product?.length ? 
            (category.product?.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden shadow-sm bg-white border-none"
            >
              {product.image ? (
                <div className="relative h-60 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="p-4">
                <h5 className="font-playfair text-xl mb-1">{product.name}</h5>
                <p className="text-[#555] mb-3">
                  <b>Ksh.</b> {product.price}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-block bg-[#c05a2a] text-white text-sm font-medium
                             px-4 py-1.5 rounded no-underline
                             hover:bg-[#a64d24] transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))) : (<p className="text-[#555] font-medium text-base col-span-1 md:col-span-3 text-center py-12">
      No products available in this category yet.
    </p>)}
        </div>
      </div>
    </section>
  );
}
