import Header from "../components/Header";
import Footer from "../components/Footer";
import Perfil from "../components/Perfil";

const PerfilPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />
      <main className="flex-grow p-6">
        <Perfil />
      </main>
      <Footer />
    </div>
  );
};

export default PerfilPage;
