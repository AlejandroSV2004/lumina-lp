import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

interface Usuario {
  id_usuario: string;
  nombre_usuario: string;
  correo: string;
  foto_perfil: string | null;
  es_negocio: number;
  descripcion?: string;
  localidad?: string;
}

const Perfil = () => {
  const { id } = useParams(); // Permite recibir id desde la ruta
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState<null | keyof Usuario>(null);
  const [valorTemp, setValorTemp] = useState<string>("");
  const [usuarioActualId, setUsuarioActualId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUsuarioActualId(parsed.id_usuario);

      // Cargar propio perfil si no se pasa ID por URL
      fetchUsuario(id || parsed.id_usuario);
    } else if (id) {
      fetchUsuario(id); // Cargar perfil público de otro usuario
    }
  }, [id]);

  const fetchUsuario = async (id_usuario: string) => {
    try {
      const res = await fetch(`${API}/api/usuarios/${id_usuario}`);
      const data = await res.json();
      setUsuario(data);
    } catch (err) {
      console.error("Error al cargar usuario", err);
    }
  };

  const guardarCambios = async () => {
    if (!editando || !usuario) return;
    try {
      const body = { [editando]: valorTemp };
      const res = await fetch(`${API}/api/usuarios/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setUsuario({ ...usuario, [editando]: valorTemp });
        setEditando(null);
      } else {
        alert("Error al guardar cambios");
      }
    } catch (err) {
      console.error("Error al actualizar", err);
    }
  };

  if (!usuario) return <div className="p-6 text-center">Cargando perfil...</div>;

  const esPropietario = usuario.id_usuario === usuarioActualId;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex flex-col items-center mb-6">
        <img
          src={usuario.foto_perfil || "https://placehold.co/120x120"}
          alt="Perfil"
          className="w-28 h-28 rounded-full object-cover mb-2"
        />
        <p className="text-gray-500 text-sm">{usuario.correo}</p>
        <p className="text-gray-600 text-xs">ID: {usuario.id_usuario}</p>
      </div>

      {/* Nombre */}
      <div className="mb-4">
        <label className="font-semibold">Nombre:</label>{" "}
        {editando === "nombre_usuario" ? (
          <div className="flex gap-2 mt-1">
            <input
              value={valorTemp}
              onChange={(e) => setValorTemp(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
            <button
              onClick={guardarCambios}
              className="text-blue-600 text-sm hover:underline"
            >
              Guardar
            </button>
          </div>
        ) : (
          <span className="ml-2">
            {usuario.nombre_usuario}
            {esPropietario && (
              <span
                className="ml-3 text-blue-600 text-sm cursor-pointer hover:underline"
                onClick={() => {
                  setEditando("nombre_usuario");
                  setValorTemp(usuario.nombre_usuario);
                }}
              >
                Editar
              </span>
            )}
          </span>
        )}
      </div>

      {/* Si es negocio */}
      {usuario.es_negocio === 1 && (
        <>
          {/* Localidad */}
          <div className="mb-4">
            <label className="font-semibold">Localidad:</label>{" "}
            {editando === "localidad" ? (
              <div className="flex gap-2 mt-1">
                <input
                  value={valorTemp}
                  onChange={(e) => setValorTemp(e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
                <button
                  onClick={guardarCambios}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <span className="ml-2">
                {usuario.localidad || "No especificado"}
                {esPropietario && (
                  <span
                    className="ml-3 text-blue-600 text-sm cursor-pointer hover:underline"
                    onClick={() => {
                      setEditando("localidad");
                      setValorTemp(usuario.localidad || "");
                    }}
                  >
                    Editar
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="font-semibold">Descripción del negocio:</label>{" "}
            {editando === "descripcion" ? (
              <div className="flex flex-col mt-1">
                <textarea
                  value={valorTemp}
                  onChange={(e) => setValorTemp(e.target.value)}
                  className="border px-2 py-1 rounded"
                  rows={3}
                />
                <button
                  onClick={guardarCambios}
                  className="text-blue-600 text-sm hover:underline w-fit mt-1"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <p className="mt-1">
                {usuario.descripcion || "No especificada"}
                {esPropietario && (
                  <span
                    className="ml-3 text-blue-600 text-sm cursor-pointer hover:underline"
                    onClick={() => {
                      setEditando("descripcion");
                      setValorTemp(usuario.descripcion || "");
                    }}
                  >
                    Editar
                  </span>
                )}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Perfil;
