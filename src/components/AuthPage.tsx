import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [esVendedor, setEsVendedor] = useState(false);

  const [form, setForm] = useState({
    correo: '',
    contrasena: '',
    nombre_usuario: '',
    descripcion: '',
    localidad: '',
  });

  const [imagen, setImagen] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const endpoint = mode === 'login' ? 'login' : 'register';

    try {
      let body: BodyInit;
      let headers: HeadersInit = {};

      if (mode === 'register') {
        const formData = new FormData();
        formData.append('nombre_usuario', form.nombre_usuario);
        formData.append('correo', form.correo);
        formData.append('contrasena', form.contrasena);
        formData.append('es_negocio', esVendedor ? 'true' : 'false');
        if (esVendedor) {
          formData.append('descripcion', form.descripcion);
          formData.append('localidad', form.localidad);
        }
        if (imagen) {
          formData.append('foto_perfil', imagen);
        }
        body = formData;
      } else {
        body = JSON.stringify(form);
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(`${API}/usuarios/${endpoint}`, {
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
          {/* Toggle para vendedor */}
          <label className="flex items-center mb-3 text-sm">
            <input
              type="checkbox"
              checked={esVendedor}
              onChange={() => setEsVendedor(!esVendedor)}
              className="mr-2"
            />
            ¿Eres vendedor?
          </label>

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

          {/* Campos extra si es vendedor */}
          {esVendedor && (
            <>
              <textarea
                name="descripcion"
                placeholder="Descripción del negocio"
                value={form.descripcion}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                name="localidad"
                placeholder="Localidad"
                value={form.localidad}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
              />
            </>
          )}
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

