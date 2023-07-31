import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, Input, Label, Textarea } from "../components/ui"
import { useTasks } from "../context/TaskContext"

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const { createTask, loadTask, errors: tasksErrors, updateTask } = useTasks()
  const params = useParams()

  const onSubmit = handleSubmit(async (data) => {
    let task

    if (!params.id) {
      task = await createTask(data)
    } else {
      task = await updateTask(params.id, data)
    }
    if (task) {
      navigate("/tasks")
    }
  })

  useEffect(() => {
    if (params.id) {
      loadTask(params.id).then((task) => {
        setValue("title", task.title)
        setValue("description", task.description)
      })
    }
  }, [])

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {tasksErrors.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}

        <h2 className="text-3xl font-bold my-4">
          {params.id ? "Edit Task" : "Create Task"}
        </h2>
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

          <Button>{params.id ? "Editar Task" : "Crear Task"}</Button>
        </form>
      </Card>
    </div>
  )
}
export default TaskFormPage
