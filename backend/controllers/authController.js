const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear y guardar un nuevo usuario
    const user = new User({ username, email, password, role: role || 'user' });
    await user.save();

    // Generar un token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, role: user.role });
  } catch (err) {
    console.error('Error en el registro:', err.message);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Inicio de sesión de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña encriptada
    if (!await user.matchPassword(password)) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err.message);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Exportar las funciones
module.exports = { register, login };
