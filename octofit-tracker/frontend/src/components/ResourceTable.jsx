function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ')
  }

  if (typeof value === 'object') {
    return value.name || value.username || value._id || JSON.stringify(value)
  }

  return String(value)
}

export default function ResourceTable({ columns, records }) {
  if (records.length === 0) {
    return <p className="empty-state">No records yet. Check back soon.</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record._id || record.id || index}>
              {columns.map((column) => (
                <td key={column.key}>{formatValue(record[column.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
