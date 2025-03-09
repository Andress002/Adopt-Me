import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const obtenerMascotas = () => api.get('/pets');
export const crearMascota = (mascota) => api.post('/pets', mascota);
export const eliminarMascota = (id) => api.delete(`/pets/${id}`);
