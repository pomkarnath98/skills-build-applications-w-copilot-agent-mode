import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api.js'

export function useApiCollection(endpoint, fetcher = fetch) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        const response = await fetcher(`${apiBaseUrl}${endpoint}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setRecords(normalizeCollection(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          console.error(`Failed to load ${endpoint}:`, requestError)
          setError('Could not load this data. Check the API connection and try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void loadRecords()
    return () => controller.abort()
  }, [endpoint, fetcher])

  return { records, error, loading }
}
