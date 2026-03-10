import './Toast.css'

export default function Toast({
  message,
  type = 'info',
  onClose,
  autoClose = true,
  duration = 3000,
}) {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">✕</button>
    </div>
  )
}
