import Header from '../components/Header';
import Footer from '../components/Footer';

import PanelVendedorComp from '../components/PanelVendedorComp';


const PanelVendedor = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PanelVendedorComp/>
      <Footer />
    </div>
  );
};

export default PanelVendedor;