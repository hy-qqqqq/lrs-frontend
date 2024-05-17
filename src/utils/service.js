import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
  timeout: 1000,
});

// Get orders
export const getOrders = async () => {
  try {
    const res = await instance.get(`/api/orders`)
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(`GET /api/orders ERROR: ${error}`)
  }
}

// Add order
export const addOrders = async (formData) => {
  try {
    const res = await instance.post(
      `/api/orders`,
      formData,
      { // config
        headers: {'Content-Type': 'multipart/form-data'}
      }
    )
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(`POST /api/orders ERROR: ${error}`)
  }
}

// Delete order
export const delOrders = async (id) => {
  console.log(id)
  try {
    const res = await instance.delete(`/api/orders/${id}`)
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(`DELETE /api/orders ERROR: ${error}`)
  }
}

// Approve order
export const approveOrders = async (id, action) => {
  const data = {"action": action}
  const conf = {headers: {'Content-Type': 'application/json'}}
  try {
    const res = await instance.post(`/api/approve_order/${id}`, data, conf)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`DELETE /api/orders ERROR: ${err}`)
  }
}

// Complete order
export const completeOrders = async (id) => {
  try {
    const res = await instance.post(`/api/complete_order/${id}`)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(`DELETE /api/orders ERROR: ${err}`)
  }
}