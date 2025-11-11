import NavBar from "@/lib/components/nav/header/NavBar";

export default async function BlogPostLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <NavBar />
      {children}
    </div>
  );
}
