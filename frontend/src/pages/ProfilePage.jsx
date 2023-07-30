import { useAuth } from "../context/useAuth"

function ProfilePage() {
  const { user } = useAuth()

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
export default ProfilePage
