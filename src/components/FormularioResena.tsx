import React, { useState } from "react";

const API = import.meta.env.VITE_API_URL;

interface Props {
  productoId: string | undefined;
  onResenaEnviada: (nuevas: any[]) => void;
}

const FormularioResena: React.FC<Props> = ({ productoId, onResenaEnviada }) => {
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);

  const handleEnviar = async () => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      window.location.href = "/auth";
      return;
    }

    const parsedUser = JSON.parse(usuario);

    if (!comentario.trim() || calificacion < 1) {
      alert("Por favor escribe un comentario y selecciona una calificación.");
      return;
    }

    const body = {
      id_usuario: parsedUser.id_usuario,
      id_producto: productoId,
      comentario,
      calificacion,
    };

    try {
      const res = await fetch(`${API}/api/resenas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Error al enviar reseña");
        return;
      }

      const nuevas = await res.json();
      onResenaEnviada(nuevas);
      setComentario("");
      setCalificacion(0);
    } catch (err) {
      alert("Error de servidor");
      console.error(err);
    }
  };

  return (
    <div className="mb-10 max-w-4xl w-full mx-auto text-left">
      <h2 className="text-xl font-semibold mb-2">Deja tu reseña</h2>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        className="w-full border p-2 rounded mb-3"
        rows={4}
        placeholder="Escribe tu experiencia..."
      />
      <div className="flex mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`text-2xl cursor-pointer ${
              calificacion >= n ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setCalificacion(n)}
          >
            ★
          </span>
        ))}
      </div>
      <button
        onClick={handleEnviar}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Enviar reseña
      </button>
    </div>
  );
};

export default FormularioResena;
