// backend/src/index.ts
//! Separation of Concerns: Keeping the server initialization (index.ts) separate from the application logic (app.ts) makes your code cleaner and more modular.

import { Request, Response } from "express";
import app from "./app";
require("dotenv").config({ path: "../.env" });
//!! only need to step back ONCE even though index.ts should step back twice. This is because you start your project starting in the backend folder, not the src/index.ts (this is only the entry point for the application)
//!! Also, because this is the entry point to our application, we should load the .env file here immediately

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
