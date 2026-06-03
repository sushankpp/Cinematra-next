import { Sidebar } from "@/components/sections/dashboard/Sidebar";
import { Header } from "@/components/sections/dashboard/Header";
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
        <Header />
        <main className="ml-[130px] pt-2">{children}</main>
      </div>
    </AuthProvider>
  );
}
