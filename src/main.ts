import "dotenv/config"
import { env } from "./infra/env";
import { app } from "./infra/server";
import '@/infra/queue/consumers'

app.listen(env.PORT, () => {
  console.log("🛼  Server is running")
})
