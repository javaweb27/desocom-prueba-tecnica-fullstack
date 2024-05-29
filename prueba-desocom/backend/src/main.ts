import app from "./app";

import { PORT } from "./config";
import { mongodbConnection } from "./mongodbConnection";
import { taskRoute } from "./routes/taskRoute";
import { userRoute } from "./routes/userRoute";

mongodbConnection();

app.listen(PORT, () => {
  console.log(`The app is running in http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  console.log("GET /");
  res.send("task app");
});

app.use("/api/tasks", taskRoute);
app.use("/api/users", userRoute);
