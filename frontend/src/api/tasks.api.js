import axios from "./axios"

export const createTaskRequest = (task) => axios.post("/tasks", task)

export const getAllTasksRequest = () => axios.get("/tasks")

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)

export const getTaskResquest = (id) => axios.get(`/tasks/${id}`)
