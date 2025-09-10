import express from "express";
import cors from 'cors';
import { PORT } from "./config/env.js";
import connectDB from "./config/mongoDB.js";

import todoRouter from "./routes/todo.routes.js";
import authRouter from "./routes/auth.routes.js";


const app = express();
// const PORT = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', authRouter);
app.use('/api/todos', todoRouter);


// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



// Start server
app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});