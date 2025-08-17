// src/pages/AuthLayoutPage.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthPage from '@/components/AuthPage';

export default function AuthLayoutPage() {
  return (
    <>
      <Header />
      <AuthPage />
      <Footer />
    </>
  );
}