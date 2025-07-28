import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Categorias from "./pages/Categorias";
import DetalleCategoria from "./pages/DetalleCategoria";
import Producto from "./pages/Producto";
import CreacionProducto from './components/CreacionProducto';
import Ofertas from "./pages/Ofertas";
import PerfilPage from "./pages/PerfilPage";
import Carrito from './pages/Carrito';
import AuthLayoutPage from "./pages/AuthLayoutPage";
import PanelVendedor from './pages/PanelVendedor';  
// Importa más páginas según las tengas
// import Kits from './pages/Kits';
// import Soporte from './pages/Soporte';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <BrowserRouter basename="/">
          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<Index />} />
            <Route path="/producto/:id" element={<Producto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/auth" element={<AuthLayoutPage />} />
            {/* Página general de categorías */}
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/crear-producto" element={<CreacionProducto />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/categorias/:nombreCategoria" element={<DetalleCategoria />} />
            <Route path="/panel-vendedor" element={<PanelVendedor />} />  
            <Route path="/perfil/:id" element={<PerfilPage />} />

            {/* Página no encontrada (última siempre) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
