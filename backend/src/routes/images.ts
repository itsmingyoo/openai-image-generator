import { Router } from "express";
import { generate } from "../controllers/images";

export default (router: Router) => {
  // include all req methods here and import their respective controller func, wire this router to index.ts
  router.post("/generate", generate);
};
