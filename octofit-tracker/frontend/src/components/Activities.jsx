import { useApiCollection } from '../hooks/useApiCollection.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'activityType', label: 'Activity' },
  { key: 'user', label: 'User' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'date', label: 'Date' },
  { key: 'points', label: 'Points' },
]

export default function Activities() {
  const { records, error, loading } = useApiCollection('/api/activities/', fetch)

  return (
    <section aria-labelledby="activities-title">
      <div className="page-heading">
        <p className="eyebrow">Move a little, achieve a lot</p>
        <h1 id="activities-title">Activities</h1>
        <p className="page-description">Recent workouts and the effort behind every point.</p>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {loading ? (
        <p role="status">Loading activities…</p>
      ) : (
        <ResourceTable columns={columns} records={records} />
      )}
    </section>
  )
}
