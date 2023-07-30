import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, Container, Input, Label } from "../components/ui"
import { useAuth } from "../context/useAuth"

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signin, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data)

    if (user) {
      navigate("/tasks")
    }
  })

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center  ">
      <Card>
        {loginErrors &&
          loginErrors.map((err, index) => (
            <p
              key={index}
              className="bg-red-500 p-2 m-2 text-white text-center"
            >
              {err}
            </p>
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

          {errors.email && <p className="text-red-500">Email es requerido</p>}

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <p className="text-red-500">Contraseña es requerida</p>
          )}
          <Button>Sign in</Button>

          <div className="flex justify-between my-4">
            <p className="mr-4">Don&apos;t have an account?</p>
            <Link className="font-bold" to="/register">
              Register
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  )
}
export default LoginPage
