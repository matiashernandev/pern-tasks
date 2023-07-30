import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Card, Input, Label, Textarea } from "../components/ui"
import { useTasks } from "../context/TaskContext"

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const { createTask } = useTasks()

  const [postError, setPostError] = useState([])

  const onSubmit = handleSubmit(async (data) => {
    const task = await createTask(data)
    if (task) {
      navigate("/tasks")
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
