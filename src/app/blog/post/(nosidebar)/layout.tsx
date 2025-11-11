import React from "react";

import NavBar from "@/lib/components/nav/header/NavBar";
import { ContentProvider } from "@/lib/contexts/ContentContext";

export default async function PostNoSBLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentProvider>
      <NavBar />
      {children}
    </ContentProvider>
  );
}
