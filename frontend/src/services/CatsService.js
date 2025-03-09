import api from '../api';

// Obtener todos los gatos
export const getAllCats = async () => {
  try {
    const response = await api.get('/cats');
    return response.data;
  } catch (error) {
    console.error('Error al obtener gatos:', error);
    throw error;
  }
};

// Agregar un nuevo gato
export const addCat = async (catData) => {
  try {
    const response = await api.post('/cats', catData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar gato:', error);
    throw error;
  }
};

// Eliminar un gato
export const deleteCat = async (id) => {
  try {
    await api.delete(`/cats/${id}`);
  } catch (error) {
    console.error('Error al eliminar gato:', error);
    throw error;
  }
};

// Editar un gato
export const updateCat = async (id, catData) => {
  try {
    const response = await api.put(`/cats/${id}`, catData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar gato:', error);
    throw error;
  }
};
