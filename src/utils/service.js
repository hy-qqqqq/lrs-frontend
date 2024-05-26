import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
  timeout: 20000,
});

const setAuthHeader = () => {
  const token = sessionStorage.getItem('token')
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

const clearSession = () => {
  sessionStorage.clear()
}

// Register
export const registerUser = async (data) => {
  const conf = {headers: {'Content-Type': 'application/json'}}
  try {
    const res = await instance.post(`/api/register`, data, conf)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.error : error
    return Promise.reject(err)
  }
}

// Login
export const loginUser = async (data) => {
  const conf = {headers: {'Content-Type': 'application/json'}}
  try {
    const res = await instance.post(`/api/login`, data, conf)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.message : error
    return Promise.reject(err)
  }
}

// Logout
export const logoutUser = async () => {
  setAuthHeader()
  try {
    const res = await instance.post(`/api/logout`)
    return Promise.resolve(res)
  } catch (error) {
    const err = error.response ? error.response.data.message : error
    return Promise.reject(err)
  }
}

// Get orders
export const getOrders = async () => {
  setAuthHeader()
  try {
    const res = await instance.get(`/api/orders`)
    return Promise.resolve(res)
  } catch (error) {
    if (error.response && error.response.status == 401) {
      clearSession()
      return Promise.reject(error.response.data.msg)
    }
    const err = error.response ? error.response.data.error : error
    return Promise.reject(err)
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
    if (error.response && error.response.status == 401) {
      clearSession()
      return Promise.reject(error.response.data.msg)
    }
    const err = error.response ? error.response.data.error : error
    return Promise.reject(err)
  }
}

// Delete order
export const delOrder = async (id) => {
  setAuthHeader()
  try {
    const res = await instance.delete(`/api/orders/${id}`)
    return Promise.resolve(res)
  } catch (error) {
    if (error.response && error.response.status == 401) {
      clearSession()
      return Promise.reject(error.response.data.msg)
    }
    const err = error.response ? error.response.data.error : error
    return Promise.reject(err)
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
    if (error.response && error.response.status == 401) {
      clearSession()
      return Promise.reject(error.response.data.msg)
    }
    const err = error.response ? error.response.data.error : error
    return Promise.reject(err)
  }
}

// Complete order
export const completeOrder = async (id) => {
  setAuthHeader()
  try {
    const res = await instance.post(`/api/complete_order/${id}`)
    return Promise.resolve(res)
  } catch (error) {
    if (error.response && error.response.status == 401) {
      clearSession()
      return Promise.reject(error.response.data.msg)
    }
    const err = error.response ? error.response.data.error : error
    return Promise.reject(err)
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
    if (error.response && error.response.status == 401) {
      clearSession()
      return Promise.reject(error.response.data.msg)
    }
    const err = error.response ? error.response.data.error : error
    return Promise.reject(err)
  }
}

// Download file
export const downloadFile = async (filePath) => {
  setAuthHeader()
  const data = {"filePath": filePath}
  const conf = {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob'
  }
  try {
    const res = await instance.post(`/api/download`, data, conf)
    return Promise.resolve(res)
  } catch (error) {
    if (error.response && error.response.status == 401) {
      clearSession()
      return Promise.reject(error.response.data.msg)
    }
    const err = error.response ? error.response.data.error : error
    return Promise.reject(err)
  }
}
