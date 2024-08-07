import { Router } from "express";
import authMiddleware from "../middleware/AuthMiddleware";
import InstallmentController from "../controllers/InstallmentController";

const router = Router();
router.get("/:id", authMiddleware, InstallmentController.Get);

export default router;
