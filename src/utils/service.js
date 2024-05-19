import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
  timeout: 1000,
});

const setAuthHeader = () => {
  const token = sessionStorage.getItem('token')
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

// Get orders
export const getOrders = async () => {
  setAuthHeader()
  try {
    const res = await instance.get(`/api/orders`)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`ERROR getOrders: ${err}`)
  }
}

// Add order
export const addOrder = async (formData) => {
  setAuthHeader()
  const conf = {headers: {'Content-Type': 'multipart/form-data'}}
  try {
    const res = await instance.post(`/api/orders`, formData, conf)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`ERROR addOrder: ${err}`)
  }
}

// Delete order
export const delOrder = async (id) => {
  setAuthHeader()
  try {
    const res = await instance.delete(`/api/orders/${id}`)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`ERROR delOrder: ${err}`)
  }
}

// Approve order
export const approveOrder = async (id, action) => {
  setAuthHeader()
  const data = {"action": action}
  const conf = {headers: {'Content-Type': 'application/json'}}
  try {
    const res = await instance.post(`/api/approve_order/${id}`, data, conf)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`ERROR approveOrder: ${err}`)
  }
}

// Complete order
export const completeOrder = async (id) => {
  setAuthHeader()
  try {
    const res = await instance.post(`/api/complete_order/${id}`)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`ERROR completeOrder: ${err}`)
  }
}

// Adjust order priority
export const updateOrder = async (id, priority) => {
  setAuthHeader()
  const data = {"priority": priority}
  const conf = {headers: {'Content-Type': 'application/json'}}
  try {
    const res = await instance.put(`/api/orders/${id}`, data, conf)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`ERROR updateOrder: ${err}`)
  }
}

// Download file
export const downloadFile = async (filePath) => {
  setAuthHeader()
  const data = {"filePath": filePath}
  const conf = {headers: {
    'Content-Type': 'application/json',
    'responseType': 'blob'
  }}
  try {
    const res = await instance.post(`/api/download`, data, conf)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`ERROR downloadFile: ${err}`)
  }
}
