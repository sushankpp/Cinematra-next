import { Sidebar } from "@/components/sections/dashboard/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-secondary-Body font-body">
        <Sidebar />
        <main className="ml-[130px] pt-2">{children}</main>
      </div>
    </AuthProvider>
  );
}
