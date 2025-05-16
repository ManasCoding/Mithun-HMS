import User from "../models/UserModel.js";
import OTP from "../models/OTPModel.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../configs/config.js";
import Doctor from "../models/DoctorModel.js";
import Admin from "../models/AdminModel.js";
import Patient from "../models/PatientModel.js";
import Outbreak from "../models/OutbreakModel.js";
import Appointments from "../models/AppointmentModel.js";

// POST: http://localhost:7001/api/user/register
// @param: {
//   "name": "Subham Pradhan",
//   "email": "abc@gmail.com",
//   "password": "Admin@123",
//   "usertype": "A"
// }

export const registerUser = async (req, res) => {
  try {
    // Destructuring credentials from req.body
    const { username, email, password, usertype } = req.body;

    // Input validation to ensure that required fields are present
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    if (!usertype) {
      return res.status(400).json({ message: "Password is required." });
    }

    // Checking for existing user in DB...
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .send({ message: "User found with this email. Try with new one!!!" });
    }

    if (usertype == "A" || usertype == "D") {
      if (usertype == "A") {
        // Checking for existing user in DB...
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
          return res.status(404).send({
            message: "User found with this email. Try with new one!!!",
          });
        }
      } else if (usertype == "D") {
        // Checking for existing user in DB...
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
          return res.status(404).send({
            message: "User found with this email. Try with new one!!!",
          });
        }
      }

      // Generating OTP...
      const otp = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });      
      

      const token = jwt.sign(
        {
          purpose: "User Registration",
          username,
          userEmail: email,
          otp: otp,
          usertype,
        },
        JWT_SECRET,
        { expiresIn: "10m" }
      );

      // Save OTP and encrypted password in the database temporarily (but not the user)
      const hashedPassword = await bcrypt.hash(password, 10);
      await OTP.create({
        otp,
        email,
        password: hashedPassword,
        usertype,
        username,
      });

      return res.status(201).send({
        message: "User temporary registration successfull...",
        token,
      });
    } else if (usertype == "P") {
      if (!req.body.patientId) {
        return res.status(400).json({ message: "PatientID is required." });
      }
      const { patientId } = req.body;
      // Checking for existing user in DB...
      const existingUserE = await Patient.findOne({ email });
      const existingUserP = await Patient.findOne({ patientId });
      if (existingUserE) {
        return res.status(404).send({
          message: "User patient found with this email. Try with new one!!!",
        });
      } else if (existingUserP) {
        return res.status(404).send({
          message:
            "User patient found with this PatientId. Try with new one!!!",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        patientId,
        usertype,
        isVerified: true,
      });
      const patient = new Patient({
        username,
        email,
        password: hashedPassword,
        usertype,
        patientId,
        isVerified: true,
      });
      await user.save();
      await patient.save();

      return res.status(201).send({ msg: "Patient registered successfully" });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};

// POST: http://localhost:7001/api/user/register
// @param: {
//   "email": "abc@gmail.com",
//   "otp": "123456",
// }
export const registeredUserOtpVerification = async (req, res) => {
  try {
    // console.log(req.user);
    const { otp } = req.body;
    // Input validation to ensure that required fields are present
    if (!otp) {
      return res.status(401).send({ message: "OTP is required." });
    }

    // const { userEmail } = verifiedUser;

    // Fetch OTP record from the database
    const otpRecord = await OTP.findOne({ otp });
    if (!otpRecord) {
      return res.status(401).json({ msg: "OTP expired or invalid" });
    }

    if (req.user.usertype == "A") {
      // Saving the verified user to the database to user collection permanently...
      const { username, email, password, usertype } = otpRecord;
      const user = new User({
        username,
        email,
        password,
        usertype,
        isVerified: true,
      });
      const admin = new Admin({
        username,
        email,
        password,
        usertype,
        isVerified: true,
      });
      await user.save();
      await admin.save();

      // Clear the OTP record after verification
      await OTP.deleteOne({ email });

      return res.status(201).send({
        msg: "User-Admin verified and registered successfully",
      });
    } else if (req.user.usertype == "D") {
      // Saving the verified user to the database to user collection permanently...
      const { username, email, password, usertype } = otpRecord;
      const user = new User({
        username,
        email,
        password,
        usertype,
        isVerified: true,
      });
      const doctor = new Doctor({
        username,
        email,
        password,
        usertype,
        isVerified: true,
      });
      await user.save();
      await doctor.save();

      // Clear the OTP record after verification
      await OTP.deleteOne({ email });

      return res.status(201).send({
        msg: "User-Admin verified and registered successfully",
      });
    }
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const loggedOutUserOtpVerification = async (req, res) => {
  try {
    const { otp } = req.body;
    // Input validation to ensure that required fields are present
    if (!otp) {
      return res.status(401).send({ message: "OTP is required." });
    }
    // Fetch OTP record from the database
    const otpRecord = await OTP.findOne({ email: req.user.userEmail });
    if (!otpRecord) {
      return res.status(401).json({ msg: "OTP expired or invalid" });
    }

    if (otpRecord.otp == otp) {
      // Clear the OTP record after verification
      await OTP.deleteOne({ email: otpRecord.email });

      return res.status(201).send({
        msg: "OTP verified successfully...",
      });
    } else {
      return res.status(401).json({ msg: "You'hv entered Wrong OTP..." });
    }
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation to ensure that required fields are present
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    const registeredUser = await User.findOne({ email });

    if (!registeredUser) {
      return res.status(401).send({ message: "Invalid user credentials!!!" });
    }

    if (registeredUser.usertype == "A") {
      const registeredAdmin = await Admin.findOne({ email });
      if (!registeredAdmin) {
        return res.status(401).send({ messaeg: "Invalid user credentials!!!" });
      }
      const validPassword = await bcrypt.compare(
        password,
        registeredUser.password
      );

      if (!validPassword) {
        return res.status(401).send({ message: "Invalid User credentials..." });
      }

      let { password: userPassword, ...rest } = Object.assign(
        {},
        registeredUser.toJSON()
      );

      const doctors = await Doctor.find({});
      const patients = await Patient.find({});
      const outbreaks = await Outbreak.find({});

      rest = {
        ...rest,
        doctorsNum: doctors.length,
        patientsNum: patients.length,
        outbreaksNum: outbreaks.length,
      };

      const token = jwt.sign(
        {
          user_id: registeredUser._id,
          admin_id: registeredAdmin._id,
          email: registeredUser.email,
          usertype: registeredUser.usertype,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res
        .status(200)
        .send({ message: "LoggedIn successful...", user: rest, token });
    } else if (registeredUser.usertype == "D") {
      const registeredDoctor = await Doctor.findOne({ email });
      if (!registeredDoctor) {
        return res.status(401).send({ messaeg: "Invalid user credentials!!!" });
      }
      const validPassword = await bcrypt.compare(
        password,
        registeredUser.password
      );

      if (!validPassword) {
        return res.status(401).send({ message: "Invalid User credentials..." });
      }

      let { password: userPassword, ...rest } = Object.assign(
        {},
        registeredUser.toJSON()
      );

      const patients = await Patient.find({});
      const outbreaks = await Outbreak.find({});
      rest = {
        ...rest,
        patientsNum: patients.length,
        outbreaksNum: outbreaks.length,
      };

      const token = jwt.sign(
        {
          user_id: registeredUser._id,
          doctor_id: registeredDoctor._id,
          email: registeredUser.email,
          usertype: registeredUser.usertype,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res
        .status(200)
        .send({ message: "LoggedIn successful...", user: rest, token });
    } else if (registeredUser.usertype == "P") {
      const registeredPatient = await Patient.findOne({ email });
      if (!registeredPatient) {
        return res.status(401).send({ messaeg: "Invalid user credentials!!!" });
      }
      const validPassword = await bcrypt.compare(
        password,
        registeredUser.password
      );

      if (!validPassword) {
        return res.status(401).send({ message: "Invalid User credentials..." });
      }

      const { password: userPassword, ...rest } = Object.assign(
        {},
        registeredUser.toJSON()
      );

      const token = jwt.sign(
        {
          user_id: registeredUser._id,
          patient_id: registeredPatient._id,
          email: registeredUser.email,
          usertype: registeredUser.usertype,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res
        .status(200)
        .send({ message: "LoggedIn successful...", user: rest, token });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const userdetails = await User.findOne({ _id: id });
    if (!userdetails) {
      return res.status(404).send({ message: "User not found" });
    }

    let { password, ...rest } = Object.assign({}, userdetails.toJSON());

    if (userdetails.usertype == "A") {
      const doctors = await Doctor.find({});
      const patients = await Patient.find({});
      const outbreaks = await Outbreak.find({});
      const appointments = await Appointments.find({});
      rest = {
        ...rest,
        doctorsNum: doctors.length,
        patientsNum: patients.length,
        outbreaksNum: outbreaks.length,
        appointmentsNum: appointments.length,
      };
    } else if (userdetails.usertype == "D") {
      const patients = await Patient.find({});
      const outbreaks = await Outbreak.find({});
      const appointments = await Appointments.find({ doctor: userdetails._id });
      console.log(appointments);

      rest = {
        ...rest,
        patientsNum: patients.length,
        outbreaksNum: outbreaks.length,
        appointmentsNum: appointments.length,
      };
    }
    return res
      .status(200)
      .send({ message: "Successfully found!!!", user: rest });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "User Id not found" });
    }

    const { username, email, phone, address, gender, role, profilePicture } =
      req.body;

    if (!username) {
      return res.status(404).send({ message: "Username is required" });
    }
    if (!email) {
      return res.status(404).send({ message: "Email is required" });
    }

    const storedUser = await User.findOne({ _id: id });
    if (!storedUser) {
      return res
        .status(404)
        .send({ message: "User with this id not found!!!" });
    }

    if (req.user.usertype == "A") {
      const admin_id = req.user.admin_id;
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        { username, email, phone, address, gender, profilePicture },
        { new: true } // Returns the updated document
      );
      const updatedAdmin = await Admin.findByIdAndUpdate(
        admin_id,
        { username, email, phone, address, gender, profilePicture },
        { new: true } // Returns the updated document
      );

      const { password, ...rest } = updatedUser.toObject(); // Removes the password field
      return res
        .status(201)
        .send({ message: "Successfully updated!!!", user: rest });
    } else if (req.user.usertype == "D") {
      const doctor_id = req.user.doctor_id;
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        { username, email, phone, address, role, gender, profilePicture },
        { new: true } // Returns the updated document
      );
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        doctor_id,
        { username, email, phone, address, role, gender, profilePicture },
        { new: true } // Returns the updated document
      );

      const { password, ...rest } = updatedUser.toObject(); // Removes the password field
      return res
        .status(201)
        .send({ message: "Successfully updated!!!", user: rest });
    } else {
      const patient_id = req.user.doctor_id;
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        { username, email, phone, address, role, gender, profilePicture },
        { new: true } // Returns the updated document
      );
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        patient_id,
        { username, email, phone, address, role, gender, profilePicture },
        { new: true } // Returns the updated document
      );

      const { password, ...rest } = updatedUser.toObject(); // Removes the password field
      return res
        .status(201)
        .send({ message: "Successfully updated!!!", user: rest });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error });
  }
};

export const searchUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(404).send({ message: "Username not found" });
    }

    const storedUser = await User.findOne({ email: username });
    if (!storedUser) {
      return res
        .status(404)
        .send({ message: "User with this username not found" });
    }

    // Generating OTP...
    const otp = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    let token;

    if (storedUser.usertype == "A") {
      const storedAdmin = await Admin.findOne({ email: username });
      if (!storedAdmin) {
        return res
          .status(404)
          .send({ message: "User with this username not found" });
      }
      token = jwt.sign(
        {
          purpose: "Password Change",
          userName: storedUser.username.split(" ")[0],
          userEmail: storedUser.email,
          otp: otp,
          usertype: storedUser.usertype,
          user_id: storedUser._id,
          admin_id: storedAdmin._id,
        },
        JWT_SECRET,
        { expiresIn: "10m" }
      );
    } else if (storedUser.usertype == "D") {
      const storedDoctor = await Doctor.findOne({ email: username });
      if (!storedDoctor) {
        return res
          .status(404)
          .send({ message: "User with this username not found" });
      }
      token = jwt.sign(
        {
          purpose: "Password Change",
          userName: storedUser.username.split(" ")[0],
          userEmail: storedUser.email,
          otp: otp,
          usertype: storedUser.usertype,
          user_id: storedUser._id,
          doctor_id: storedDoctor._id,
        },
        JWT_SECRET,
        { expiresIn: "10m" }
      );
    } else if (storedUser.usertype == "P") {
      const storedPatient = await Patient.findOne({ email: username });
      if (!storedPatient) {
        return res
          .status(404)
          .send({ message: "User with this username not found" });
      }
      token = jwt.sign(
        {
          purpose: "Password Change",
          userName: storedUser.username.split(" ")[0],
          userEmail: storedUser.email,
          otp: otp,
          usertype: storedUser.usertype,
          user_id: storedUser._id,
          Patient_id: storedPatient._id,
        },
        JWT_SECRET,
        { expiresIn: "10m" }
      );
    }

    await OTP.create({
      username: storedUser.username,
      otp,
      email: storedUser.email,
      password: storedUser.password,
    });

    return res.status(200).send({
      message: "User found with this username...",
      token,
    });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const updateLoggedInUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.params.id;

    if (!id) {
      return res.status(404).send({ message: "User Id not found" });
    }

    if (!oldPassword) {
      return res.status(404).send({ message: "Old Password is required" });
    }
    if (!newPassword) {
      return res.status(404).send({ message: "New Password is required" });
    }

    const storedUser = await User.findOne({ _id: id });

    if (!storedUser) {
      return res.status(404).send({ message: "User not found!!!" });
    }

    if (req.user.usertype == "A") {
      const storedAdmin = await Admin.findOne({ _id: req.user.admin_id });
      if (!storedAdmin) {
        return res.status(404).send({ message: "User not found!!!" });
      }
      const validUserPassword = await bcrypt.compare(
        oldPassword,
        storedUser.password
      );
      const validAdminPassword = await bcrypt.compare(
        oldPassword,
        storedAdmin.password
      );
      if (!validUserPassword || !validAdminPassword) {
        return res.status(404).send({
          message:
            "User doesn't have this old password. Try with correct one!!!",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.updateOne(
        { _id: req.user.user_id },
        { password: hashedPassword }
      );
      await Admin.updateOne(
        { _id: req.user.admin_id },
        { password: hashedPassword }
      );

      return res
        .status(201)
        .send({ message: "Password updated successfully..." });
    } else if (req.user.usertype == "D") {
      const storedDoctor = await Doctor.findOne({ _id: req.user.doctor_id });
      if (!storedDoctor) {
        return res.status(404).send({ message: "User not found!!!" });
      }
      const validUserPassword = await bcrypt.compare(
        oldPassword,
        storedUser.password
      );
      const validDoctorPassword = await bcrypt.compare(
        oldPassword,
        storedDoctor.password
      );
      if (!validUserPassword || !validDoctorPassword) {
        return res.status(404).send({
          message:
            "User doesn't have this old password. Try with correct one!!!",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.updateOne(
        { _id: req.user.user_id },
        { password: hashedPassword }
      );
      await Doctor.updateOne(
        { _id: req.user.doctor_id },
        { password: hashedPassword }
      );

      return res
        .status(201)
        .send({ message: "Password updated successfully..." });
    } else if (req.user.usertype == "P") {
      const storedPatient = await Patient.findOne({ _id: req.user.patient_id });
      if (!storedPatient) {
        return res.status(404).send({ message: "User not found!!!" });
      }
      const validUserPassword = await bcrypt.compare(
        oldPassword,
        storedUser.password
      );
      const validPatientPassword = await bcrypt.compare(
        oldPassword,
        storedPatient.password
      );
      if (!validUserPassword || !validPatientPassword) {
        return res.status(404).send({
          message:
            "User doesn't have this old password. Try with correct one!!!",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.updateOne(
        { _id: req.user.user_id },
        { password: hashedPassword }
      );
      await Patient.updateOne(
        { _id: req.user.patient_id },
        { password: hashedPassword }
      );

      return res
        .status(201)
        .send({ message: "Password updated successfully..." });
    }
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const changeLoggedOutUserPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).send({ message: "Password is required!!!" });
    }
    const { usertype, user_id } = req.user;

    const storedUser = await User.findOne({ _id: user_id });
    if (!storedUser) {
      return res
        .status(400)
        .send({ message: "User with this id not found..." });
    }

    if (usertype == "A") {
      const storedAdmin = await Admin.findOne({ _id: req.user.admin_id });
      if (!storedAdmin) {
        return res
          .status(400)
          .send({ message: "User with this id not found..." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await Admin.updateOne(
        { _id: storedAdmin._id },
        { password: hashedPassword }
      );

      await User.updateOne(
        { _id: storedUser._id },
        { password: hashedPassword }
      );

      return res
        .status(201)
        .send({ message: "Password updated successfully!!!" });
    } else if (usertype == "D") {
      const storedDoctor = Admin.findOne({ _id: req.user.doctor_id });
      if (!storedDoctor) {
        return res
          .status(400)
          .send({ message: "User with this id not found..." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await Doctor.updateOne(
        { _id: storedDoctor._id },
        { password: hashedPassword }
      );

      await User.updateOne(
        { _id: storedUser._id },
        { password: hashedPassword }
      );

      return res
        .status(201)
        .send({ message: "Password updated successfully!!!" });
    } else if (usertype == "P") {
      const storedPatient = Patient.findOne({ _id: req.user.patient_id });
      if (!storedPatient) {
        return res
          .status(400)
          .send({ message: "User with this id not found..." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await Patient.updateOne(
        { _id: storedPatient._id },
        { password: hashedPassword }
      );

      await User.updateOne(
        { _id: storedUser._id },
        { password: hashedPassword }
      );

      return res
        .status(201)
        .send({ message: "Password updated successfully!!!" });
    }
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};
