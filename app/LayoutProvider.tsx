"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <main>
      {pathname === "/privacy" || pathname === "/login" ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </main>
  );
};

export default LayoutProvider;
