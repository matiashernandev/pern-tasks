import pg from "pg"

export const pool = new pg.Pool({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "admin",
  database: "tasksdb",
})

pool.on("connect", () => {
  console.log("Conectado a pesar de todo")
})
