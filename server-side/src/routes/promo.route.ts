import { Router } from "express";
import {
  admin_authenticate,
  role_authenticate,
  both_authenticate,
} from "../middlewares/custom_authenticate_token";
import { createPromoCode } from "../controllers/promo.controller";
const router = Router();

router.post(
  "/create",
  admin_authenticate,
  role_authenticate(["finance", "admin"]),
  createPromoCode
);
router.get("/fetch", both_authenticate);

export default router;
