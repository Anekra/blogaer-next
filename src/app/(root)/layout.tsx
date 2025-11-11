import React from "react";

import Footer from "@/lib/components/nav/footer/Footer";
import NavBar from "@/lib/components/nav/header/NavBar";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
