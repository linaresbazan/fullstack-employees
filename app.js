import express from "express";
import employeeRouter from "#api/employees";

const app = express();
export default app;

// ### Pre-routing middleware

// Parse JSON request bodies
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// ### Routing middleware
app.get('/', (req, res) => {
  return res.status(200).send("Welcome to the Fullstack Employees API.");
})

app.use('/employees', employeeRouter);


// ### Error-handling middleware
// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});