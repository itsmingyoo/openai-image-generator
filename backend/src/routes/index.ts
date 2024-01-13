// backend/src/routes/index.js
import express, { Request, Response, Router } from "express";
import images from "./images";

const router = Router();

// Use the API router
export default (): Router => {
  // wire all routers to single router to be used in app.ts
  images(router);

  return router;
};
