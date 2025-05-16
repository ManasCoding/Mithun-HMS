import Admin from "../models/AdminModel.js";
import Appointment from "../models/AppointmentModel.js";
import Doctor from "../models/DoctorModel.js";
import OTP from "../models/OTPModel.js";
import Outbreak from "../models/OutbreakModel.js";
import Patient from "../models/PatientModel.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getAdDashboardDetails = async (req, res) => {
  try {
    return res.status(200).send({
      user: "Admin",
      message: "testing req/res cycle successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      user: "Admin",
      message: "Error in req/res cycle testing...",
    });
  }
};

export const addDoctor = async (req, res) => {
  try {
    const admin_id = req.user.admin_id;
    const {
      username,
      email,
      password,
      phone,
      address,
      gender,
      role,
      profilePicture,
    } = req.body;

    const registeredAdmin = await Admin.findOne({ _id: admin_id });
    if (!registeredAdmin) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const isRegisteredDoc = await Doctor.findOne({ email: req.body.email });
    const isRegisteredUser = await User.findOne({ email: req.body.email });
    if (isRegisteredDoc || isRegisteredUser) {
      return res
        .status(400)
        .send({ message: "Email already registered. Try with new one.." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      username,
      email,
      usertype: "D",
      password: hashedPassword,
      phone,
      address,
      gender,
      role,
      profilePicture,
      isVerified: true,
    });
    const doctor = await new Doctor({
      username,
      email,
      usertype: "D",
      password: hashedPassword,
      phone,
      address,
      gender,
      role,
      profilePicture,
      isVerified: true,
    });

    if (!user || !doctor) {
      throw new Error("Error in creating user in database...");
    } else {
      await user.save();
      await doctor.save();
      return res
        .status(201)
        .send({ message: "Doctor created successfully..." });
    }
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { user_id, admin_id } = req.user;
    if (!user_id || !admin_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedAdmin = await Admin.findOne({ _id: admin_id });

    if (!storedUser || !storedAdmin) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const allDoctors = await Doctor.find({}).select(
      "_id username email role gender phone"
    );

    return res
      .status(200)
      .send({ message: "All Doctors found...", doctors: allDoctors });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const removeDoctors = async (req, res) => {
  try {
    const { user_id, admin_id } = req.user;
    const { id: doctor_id } = req.params;

    if (!user_id || !admin_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    if (!doctor_id) {
      return res.status(404).send({ messaeg: "Doctors id is required..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedAdmin = await Admin.findOne({ _id: admin_id });
    const storedDoctor = await Doctor.findOne({ _id: doctor_id });

    if (!storedUser || !storedAdmin) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    if (!storedDoctor) {
      return res
        .status(400)
        .send({ message: "Doctor with this doctor_id not found..." });
    }

    await User.deleteOne({ email: storedDoctor.email });
    await Doctor.deleteOne({ _id: doctor_id });

    return res.status(200).send({ message: "Doctor deletion successfull..." });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const addOutbreak = async (req, res) => {
  try {
    const { obname, obcomments, oblocation, obmeasures } = req.body;
    const { user_id } = req.user;
    const storedUser = await User.findOne({ _id: user_id });
    if (!storedUser) {
      return res
        .status(403)
        .send({ message: "You're unauthorized for this action..." });
    }

    if (req.user.usertype == "A") {
      const outbreak = new Outbreak({
        obname,
        obcomments,
        oblocation,
        obmeasures,
      });

      outbreak.save();
      return res
        .status(201)
        .send({ message: "Outbreak added successfully!!!" });
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

export const getOutbreaks = async (req, res) => {
  try {
    const { user_id, admin_id } = req.user;
    if (!user_id || !admin_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedAdmin = await Admin.findOne({ _id: admin_id });

    if (!storedUser || !storedAdmin) {
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

    if (req.user.usertype == "A") {
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

export const deleteOutbreak = async (req, res) => {
  try {
    const { user_id, admin_id } = req.user;
    const { id } = req.params;

    if (!user_id || !admin_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    if (!id) {
      return res.status(404).send({ messaeg: "Outbreak id is required..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedAdmin = await Admin.findOne({ _id: admin_id });
    const storedOutbreak = await Outbreak.findOne({ _id: id });

    if (!storedUser || !storedAdmin) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    if (!storedOutbreak) {
      return res
        .status(400)
        .send({ message: "Outbreak with this outbreak_id not found..." });
    }

    await Outbreak.deleteOne({ _id: id });

    return res
      .status(200)
      .send({ message: "Outbreak deletion successfull..." });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const getPatientsRecord = async (req, res) => {
  try {
    const { user_id, admin_id } = req.user;
    if (!user_id || !admin_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedAdmin = await Admin.findOne({ _id: admin_id });

    if (!storedUser || !storedAdmin) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const allPatients = await Patient.find({});

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
    const { user_id, admin_id } = req.user;
    const { id: patient_id } = req.params;
    if (!patient_id) {
      return res.status(404).send({ message: "Patient ID is required..." });
    }
    if (!user_id || !admin_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedAdmin = await Admin.findOne({ _id: admin_id });

    if (!storedUser || !storedAdmin) {
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
    const { user_id, admin_id } = req.user;
    if (!user_id || !admin_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedAdmin = await Admin.findOne({ _id: admin_id });

    if (!storedUser || !storedAdmin) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const allAppts = await Appointment.find({}).populate(
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
    const { user_id, admin_id } = req.user;
    const { id: appt_id } = req.params;
    if (!appt_id) {
      return res.status(404).send({ message: "Appointment ID is required..." });
    }
    if (!user_id || !admin_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedAdmin = await Admin.findOne({ _id: admin_id });

    if (!storedUser || !storedAdmin) {
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
