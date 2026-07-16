import type { NextFunction, Request, Response } from "express";

import {
  quoteSchema,
  serviceRequestSchema
} from "../schemas/public.js";
import { createPublicQuote } from "../services/quote.service.js";
import { createPublicServiceRequest } from "../services/service-request.service.js";

export async function submitQuote(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const input = quoteSchema.parse(request.body);
    const quote = await createPublicQuote(input);
    response.status(201).json({ quote });
  } catch (error) {
    next(error);
  }
}

export async function submitServiceRequest(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const input = serviceRequestSchema.parse(request.body);
    const serviceRequest = await createPublicServiceRequest(input);
    response.status(201).json({ serviceRequest });
  } catch (error) {
    next(error);
  }
}
