import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/services/products";

export const metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const { payload: products } = await getAllProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#888]">{products.length} products total</p>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#c05a2a] text-white
                     px-5 py-2.5 rounded-lg text-sm font-semibold no-underline
                     hover:bg-[#a64d24] transition-colors duration-200"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-4 h-4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e8e0d5] overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-16 text-[#888] text-sm">
            No products yet.{" "}
            <Link
              href="/admin/products/new"
              className="text-[#c05a2a] hover:underline"
            >
              Add your first product →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#faf7f2] border-b border-[#e8e0d5]">
              <tr>
                {[
                  "Name",
                  "Category",
                  "Price",
                  "Created By",
                  "Date",
                  "",
                ].map((h) => (
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#faf7f2] transition-colors">
                  <td className="px-5 py-3 font-medium text-[#2b2b2b]">
                    {product.name}
                  </td>
                  <td className="px-5 py-3 text-[#555]"><a href={`/admin/categories/${product.category?.slug}`}>{product.category?.name}</a></td>
                  <td className="px-5 py-3 text-[#555]">
                    Ksh. {product.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-[#555]">{product.createdBy?.name}</td>
                  <td className="px-5 py-3 text-[#888]">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/products/${product.slug}`}
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
  );
}
