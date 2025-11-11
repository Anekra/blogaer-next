import React from "react";

export default function NoNavLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="w-screen">{children}</div>;
}
