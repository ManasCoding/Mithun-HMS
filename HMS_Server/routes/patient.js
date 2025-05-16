import { Router } from "express";
import {
  getApptDetails,
  getApptsRecord,
  getPatDashboardDetails,
} from "../controllers/patient_controller.js";



import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";

const router = Router();

router.route("/dashboard").get(getPatDashboardDetails);

router
  .route("/get/appointments")
  .get(middleware.auth, authorizeRoles("P"), getApptsRecord);

router
  .route("/get/appointment/details/:id")
  .get(middleware.auth, authorizeRoles("P"), getApptDetails);

export default router;
