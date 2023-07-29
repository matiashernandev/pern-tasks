import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, Input, Label } from "../components/ui"
import { useAuth } from "../context/useAuth"

function LoginPage() {
  const { register, handleSubmit } = useForm()
  const { signin, errors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data)

    if (user) {
      navigate("/profile")
    }
  })

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center  ">
      <Card>
        {errors &&
          errors.map((err) => (
            <p className="bg-red-500 p-2 m-2 text-white text-center">{err}</p>
          ))}

        <h1 className="text-4xl font-bold my-2 text-center">Sign in</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          <Button>Sign in</Button>

          <div className="flex justify-between my-4">
            <p>Don&apos;t have an account?</p>
            <Link className="font-bold" to="/register">
              Register
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
export default LoginPage
