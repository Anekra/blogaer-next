"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useSession } from "@/lib/contexts/SessionContext";

const SideBarContext = createContext({
  isCollapsed: true,
  toggleSideBar: () => {}
});

export function SideBarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { session } = useSession();

  useEffect(() => {
    const storedValue = localStorage.getItem("sidebar");
    if (storedValue !== null) setIsCollapsed(JSON.parse(storedValue));
  }, []);
  useEffect(() => {
    localStorage.setItem("sidebar", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSideBar = () => setIsCollapsed(!isCollapsed);

  if (!session) return;

  return (
    <SideBarContext.Provider value={{ isCollapsed, toggleSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBar = () => useContext(SideBarContext);
