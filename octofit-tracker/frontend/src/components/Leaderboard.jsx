import { useApiCollection } from '../hooks/useApiCollection.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'user', label: 'Athlete' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
]

export default function Leaderboard() {
  const { records, error, loading } = useApiCollection('/api/leaderboard/', fetch)
  const rankedRecords = [...records].sort((first, second) => second.points - first.points)

  return (
    <section aria-labelledby="leaderboard-title">
      <div className="page-heading">
        <p className="eyebrow">Celebrate every milestone</p>
        <h1 id="leaderboard-title">Leaderboard</h1>
        <p className="page-description">See how your team is climbing the rankings.</p>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {loading ? (
        <p role="status">Loading leaderboard…</p>
      ) : (
        <ResourceTable columns={columns} records={rankedRecords} />
      )}
    </section>
  )
}
