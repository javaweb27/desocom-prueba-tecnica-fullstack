import express from "express";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));

export default app;
