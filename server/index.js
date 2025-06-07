import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDb from "./utils/db.js";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/expenses", expenseRouter);

app.listen(port, () => {
    connectToDb();
    console.log(`Server started on port ${port}`);
});
