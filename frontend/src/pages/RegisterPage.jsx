import { Button, Card, Input } from "../components/ui"
import { useForm } from "react-hook-form"

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    //console.log(data)
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": true,
      },
    })

    const dataSignup = await response.json()
    console.log(dataSignup)
  })

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3>Register</h3>
        <form onSubmit={onSubmit}>
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter your fullname"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          <Input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <Button>Register</Button>
        </form>
      </Card>
    </div>
  )
}
export default RegisterPage
