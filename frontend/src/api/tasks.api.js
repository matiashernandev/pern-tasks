import axios from "./axios"

export const createTaskRequest = (task) => axios.post("/tasks", task)

export const getAllTasksRequest = () => axios.get("/tasks")
