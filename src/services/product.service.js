import api from './api'

const productService = {
  getAll: (params) => api.get('/products', { params: params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (params) => api.post('/products', params),
  update: (id, params) => api.put(`/products/${id}`, params),
  delete: (id) => api.delete(`/products/${id}`),
}

export default productService
