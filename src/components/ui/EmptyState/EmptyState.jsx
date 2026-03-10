import './EmptyState.css'

export default function EmptyState({
  icon = '📦',
  title = 'Nothing here',
  description = 'No items to display',
  action = null,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  )
}
