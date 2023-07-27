import { Link } from "react-router-dom"
import { Card } from "../components/ui"

function NotFound() {
  return (
    <div className="h-[calc(100vh-64px)] bg-slate-100 flex justify-center items-center">
      <Card>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold my-2">Page not found :(</h1>
          <h3 className="text-2xl">404</h3>
          <Link to="/">Go back to home</Link>
        </div>
      </Card>
    </div>
  )
}
export default NotFound
