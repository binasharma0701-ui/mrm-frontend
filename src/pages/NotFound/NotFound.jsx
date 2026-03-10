import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for doesn't exist.</p>
        <Link to="/">Go Back Home</Link>
      </div>
    </div>
  )
}
