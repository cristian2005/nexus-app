import CartView from "./CartView";

// Esta pagina simplemente delega en un Client Component porque el carrito
// vive en localStorage (solo accesible desde el navegador).
export default function CarritoPage() {
  return <CartView />;
}
