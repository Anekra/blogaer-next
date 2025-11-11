import React from "react";

import NavBar from "@/lib/components/nav/header/NavBar";

export default async function UserNoSBLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <NavBar />
      {children}
    </React.Fragment>
  );
}
