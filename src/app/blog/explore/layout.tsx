import React from "react";

import Footer from "@/lib/components/nav/footer/Footer";
import NavBar from "@/lib/components/nav/header/NavBar";
import SideBar from "@/lib/components/nav/sidebar/SideBar";
import { NavBarProvider } from "@/lib/contexts/NavBarContext";
import { SideBarProvider } from "@/lib/contexts/SideBarContext";

export default async function ExploreLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <NavBarProvider>
      <NavBar />
      <div className="flex min-h-screen w-screen max-w-screen-2xl">
        <SideBarProvider>
          <SideBar />
        </SideBarProvider>
        {children}
      </div>
      <Footer />
    </NavBarProvider>
  );
}
