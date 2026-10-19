import Link from 'next/link';
import { getStats, recentProducts } from "@/services/dashboard"

export const metadata = { title: 'Dashboard' };

const quickActions = [
  {
    label: 'Add Category',
    href: '/admin/categories/new',
    description: 'Create a new furniture category',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: 'Add Product',
    href: '/admin/products/new',
    description: 'List a new product for sale',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: 'Register Staff',
    href: '/admin/register',
    description: 'Add a new team member',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
      </svg>
    ),
  },
  {
    label: 'View Products',
    href: '/admin/products',
    description: 'Browse and manage all products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const statConfig = [
  { key: 'products',   label: 'Total Products',    color: 'bg-[#c05a2a]/10 text-[#c05a2a]',  href: '/admin/products' },
  { key: 'categories', label: 'Categories',         color: 'bg-[#d4af37]/10 text-[#a07d10]', href: '/admin/categories' },
  { key: 'users',      label: 'Staff Members',      color: 'bg-[#2b2b2b]/5  text-[#2b2b2b]', href: '/admin/register' },
];

export default async function DashboardPage() {
  const [{payload:stats}, {payload: recent}] = await Promise.all([getStats(), recentProducts()]);

  return (
    <div className="space-y-10">

      {/* ── Stat cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {statConfig.map(({ key, label, color, href }) => (
          <Link
            key={key}
            href={href}
            className="bg-white rounded-2xl border border-[#e8e0d5] p-6 no-underline
                       hover:border-[#c05a2a] hover:shadow-sm transition-all duration-200 group"
          >
            <p className="text-xs uppercase tracking-widest text-[#888] font-semibold mb-1">{label}</p>
            <p className={`font-playfair text-5xl font-bold mt-1 ${color.split(' ').find(c => c.startsWith('text-'))}`}>
              {stats[key]}
            </p>
          </Link>
        ))}
      </div>

      {/* ── Quick actions ────────────────────────────────────────── */}
      <div>
        <h2 className="font-playfair text-xl font-semibold text-[#2b2b2b] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(({ label, href, description, icon }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl border border-[#e8e0d5] p-5 no-underline
                         hover:border-[#c05a2a] hover:shadow-sm transition-all duration-200
                         flex flex-col gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#faf7f2] border border-[#e8e0d5]
                              flex items-center justify-center text-[#c05a2a]
                              group-hover:bg-[#c05a2a] group-hover:text-white transition-colors duration-200">
                {icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-[#2b2b2b]">{label}</p>
                <p className="text-xs text-[#888] mt-0.5">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Recent products ──────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-playfair text-xl font-semibold text-[#2b2b2b]">Recent Products</h2>
          <Link href="/admin/products" className="text-sm text-[#c05a2a] hover:underline no-underline">
            View all →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#e8e0d5] overflow-hidden">
          {recent.length === 0 ? (
            <div className="text-center py-12 text-[#888] text-sm">
              No products yet.{' '}
              <Link href="/admin/products/new" className="text-[#c05a2a] hover:underline">
                Add your first product →
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#faf7f2] border-b border-[#e8e0d5]">
                <tr>
                  {['Name', 'Category', 'Price', 'Added', ''].map((header) => (
                    <th key={header} className="text-left px-5 py-3 text-xs uppercase tracking-wider text-[#888] font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ece6]">
                {recent.map((product) => (
                  <tr key={product.id} className="hover:bg-[#faf7f2] transition-colors">
                    <td className="px-5 py-3 font-medium text-[#2b2b2b]">{product.name}</td>
                    <td className="px-5 py-3 text-[#555]">{product.category?.name}</td>
                    <td className="px-5 py-3 text-[#555]">Ksh. {product.price.toLocaleString()}</td>
                    <td className="px-5 py-3 text-[#888]">{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/products/${product.slug}`}
                        className="text-[#c05a2a] text-xs font-medium hover:underline no-underline"
                      >
                        View
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
