import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"

import AboutPage from "./pages/AboutPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NotFound from "./pages/NotFound"
import ProfilePage from "./pages/ProfilePage"
import RegisterPage from "./pages/RegisterPage"
import TaskFormPage from "./pages/TaskFormPage"
import TasksPage from "./pages/TasksPage"
import { Container } from "./components/ui"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuth } from "./context/useAuth"

function App() {
  const { isAuth } = useAuth()

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Routes>
          <Route
            element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/tasks" />}
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
          >
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/new" element={<TaskFormPage />} />
            <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}
export default App
