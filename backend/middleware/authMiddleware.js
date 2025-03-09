const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no se encontro token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'No autorizado, token inválido' });
  }
};

const admin = (req, res, next) => 
  req.user?.role === 'admin' 
    ? next()
    : res.status(403).json({ message: 'No autorizado, requiere rol de administrador' });

module.exports = { protect, admin };