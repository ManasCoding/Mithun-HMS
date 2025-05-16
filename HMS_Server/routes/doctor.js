import { Router } from "express";
import {
  addPatientAppointment,
  getApptDetails,
  getApptsRecord,
  getDocDashboardDetails,
  getOutbreaks,
  getPatientDetails,
  getPatientsRecord,
  updateOutbreak,
} from "../controllers/doctor_controller.js";
import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";
import { registeredUserOtpVerification } from "../controllers/user_controller.js";

const router = Router();

// router.route("/dashboard").get(getDocDashboardDetails);

router
  .route("/register/otp/verify")
  .post(middleware.auth, authorizeRoles("D"), registeredUserOtpVerification);

router
  .route("/get/outbreaks")
  .get(middleware.auth, authorizeRoles("D"), getOutbreaks);

router
  .route("/update/outbreak")
  .put(middleware.auth, authorizeRoles("D"), updateOutbreak);

router
  .route("/add/patient")
  .post(middleware.auth, authorizeRoles("D"), addPatientAppointment);

router
  .route("/get/patients")
  .get(middleware.auth, authorizeRoles("D"), getPatientsRecord);

router
  .route("/get/patient/details/:id")
  .get(middleware.auth, authorizeRoles("D"), getPatientDetails);

router
  .route("/get/appointments")
  .get(middleware.auth, authorizeRoles("D"), getApptsRecord);

router
  .route("/get/appointment/details/:id")
  .get(middleware.auth, authorizeRoles("D"), getApptDetails);

export default router;
