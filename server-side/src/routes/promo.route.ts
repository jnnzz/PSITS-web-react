import { Router } from "express";
import {
  admin_authenticate,
  role_authenticate,
  both_authenticate,
} from "../middlewares/custom_authenticate_token";
import {
  createPromoCode,
  getAllPromoCode,
  deletePromo,
  verifyPromo,
  getPromoLog,
  updatePromoCode,
} from "../controllers/promo.controller";
const router = Router();

router.post(
  "/create",
  admin_authenticate,
  role_authenticate(["finance", "admin"]),
  createPromoCode
);
router.get("/fetch", both_authenticate, getAllPromoCode);
router.delete(
  "/delete/:id",
  admin_authenticate,
  role_authenticate(["admin", "finance"]),
  deletePromo
);
router.get("/verify/:promo_code/:merchId", both_authenticate, verifyPromo);
router.get("/log", admin_authenticate, getPromoLog);
router.post("/update", admin_authenticate, updatePromoCode);

export default router;
