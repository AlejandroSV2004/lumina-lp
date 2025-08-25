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
import CreacionProd from './pages/CreacionProd';
import Ofertas from "./pages/Ofertas";
import PerfilPage from "./pages/PerfilPage";
import Carrito from './pages/Carrito';
import AuthLayoutPage from "./pages/AuthLayoutPage";
import PanelVendedor from './pages/PanelVendedor';  


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
            <Route path="/crear-producto" element={<CreacionProd />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/categorias/:nombreCategoria" element={<DetalleCategoria />} />
            <Route path="/panel-vendedor" element={<PanelVendedor />} />  
            <Route path="/perfil/:id" element={<PerfilPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
