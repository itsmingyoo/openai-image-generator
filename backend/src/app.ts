//backend/src/app.ts -- look at the end for example of what this file structure should look like since we also have index.ts in the backend/src root folder

// Imports
import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import { CustomError } from "./utils/CustomError";
import { environment } from "./config";

// Instantiate app from express
const app = express();

// Check the environment
const isProduction = environment === "production";

// Security Middleware
if (!isProduction) {
  app.use(cors());
}

// Middleware to parse JSON bodies
app.use(express.json());

// Test Routes - Only work before app.use(routes())
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Test route is working!");
});

// Connect all the routes - Routes needs to be invoked because of src/routes/index.ts exports a function of all the routes
app.use(routes());

// Error handlers should be after all other middleware and routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError("The requested resource couldn't be found.", 404);
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "An unknown error occurred";
  console.error(err);
  res.status(status).json({
    title: "Server Error",
    message: message,
    errors: { general: message },
    stack: isProduction ? null : err.stack,
  });
});

export default app;

// import express from 'express';
// ... other imports ...

// const app = express();

// Middleware setup
// app.use(express.json());
// ... other middleware ...

// Routes setup
// app.use('/api', apiRoutes);
// ... other routes ...

// Error handling
// ... error handlers ...

// export default app;

// app.ts defines the application (middlewares, routes, etc.) but doesn't start the server.

// index.ts imports the application from app.ts and starts the server.
