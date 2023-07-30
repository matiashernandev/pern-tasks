import axios from "../api/axios"

export const createTaskRequest = (task) => axios.post("/tasks", task)
