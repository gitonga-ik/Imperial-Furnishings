import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/services/category";

export const metadata = { title: "Categories" };

function truncateWords(text = "", n = 15) {
  const words = text.trim().split(/\s+/);
  return words.length <= n ? text : words.slice(0, n).join(" ") + " …";
}

export default async function CategoriesPage() {
  const { payload: categories } = await getAllCategories();

  return (
    <section className="py-16 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-5">
          {categories.map((category, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={category.id}
                className={`relative rounded-xl overflow-hidden h-[450px] md:h-[450px] h-[350px]
                            ${isFirst ? "basis-full" : "basis-full md:basis-[calc(50%-10px)]"}`}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="block w-full h-full relative no-underline group"
                >
                  <div className="w-full h-full absolute inset-0">
                    {category.image? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#d6cfc5]" />
                    )}
                    <div className="tile-overlay absolute inset-0" />
                  </div>

                  <div className="absolute bottom-10 left-10 text-white max-w-[400px] z-10">
                    <span className="font-dm-sans text-xs uppercase tracking-widest opacity-90">
                      {category._count?.product ?? 1} pieces
                    </span>
                    <h2 className="font-playfair text-[2.5rem] md:text-[2.5rem] text-[1.8rem] my-2">
                      {category.name}
                    </h2>
                    <p className="font-dm-sans text-base opacity-80 mb-5">
                      {truncateWords(category.description, 15)}
                    </p>
                    <span className="font-bold border-b border-transparent group-hover:border-white transition-all duration-300">
                      Explore →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
