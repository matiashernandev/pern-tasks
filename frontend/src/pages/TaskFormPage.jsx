import { useForm } from "react-hook-form"
import { Button, Card, Input, Label, Textarea } from "../components/ui"
import { createTaskRequest } from "../api/tasks.api"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const [postError, setPostError] = useState([])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await createTaskRequest(data)
      console.log(res)

      navigate("/tasks")
    } catch (error) {
      console.log(error)
      if (error.response) {
        setPostError([error.response.data.message])
      }
    }
  })

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {postError.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}

        <h2 className="text-3xl font-bold my-4">Create Task</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="title">Title</Label>
          <Input
            {...register("title", { required: true })}
            placeholder="Title"
            autoFocus
          />
          {errors.title && <p className="text-red-500">Título is required</p>}
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Description"
            rows={3}
          ></Textarea>

          <Button>Crear</Button>
        </form>
      </Card>
    </div>
  )
}
export default TaskFormPage
