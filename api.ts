import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000', // Cambiar en producción
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para manejar errores
    this.api.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response?.status === 401) {
          // Token expirado o inválido
          this.clearAuthToken();
        }
        return Promise.reject(error.response?.data || error.message);
      },
    );
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  clearAuthToken() {
    delete this.api.defaults.headers.common['Authorization'];
  }

  async get(endpoint: string, config?: AxiosRequestConfig) {
    return this.api.get(endpoint, config);
  }

  async post(endpoint: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.post(endpoint, data, config);
  }

  async put(endpoint: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.put(endpoint, data, config);
  }

  async delete(endpoint: string, config?: AxiosRequestConfig) {
    return this.api.delete(endpoint, config);
  }

  // Método para subir archivos
  async upload(endpoint: string, formData: FormData, config?: AxiosRequestConfig) {
    return this.api.post(endpoint, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
  }
}

export const apiService = new APIService();
