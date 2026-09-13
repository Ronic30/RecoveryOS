export async function safeFetchJson(res) {
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return await res.json()
  }

  const text = await res.text()
  if (res.status === 404) {
    throw new Error('API server endpoint not found (404). Ensure the backend server is running.')
  }
  
  throw new Error(`Server returned unexpected response (${res.status}): ${text.slice(0, 80)}`)
}
