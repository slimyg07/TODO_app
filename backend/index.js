import express from "express";
import cors from 'cors';
import { PORT } from "./config/env.js";
import connectDB from "./config/mongoDB.js";

const app = express();
// const PORT = process.env.PORT || 3000

// Middleware
app.use(cors());


// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



// Start server
app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});