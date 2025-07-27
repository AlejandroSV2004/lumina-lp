import React from "react";

interface Resena {
  id: number;
  id_usuario: string;
  nombre_usuario: string;
  calificacion: number;
  comentario: string;
  fecha: string;
}

interface Props {
  resenas: Resena[];
  usuarioActual: string | null;
  onEliminarResena: (id: number) => void;
}

const Resenas: React.FC<Props> = ({ resenas, usuarioActual, onEliminarResena }) => {
  return (
    <div className="max-w-4xl w-full mx-auto text-left">
      <h2 className="text-xl font-semibold mb-4">Reseñas</h2>
      {resenas.length === 0 ? (
        <p className="text-gray-500">Este producto aún no tiene reseñas.</p>
      ) : (
        <ul className="space-y-4">
          {resenas.map((r) => (
            <li key={r.id} className="border p-4 rounded shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <strong>{r.nombre_usuario}</strong>
                <span className="text-yellow-500">
                  {"★".repeat(r.calificacion)}{"☆".repeat(5 - r.calificacion)}
                </span>
              </div>
              <p className="text-gray-700">{r.comentario}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(r.fecha).toLocaleString()}
              </p>

              {usuarioActual === r.id_usuario && (
                <button
                  onClick={() => onEliminarResena(r.id)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Eliminar reseña
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Resenas;
