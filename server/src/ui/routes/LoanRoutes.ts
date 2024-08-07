import { Router } from "express";
import LoanController from "../controllers/LoanController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();
router.post("/simulate", authMiddleware, LoanController.simulate);
router.post("/apply", authMiddleware, LoanController.apply);
router.get("/all", authMiddleware, LoanController.all);

export default router;
