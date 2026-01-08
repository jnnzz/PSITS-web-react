import { Outlet } from "react-router";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-gray-50/50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
