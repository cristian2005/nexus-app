import { Suspense } from "react";
import CategorySidebar from "@/components/CategorySidebar";
import Filters from "@/components/Filters";
import { listBooks, listCategories } from "@/lib/db";

// Server Component (layout). Calcula la lista de anos disponibles en el
// servidor y se la pasa al Client Component <Filters/> como props.
// <Filters/> usa useSearchParams() y por eso va envuelto en <Suspense>.
export default function LibreriaLayout({ children }) {
  const categories = listCategories();
  const years = [...new Set(listBooks().map((b) => b.year))].sort((a, b) => b - a);

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <div className="space-y-4">
        <CategorySidebar categories={categories} />
        <Suspense fallback={null}>
          <Filters years={years} />
        </Suspense>
      </div>
      <div>{children}</div>
    </div>
  );
}
