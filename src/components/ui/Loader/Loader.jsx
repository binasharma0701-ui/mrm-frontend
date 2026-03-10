import './Loader.css'

export default function Loader({ size = 'md', variant = 'primary' }) {
  return (
    <div className={`loader loader-${size} loader-${variant}`}></div>
  )
}
