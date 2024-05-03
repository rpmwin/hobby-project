import { Router } from "express";
import signup from "../controllers/signup.controllers.js";
import { login } from "../controllers/login.controllers.js";
import retailerLogin from "../controllers/retailerlogin.controller.js";
import retailerSignup from "../controllers/retailerSignup.controllers.js";
import addCrop from "../controllers/addcrop.controllers.js";
import { getUser } from "../controllers/getUser.controllers.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Import the JWT authentication middleware


const router = Router();

router.get("/", (req, res) => {
    res.send("server is up and running");
});

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/retailer-login", retailerLogin);
router.post("/retailer-signup", retailerSignup);

// Protected routes - Apply JWT authentication middleware
router.use(authMiddleware);
router.post("/add-crop", addCrop);
router.get("/get-user", getUser);

export default router;
