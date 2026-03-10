export default function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return (
      <div className="protected-route-error">
        <h1>Access Denied</h1>
        <p>You need to be logged in to access this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    )
  }

  return children
}
