const BASE_URL = '/api'

export const getToken = () => localStorage.getItem('ns_token')
export const getRole = () => localStorage.getItem('ns_role')

export const saveAuth = (token, role) => {
  localStorage.setItem('ns_token', token)
  localStorage.setItem('ns_role', role)
}

export const clearAuth = () => {
  localStorage.removeItem('ns_token')
  localStorage.removeItem('ns_role')
}

const req = async (method, path, body, isForm) => {
  const headers = {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isForm && body) headers['Content-Type'] = 'application/json'

  let res
  try {
    res = await fetch(BASE_URL + path, {
      method,
      headers,
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    })
  } catch {
    throw new Error('Tidak bisa terhubung ke server. Periksa koneksi internet atau coba lagi nanti.')
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    if (data?.message) throw new Error(data.message)
    if (res.status === 413) throw new Error('Ukuran file terlalu besar. Pastikan total file upload kurang dari 10 MB.')
    throw new Error(`Server bermasalah (HTTP ${res.status}). Coba lagi beberapa saat.`)
  }
  return data ?? {}
}

export const api = {
  get:      (path)        => req('GET',    path),
  post:     (path, body)  => req('POST',   path, body),
  put:      (path, body)  => req('PUT',    path, body),
  patch:    (path, body)  => req('PATCH',  path, body),
  del:      (path)        => req('DELETE', path),
  postForm: (path, form)  => req('POST',   path, form, true),
  putForm:  (path, form)  => req('PUT',    path, form, true),
}
