import "dotenv/config"
import { app } from "./infra/server";
import '@/infra/queue/consumers'
import { env } from "./infra/env";

app.listen(env.PORT, () => {
  console.log("🛼  Server is running")
})
