const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const codespaceNameFromHost = window.location.hostname.match(
  /^(.+)-5173\.app\.github\.dev$/,
)?.[1]
const activeCodespaceName = codespaceName || codespaceNameFromHost

export const apiBaseUrl = activeCodespaceName
  ? `https://${activeCodespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  for (const key of ['results', 'items', 'data']) {
    const value = payload[key]
    if (Array.isArray(value)) {
      return value
    }
    if (value && typeof value === 'object' && Array.isArray(value.results)) {
      return value.results
    }
  }

  return []
}
