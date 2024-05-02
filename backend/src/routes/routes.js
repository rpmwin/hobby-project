import { Router } from "express";
import signup from "../controllers/signup.controllers.js";
import { login } from "../controllers/login.controllers.js";
import retailerLogin from "../controllers/retailerlogin.controller.js";
import retailerSignup from "../controllers/retailerSignup.controllers.js";
import addCrop from "../controllers/addcrop.controllers.js";
import { getUser } from "../controllers/getUser.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("server is up and running");
});

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/retailer-login").post(retailerLogin);
router.route("/retailer-signup").post(retailerSignup);
router.route("/add-crop").post(addCrop);
router.route("/get-user").get(getUser);

export default router;
