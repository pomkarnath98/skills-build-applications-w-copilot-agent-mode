import { useApiCollection } from '../hooks/useApiCollection.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
]

export default function Users() {
  const { records, error, loading } = useApiCollection('/api/users/', fetch)

  return (
    <section aria-labelledby="users-title">
      <div className="page-heading">
        <p className="eyebrow">Your fitness community</p>
        <h1 id="users-title">Athletes</h1>
        <p className="page-description">Meet the people making progress together.</p>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {loading ? (
        <p role="status">Loading athletes…</p>
      ) : (
        <ResourceTable columns={columns} records={records} />
      )}
    </section>
  )
}
