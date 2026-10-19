import { redirect } from "next/navigation";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTopbar from "@/app/components/admin/AdminTopbar";
import { cookies } from "next/headers";
import { verifyAuth } from "@/services/users";
import { NextResponse } from "next/server";

async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const { payload } = await verifyAuth(token);

    return payload;
  } catch (error) {
    redirect("/admin/login");
  }
}

export const metadata = {
  title: {
    template: "%s | Admin — Imperial",
    default: "Admin — Imperial Furnishings",
  },
};

export default async function AdminLayout({ children }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-[#faf7f2] flex font-dm-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar session={session}/>
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
