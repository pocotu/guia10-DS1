// Clase base para servicios siguiendo el principio de inversión de dependencias (DIP)
// Define una interfaz común que pueden implementar todos los servicios
class BaseService {
  constructor(baseURL = 'http://localhost:3001/api') {
    this.baseURL = baseURL;
  }

  // Método genérico para realizar peticiones HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Service request error:', error);
      throw error;
    }
  }

  // Métodos CRUD genéricos que pueden ser sobrescritos
  async getAll(endpoint) {
    return this.request(endpoint);
  }

  async getById(endpoint, id) {
    return this.request(`${endpoint}/${id}`);
  }

  async create(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async update(endpoint, id, data) {
    return this.request(`${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint, id) {
    return this.request(`${endpoint}/${id}`, {
      method: 'DELETE'
    });
  }
}

export default BaseService;