import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute({ redirectTo, isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }

  return children ? children : <Outlet />
}
