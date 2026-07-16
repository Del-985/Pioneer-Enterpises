import { Router } from "express";

import {
  submitQuote,
  submitServiceRequest
} from "../controllers/public.controller.js";

const router = Router();

router.post("/quotes", submitQuote);
router.post("/service-requests", submitServiceRequest);

export default router;
