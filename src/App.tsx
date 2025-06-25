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
import Ofertas from "./pages/Ofertas"
// Importa más páginas según las tengas
// import Kits from './pages/Kits';
// import Soporte from './pages/Soporte';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/lumina-app-emp">
        <Routes>
          {/* Página de inicio */}
          <Route path="/" element={<Index />} />
          <Route path="/producto/:id" element={<Producto />} />
          {/* Página general de categorías */}
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/categorias/:nombreCategoria" element={<DetalleCategoria />} />
          {/* Puedes agregar más así:
          <Route path="/categorias/paneles-solares" element={<PanelesSolares />} />
          */}

          {/* Página no encontrada (última siempre) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
