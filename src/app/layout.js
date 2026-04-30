import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Nexus DFR | Libreria + Coworking universitario",
  description:
    "Aplicacion Next.js con App Router para la libreria universitaria Nexus y su zona de coworking.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
          Nexus DFR &middot; Actividad 1 &middot; Desarrollo Web con Frameworks Front-End
        </footer>
      </body>
    </html>
  );
}
