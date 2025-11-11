"use client";
import React, { createContext, useContext, useState } from "react";

const NavBarContext = createContext({
  isNavBarCollapsed: true,
  setNavBarCollapsed: (_: boolean) => {}
});

export function NavBarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <NavBarContext.Provider
      value={{
        isNavBarCollapsed: isCollapsed,
        setNavBarCollapsed: setIsCollapsed
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
}

export const useNavBar = () => useContext(NavBarContext);
