import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({
    correo: '',
    contrasena: '',
    nombre_usuario: '',
    id_usuario: ''
  });
  const [imagen, setImagen] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const endpoint = mode === 'login' ? 'login' : 'register';

    try {
      let body: BodyInit;
      let headers: HeadersInit = {};

      if (mode === 'register') {
        const formData = new FormData();
        formData.append('id_usuario', form.id_usuario);
        formData.append('nombre_usuario', form.nombre_usuario);
        formData.append('correo', form.correo);
        formData.append('contrasena', form.contrasena);
        if (imagen) {
          formData.append('foto_perfil', imagen);
        }
        body = formData;
        headers = {}; // No poner Content-Type manual, se genera solo
      } else {
        body = JSON.stringify(form);
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(`http://localhost:3001/api/usuarios/${endpoint}`, {
        method: 'POST',
        headers,
        body
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Ocurrió un error');
        return;
      }

      if (mode === 'login') {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        navigate('/');
      } else {
        alert('Registro exitoso, ahora puedes iniciar sesión');
        setMode('login');
      }
    } catch (err) {
      alert('Error en el servidor');
      console.error(err);
    }
  };

  useEffect(() => {
    const existing = localStorage.getItem('usuario');
    if (existing) {
      navigate('/');
    }
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
      </h1>

      {mode === 'register' && (
        <>
          <input
            name="id_usuario"
            placeholder="ID (6 caracteres)"
            value={form.id_usuario}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            name="nombre_usuario"
            placeholder="Nombre de usuario"
            value={form.nombre_usuario}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files?.[0] || null)}
            className="w-full p-2 mb-3 border rounded"
          />
        </>
      )}

      <input
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={form.contrasena}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
      </button>

      <p
        className="text-sm text-blue-600 text-center mt-4 cursor-pointer hover:underline"
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
      >
        {mode === 'login'
          ? '¿No tienes cuenta? Regístrate'
          : '¿Ya tienes cuenta? Inicia sesión'}
      </p>
    </div>
  );
}

