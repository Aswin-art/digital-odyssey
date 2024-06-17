import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Digital Odyssey",
  description: "Dashboard for digital odyssey game",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </>
  );
}
