import { Router } from "express";

import {
  getCustomer,
  getQuote,
  getServiceRequest,
  listAssignees,
  listCustomers,
  listQuotes,
  listServiceRequests,
  updateQuote,
  updateServiceRequest
} from "../controllers/admin.controller.js";
import { authenticate, requireRole } from "../middleware/authenticate.js";

const router = Router();

router.use(authenticate, requireRole("ADMIN", "EMPLOYEE"));
router.get("/assignees", listAssignees);
router.get("/customers", listCustomers);
router.get("/customers/:id", getCustomer);
router.get("/quotes", listQuotes);
router.get("/quotes/:id", getQuote);
router.patch("/quotes/:id", updateQuote);
router.get("/service-requests", listServiceRequests);
router.get("/service-requests/:id", getServiceRequest);
router.patch("/service-requests/:id", updateServiceRequest);

export default router;
