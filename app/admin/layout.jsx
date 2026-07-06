// app/admin/layout.jsx
// Wraps every admin page with a persistent sidebar + topbar.
// Auth guard: redirect to /admin/login if no valid session.
// TODO: replace the session check below with your actual auth logic
//       (e.g. next-auth getServerSession, jose JWT verification, etc.)

import { redirect } from 'next/navigation';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import AdminTopbar from '@/app/components/admin/AdminTopbar';

async function getSession() {
  // TODO: verify the user's session/JWT and return { user } or null
  // Example with next-auth:
  //   const session = await getServerSession(authOptions);
  //   return session;
  return null; // remove this line once auth is wired up
}

export const metadata = { title: { template: '%s | Admin — Imperial', default: 'Admin — Imperial Furnishings' } };

export default async function AdminLayout({ children }) {
  // const session = await getSession();
  // if (!session) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-[#faf7f2] flex font-dm-sans">
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
