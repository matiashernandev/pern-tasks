import { Link } from "react-router-dom"
import { Button, Card, Input, Label } from "../components/ui"
import { useForm } from "react-hook-form"

function LoginPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center  ">
      <Card>
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
            <p>Don't have an account?</p>
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
