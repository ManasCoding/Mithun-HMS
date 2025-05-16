import Appointment from "../models/AppointmentModel.js";
import Doctor from "../models/DoctorModel.js";
import OTP from "../models/OTPModel.js";
import Outbreak from "../models/OutbreakModel.js";
import Patient from "../models/PatientModel.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getDocDashboardDetails = async (req, res) => {
  try {
    return res.status(200).send({
      user: "Doctor",
      message: "testing req/res cycle successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      user: "Doctor",
      message: "Error in req/res cycle testing...",
    });
  }
};

export const getOutbreaks = async (req, res) => {
  try {
    const { user_id, doctor_id } = req.user;
    if (!user_id || !doctor_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedDoctor = await Doctor.findOne({ _id: doctor_id });

    if (!storedUser || !storedDoctor) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const allOutbreaks = await Outbreak.find({});

    return res
      .status(200)
      .send({ message: "All outbreaks found...", outbreaks: allOutbreaks });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const updateOutbreak = async (req, res) => {
  try {
    const { obid, obname, obcomments, oblocation, obmeasures } = req.body;
    const { user_id } = req.user;
    const storedUser = await User.findOne({ _id: user_id });
    if (!storedUser) {
      return res
        .status(403)
        .send({ message: "You're unauthorized for this action..." });
    }

    if (req.user.usertype == "D") {
      const updatedOutbreak = await Outbreak.findByIdAndUpdate(
        { _id: obid },
        { obname, obcomments, oblocation, obmeasures },
        { new: true }
      );
      return res
        .status(201)
        .send({ message: "Outbreak updated successfully!!!", updatedOutbreak });
    } else {
      return res
        .status(403)
        .send({ message: "You're unauthorized for this action..." });
    }
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const addPatientAppointment = async (req, res) => {
  try {
    const doctor_id = req.user.doctor_id;
    const {
      fullName,
      email,
      patientId,
      dob,
      age,
      gender,
      phone,
      address,
      diagnosis,
      prescription,
      condition,
      password,
    } = req.body;

    // Input validation to ensure that required fields are present
    if (!fullName) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    if (!patientId) {
      return res.status(400).json({ message: "PatientID is required." });
    }
    if (!gender) {
      return res.status(400).json({ message: "Gender is required." });
    }
    if (!address) {
      return res.status(400).json({ message: "Address is required." });
    }
    if (!phone) {
      return res.status(400).json({ message: "Contact no. is required." });
    }
    if (!dob) {
      return res.status(400).json({ message: "DOB is required." });
    }
    if (!age) {
      return res.status(400).json({ message: "Age is required." });
    }
    if (!diagnosis) {
      return res.status(400).json({ message: "Diagnosis is required." });
    }
    if (!prescription) {
      return res.status(400).json({ message: "Prescription is required." });
    }
    if (!condition) {
      return res.status(400).json({ message: "Condition is required." });
    }

    const registeredDoc = await Doctor.findOne({ _id: doctor_id });
    if (!registeredDoc) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const isRegisteredPatient = await Patient.findOne({ email: email });
    const isRegisteredUser = await User.findOne({ email: email });
    if (!isRegisteredPatient && !isRegisteredUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPatient = await Patient.create({
        username: fullName,
        email,
        patientId,
        usertype: "P",
        password: hashedPassword,
        dob,
        age,
        gender,
        phone,
        address,
      });
      const newUser = await User.create({
        username: fullName,
        email,
        patientId,
        usertype: "P",
        password: hashedPassword,
        isVerified: true,
        dob,
        age,
        gender,
        phone,
        address,
      });

      const newAppointment = await Appointment.create({
        appointmentNo: Number(patientId),
        doctor: registeredDoc._id,
        patient: newPatient._id,
        username: fullName,
        email,
        gender,
        phone,
        address,
        dob,
        age,
        diagnosis,
        prescription,
        condition,
        status: "completed",
      });

      return res.status(201).send({
        message: "Appointment created successfully...",
        newAppointment,
        patientCreation: true,
      });
    } else if (isRegisteredPatient && isRegisteredUser) {
      console.log(Number(patientId));
      const newAppointment = await Appointment.create({
        appointmentNo: Number(patientId),
        doctor: registeredDoc._id,
        patient: isRegisteredPatient._id,
        username: fullName,
        email,
        gender,
        phone,
        address,
        dob,
        age,
        diagnosis,
        prescription,
        condition,
        status: "completed",
      });

      return res.status(201).send({
        message: "Appointment created successfully...",
        newAppointment,
        patientCreation: false,
      });
    } else {
      return res
        .status(400)
        .send({ message: "Email already registered. Try with new one.." });
    }
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const getPatientsRecord = async (req, res) => {
  try {
    const { user_id, doctor_id } = req.user;
    if (!user_id || !doctor_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedDoctor = await Doctor.findOne({ _id: doctor_id });

    if (!storedUser || !storedDoctor) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    // Step 1: Find all appointments for the specific doctor
    const appointments = await Appointment.find({ doctor: doctor_id }).select(
      "patient"
    );

    // Step 2: Extract unique patient IDs
    const patientIds = [
      ...new Set(appointments.map((appt) => appt.patient.toString())),
    ];

    // Step 3: Query the Patient model for details on those unique IDs
    const allPatients = await Patient.find({ _id: { $in: patientIds } }).select(
      "-password"
    );

    if (!allPatients) {
      return res
        .status(404)
        .send({ message: "Error in finding all patients..." });
    }

    return res
      .status(200)
      .send({ message: "All patients found...", patients: allPatients });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const getPatientDetails = async (req, res) => {
  try {
    const { user_id, doctor_id } = req.user;
    const { id: patient_id } = req.params;
    if (!patient_id) {
      return res.status(404).send({ message: "Patient ID is required..." });
    }
    if (!user_id || !doctor_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedDoctor = await Doctor.findOne({ _id: doctor_id });

    if (!storedUser || !storedDoctor) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedPatient = await Patient.findOne({ _id: patient_id }).select(
      "-password"
    );
    if (!storedPatient) {
      return res.status(404).send({ message: "Patient not found..." });
    }

    const storedAppointments = await Appointment.find({
      email: storedPatient.email,
    });
    if (!storedAppointments) {
      return res
        .status(404)
        .send({ message: "Requested patient doesn't got any appointments..." });
    }

    return res.status(200).send({
      message: "Patient details found successfully...",
      patient: storedPatient,
      appointments: storedAppointments,
    });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const getApptsRecord = async (req, res) => {
  try {
    const { user_id, doctor_id } = req.user;
    if (!user_id || !doctor_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedDoctor = await Doctor.findOne({ _id: doctor_id });

    if (!storedUser || !storedDoctor) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const allAppts = await Appointment.find({ doctor: doctor_id }).populate(
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
    const { user_id, doctor_id } = req.user;
    const { id: appt_id } = req.params;
    if (!appt_id) {
      return res.status(404).send({ message: "Appointment ID is required..." });
    }
    if (!user_id || !doctor_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedDoctor = await Doctor.findOne({ _id: doctor_id });

    if (!storedUser || !storedDoctor) {
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
