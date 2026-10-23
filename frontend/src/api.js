const tokenKey = 'sustune_token'
export const getToken = () => localStorage.getItem(tokenKey)
export const setToken = (t) => (t ? localStorage.setItem(tokenKey, t) : localStorage.removeItem(tokenKey))

async function req(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  const t = getToken()
  if (t) headers.Authorization = `Bearer ${t}`
  const res = await fetch(`/api${path}`, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(typeof err.detail === 'string' ? err.detail : 'Request failed')
  }
  return res.json()
}
export const api = {
  quote: (body) => req('/quote', { method: 'POST', body }),
  createLead: (body) => req('/leads', { method: 'POST', body }),
  login: (body) => req('/auth/login', { method: 'POST', body }),
  me: () => req('/auth/me'),
  portalMe: () => req('/portal/me'),
  portalDemo: () => req('/portal/demo'),
  leads: () => req('/admin/leads'),
  setLeadStatus: (id, status) => req(`/admin/leads/${id}`, { method: 'PATCH', body: { status } }),
}
