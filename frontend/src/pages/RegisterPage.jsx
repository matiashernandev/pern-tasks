import { Button, Card, Input, Label } from "../components/ui"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Link } from "react-router-dom"

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("http://localhost:3000/api/signup", data, {
      withCredentials: true,
    })

    console.log(res)
  })

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-4xl font-bold my-2 text-center">Register</h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter your fullname"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <Button>Register</Button>
          <div className="flex justify-between my-4">
            <p>Already have an account?</p>
            <Link className="font-bold" to="/login">
              Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
export default RegisterPage
