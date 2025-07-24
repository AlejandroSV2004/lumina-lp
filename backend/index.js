// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import usuariosRoutes from './routes/usuarios.js';

dotenv.config();

const app = express();

// 🔐 Seguridad básica
app.use(cors());
app.use(express.json());

// 🖼️ Servir archivos subidos (foto de perfil)
app.use('/uploads', express.static(path.resolve('uploads')));

// 📦 Rutas
app.use('/api/usuarios', usuariosRoutes);

// Ruta raíz para pruebas
app.get('/', (req, res) => {
  res.send('API Lumina funcionando ✅');
});

// 🚀 Levantar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
