import Appointment from "../models/AppointmentModel.js";
import Patient from "../models/PatientModel.js";
import User from "../models/UserModel.js";

export const getPatDashboardDetails = async (req, res) => {
  try {
    return res.status(200).send({
      user: "Patient",
      message: "testing req/res cycle successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      user: "Patient",
      message: "Error in req/res cycle testing...",
    });
  }
};

export const getApptsRecord = async (req, res) => {
  try {
    const { user_id, patient_id } = req.user;
    if (!user_id || !patient_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedPatient = await Patient.findOne({ _id: patient_id });

    if (!storedUser || !storedPatient) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const allAppts = await Appointment.find({ patient: patient_id }).populate(
      "doctor",
      "username role email"
    );

    if (!allAppts) {
      return res
        .status(404)
        .send({ message: "Error in finding all appointments..." });
    }

    return res
      .status(200)
      .send({ message: "All appointments found...", appointments: allAppts });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const getApptDetails = async (req, res) => {
  try {
    const { user_id, patient_id } = req.user;
    const { id: appt_id } = req.params;
    if (!appt_id) {
      return res.status(404).send({ message: "Appointment ID is required..." });
    }
    if (!user_id || !patient_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedPatient = await Patient.findOne({ _id: patient_id });

    if (!storedUser || !storedPatient) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedAppointment = await Appointment.findOne({
      _id: appt_id,
    }).populate("doctor", "username");
    if (!storedAppointment) {
      return res.status(404).send({ message: "Appointment not found..." });
    }

    return res.status(200).send({
      message: "Appointment details found successfully...",
      appt: storedAppointment,
    });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};
