import { useApiCollection } from '../hooks/useApiCollection.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
]

export default function Teams() {
  const { records, error, loading } = useApiCollection('/api/teams/', fetch)

  return (
    <section aria-labelledby="teams-title">
      <div className="page-heading">
        <p className="eyebrow">Better together</p>
        <h1 id="teams-title">Teams</h1>
        <p className="page-description">Meet the crews cheering each other on.</p>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {loading ? (
        <p role="status">Loading teams…</p>
      ) : (
        <ResourceTable columns={columns} records={records} />
      )}
    </section>
  )
}
