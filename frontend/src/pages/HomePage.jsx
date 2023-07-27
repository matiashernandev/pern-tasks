import { useAuth } from "../context/useAuth"

function HomePage() {
  const data = useAuth()
  console.log(data)

  return <div className="text-2xl font-bold">HomePage</div>
}
export default HomePage
