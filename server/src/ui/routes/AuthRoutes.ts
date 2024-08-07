import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();
router.get("/signup", AuthController.SignUp);
router.get("/signin", AuthController.SignIn);

export default router;
