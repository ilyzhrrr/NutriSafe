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

  const res = await fetch(BASE_URL + path, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Terjadi kesalahan server')
  return data
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
