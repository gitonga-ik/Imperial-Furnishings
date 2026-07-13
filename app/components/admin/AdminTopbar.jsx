'use client';

import { usePathname, useRouter } from 'next/navigation';

const LABELS = {
  '/admin/dashboard':   'Dashboard',
  '/admin/categories':  'Categories',
  '/admin/categories/new': 'New Category',
  '/admin/products':    'Products',
  '/admin/products/new': 'New Product',
  '/admin/register':    'Register Staff',
};

function pageTitle(pathname) {
  if (LABELS[pathname]) return LABELS[pathname];
  if (pathname.includes('/categories/')) return 'Category Detail';
  if (pathname.includes('/products/'))   return 'Product Detail';
  return 'Admin';
}

export default function AdminTopbar({session}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch("/api/admin/logout", {
          method: "POST",
        });
    
    const result = await response.json();

    if(result.success){
      router.push("/admin/login")
    }

    router.refresh();
  }

  return (
    <header className="bg-white border-b border-[#e8e0d5] px-6 py-4 flex items-center justify-between">
      <h1 className="font-playfair text-xl font-semibold text-[#2b2b2b]">
        {pageTitle(pathname)}
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#888] hidden sm:block">{session?.name}</span>
        <div className="w-9 h-9 rounded-full bg-[#c05a2a] flex items-center justify-center text-white font-bold text-sm select-none">
          {session?.name[0].toUpperCase()}
          
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-[#888] hover:text-[#c05a2a] transition-colors bg-transparent border-none cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
