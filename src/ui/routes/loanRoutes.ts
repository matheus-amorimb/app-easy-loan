import { Router } from "express";
import LoanController from "../controllers/loanController";

const router = Router();
router.post("/simulate", LoanController.Simulate);
router.post("/apply", LoanController.Apply);
router.get("/all", LoanController.All);

export default router;
