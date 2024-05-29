import mongoose from "mongoose";
import app from "./app";
// import { checkJwtValues } from "./checkJwtValues"
import { PORT } from "./config";
import { mongodbConnection } from "./mongodbConnection";
import taskModel from "./models/taskModel";
import { taskRoute } from "./routes/taskRoute";

// import { connectMongodb } from "./connectMongodb"
// import authRouter from "./folders/auth/authRouter"
// import ordersRouter from "./folders/orders/ordersRouter"
// import productsRouter from "./folders/products/productsRouter"
// import usersRouter from "./folders/users/usersRouter"

// checkJwtValues()

mongodbConnection();

app.listen(PORT, () => {
  console.log(`The app is running in http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  console.log("GET /");
  res.send("task app");
});

app.use("/api/tasks", taskRoute);
// app.use("/products", productsRouter)
// app.use("/users", usersRouter)
// app.use("/orders", ordersRouter)
