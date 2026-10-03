import { useApiCollection } from '../hooks/useApiCollection.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'description', label: 'Description' },
]

export default function Workouts() {
  const { records, error, loading } = useApiCollection('/api/workouts/', fetch)

  return (
    <section aria-labelledby="workouts-title">
      <div className="page-heading">
        <p className="eyebrow">Find your next challenge</p>
        <h1 id="workouts-title">Workouts</h1>
        <p className="page-description">Pick a session that matches your energy and goals.</p>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {loading ? (
        <p role="status">Loading workouts…</p>
      ) : (
        <ResourceTable columns={columns} records={records} />
      )}
    </section>
  )
}
