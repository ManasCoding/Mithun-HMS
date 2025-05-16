import { Router } from "express";
import {
  changeLoggedOutUserPassword,
  getUserDetails,
  loggedOutUserOtpVerification,
  loginUser,
  registerUser,
  searchUsername,
  updateLoggedInUserPassword,
  updateUserDetails,
} from "../controllers/user_controller.js";



import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";

const router = Router();
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router
  .route("/details/:id")
  .get(middleware.auth, authorizeRoles("A", "D", "P"), getUserDetails);

router
  .route("/profile/update/:id")
  .put(middleware.auth, authorizeRoles("A", "D", "P"), updateUserDetails);

router.route("/search/username").post(searchUsername);

router
  .route("/otp/verification")
  .post(
    middleware.auth,
    authorizeRoles("A", "D", "P"),
    loggedOutUserOtpVerification
  );

router
  .route("/update/password/:id")
  .patch(
    middleware.auth,
    authorizeRoles("A", "D", "P"),
    updateLoggedInUserPassword
  );

router
  .route("/change/password")
  .patch(
    middleware.auth,
    authorizeRoles("A", "D", "P"),
    changeLoggedOutUserPassword
  );

export default router;
