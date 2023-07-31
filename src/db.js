import pg from "pg"
import { PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER } from "./config.js"

export const pool = new pg.Pool({
  port: PGPORT,
  host: PGHOST,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
})

pool.on("connect", () => {
  console.log("Conectado a bd")
})
