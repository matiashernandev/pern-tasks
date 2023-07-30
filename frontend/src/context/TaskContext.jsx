import { createContext, useContext, useState } from "react"
import {
  createTaskRequest,
  deleteTaskRequest,
  getAllTasksRequest,
  getTaskResquest,
} from "../api/tasks.api"

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [errors, setErrors] = useState([])

  const loadTasks = async () => {
    const res = await getAllTasksRequest()
    setTasks(res.data)
  }

  const loadTask = async (id) => {
    const res = await getTaskResquest(id)
    return res.data
  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task)
      // console.log(res)

      setTasks([...tasks, res.data])
      return res.data
    } catch (error) {
      console.log("eeeeeerrrr", error)
      setErrors([error.response.data.message])
    }
  }

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id)

    if (res.status === 204) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, loadTasks, deleteTask, createTask, loadTask, errors }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error("usaTasks debe estar dentro del proveedor TaskProvider")
  }

  return context
}
