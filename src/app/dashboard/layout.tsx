import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex gap-6 px-4 py-6 container mx-auto">{children}</main>
    </>
  );
}
