// routes/usuarios.js
import express from 'express';
import { db } from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// 📦 Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// 🔍 GET /api/usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error en /api/usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// 📝 POST /api/usuarios/register
router.post('/register', upload.single('foto_perfil'), async (req, res) => {
  const { id_usuario, correo, nombre_usuario, contrasena } = req.body;
  const fotoUrl = req.file ? `http://localhost:3001/uploads/${req.file.filename}` : null;

  try {
    const [existing] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Correo ya registrado' });
    }

    await db.query(
      'INSERT INTO usuarios (id_usuario, correo, nombre_usuario, contrasena, foto_perfil) VALUES (?, ?, ?, ?, ?)',
      [id_usuario, correo, nombre_usuario, contrasena, fotoUrl]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error al registrar usuario:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// 🔐 POST /api/usuarios/login
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.json({ success: true, usuario: rows[0] });
  } catch (err) {
    console.error('❌ Error al iniciar sesión:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

export default router;
