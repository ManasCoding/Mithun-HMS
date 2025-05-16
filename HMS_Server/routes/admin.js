import { Router } from "express";
import {
  addDoctor,
  addOutbreak,
  deleteOutbreak,
  getApptDetails,
  getApptsRecord,
  getDoctors,
  getOutbreaks,
  getPatientDetails,
  getPatientsRecord,
  removeDoctors,
  updateOutbreak,
  //   getAdDashboardDetails,
} from "../controllers/admin_controller.js";
import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";
import { registeredUserOtpVerification } from "../controllers/user_controller.js";

const router = Router();

// router.route("/dashboard").get(getAdDashboardDetails);
router
  .route("/register/otp/verify")
  .post(middleware.auth, authorizeRoles("A"), registeredUserOtpVerification);

router
  .route("/add/doctor/:id")
  .post(middleware.auth, authorizeRoles("A"), addDoctor);

router
  .route("/get/doctors")
  .get(middleware.auth, authorizeRoles("A"), getDoctors);

router
  .route("/delete/doctor/:id")
  .delete(middleware.auth, authorizeRoles("A"), removeDoctors);

router
  .route("/add/outbreak")
  .post(middleware.auth, authorizeRoles("A"), addOutbreak);

router
  .route("/get/outbreaks")
  .get(middleware.auth, authorizeRoles("A"), getOutbreaks);

router
  .route("/update/outbreak")
  .put(middleware.auth, authorizeRoles("A"), updateOutbreak);

router
  .route("/delete/outbreak/:id")
  .delete(middleware.auth, authorizeRoles("A"), deleteOutbreak);

router
  .route("/get/patients")
  .get(middleware.auth, authorizeRoles("A"), getPatientsRecord);

router
  .route("/get/patient/details/:id")
  .get(middleware.auth, authorizeRoles("A"), getPatientDetails);

router
  .route("/get/appointments")
  .get(middleware.auth, authorizeRoles("A"), getApptsRecord);

router
  .route("/get/appointment/details/:id")
  .get(middleware.auth, authorizeRoles("A"), getApptDetails);

export default router;
