import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, SectionTitle } from "@/app/components/admin/FormField";
import CategoryForm from "../CategoryForm";
import { getCategory } from "@/services/category";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { payload: category } = await getCategory(slug);
  return { title: category?.name ?? "Category" };
}

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params;
  const { payload: category } = await getCategory(slug);
  if (!category) notFound();

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#2b2b2b] transition-colors no-underline"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="m12 19-7-7 7-7M19 12H5" />
        </svg>
        Back to categories
      </Link>

      {/* Detail card */}
      <Card>
        <div className="flex gap-6 items-start mb-8">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              width={100}
              height={100}
              className="rounded-xl object-cover w-24 h-24 shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-xl bg-[#ede2d0] shrink-0" />
          )}
          <div>
            <h1 className="font-playfair text-3xl font-bold text-[#2b2b2b]">
              {category.name}
            </h1>
          </div>
        </div>

        <SectionTitle>Edit Category</SectionTitle>
        <CategoryForm initial={category} />
      </Card>

      {/* Products in this category */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-xl font-semibold text-[#2b2b2b]">
            Products in this Category
            <span className="ml-2 text-sm font-normal text-[#888]">
              ({category.product?.length ?? 0})
            </span>
          </h2>
          <Link
            href={`/admin/products/new?category=${category.slug}`}
            className="text-sm text-[#c05a2a] hover:underline no-underline"
          >
            + Add product
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#e8e0d5] overflow-hidden">
          {!category.product?.length ? (
            <p className="text-center py-10 text-sm text-[#888]">
              No products in this category yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#faf7f2] border-b border-[#e8e0d5]">
                <tr>
                  {["Name", "Price", "Added", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ece6]">
                {category.product.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-[#faf7f2] transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-[#2b2b2b]">
                      {p.name}
                    </td>
                    <td className="px-5 py-3 text-[#555]">
                      Ksh. {p.price.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-[#888]">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/products/${p.slug}`}
                        className="text-[#c05a2a] text-xs font-medium hover:underline no-underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
