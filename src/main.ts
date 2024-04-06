import "dotenv/config"
import { app } from "./infra/server";
import '@/infra/queue/consumers'

app.listen(3333, () => {
  console.log("🛼  Server is running")
})
