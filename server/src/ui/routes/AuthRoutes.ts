import { Router } from "express";
import AuthController from "../controllers/AuthController";
import MiddlewareController from "../controllers/MiddlewareController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();
router.post("/signup", AuthController.SignUp);
router.get("/signin", AuthController.SignIn);
// router.get("/teste", authMiddleware, MiddlewareController.test);

export default router;
