import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/services/category";

export const metadata = { title: "Categories" };

export default async function AdminCategoriesPage() {
  const { payload: categories } = await getAllCategories();

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#888]">
          {categories.length} categories total
        </p>
        <Link
          href="/admin/categories/new"
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
          New Category
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e8e0d5] overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-16 text-[#888] text-sm">
            No categories yet.{" "}
            <Link
              href="/admin/categories/new"
              className="text-[#c05a2a] hover:underline"
            >
              Create one →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#faf7f2] border-b border-[#e8e0d5]">
              <tr>
                {[
                  "Name",
                  "Products",
                  "Created By",
                  "Date",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-semibold first:rounded-tl-2xl last:rounded-tr-2xl"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ece6]">
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-[#faf7f2] transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-[#2b2b2b]">
                    {cat.name}
                  </td>
                  <td className="px-5 py-3 text-[#555]">
                    {cat._count?.product ?? 0}
                  </td>
                  <td className="px-5 py-3 text-[#555]">
                    {cat.createdBy?.name}
                  </td>
                  <td className="px-5 py-3 text-[#888]">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/categories/${cat.slug}`}
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
