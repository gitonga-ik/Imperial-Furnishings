// app/components/admin/AdminTopbar.jsx
// Shows current user name and a logout button.
// TODO: pull { user } from your session/auth provider.

'use client';

import { usePathname } from 'next/navigation';

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

export default function AdminTopbar() {
  const pathname = usePathname();

  function handleLogout() {
    // TODO: call your sign-out function (e.g. signOut() from next-auth)
    //       then redirect to /admin/login
  }

  return (
    <header className="bg-white border-b border-[#e8e0d5] px-6 py-4 flex items-center justify-between">
      <h1 className="font-playfair text-xl font-semibold text-[#2b2b2b]">
        {pageTitle(pathname)}
      </h1>
      <div className="flex items-center gap-4">
        {/* TODO: replace "Admin User" with session.user.name */}
        <span className="text-sm text-[#888] hidden sm:block">Admin User</span>
        <div className="w-9 h-9 rounded-full bg-[#c05a2a] flex items-center justify-center text-white font-bold text-sm select-none">
          {/* TODO: replace "A" with session.user.name[0].toUpperCase() */}
          A
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
