import { Router } from "express";
import LoanController from "../controllers/LoanController";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();
router.post("/simulate", authMiddleware, LoanController.Simulate);
router.post("/apply", authMiddleware, LoanController.Apply);
router.get("/all", authMiddleware, LoanController.All);

export default router;
