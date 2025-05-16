import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config";
import { jwtDecode } from "jwt-decode";

export const registerAPI = createAsyncThunk(
  "user/registration",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/register", body);
      if (!response) throw new Error("Failed to fetch");
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const mailerAPI = createAsyncThunk(
  "register/mail",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post("/registerMail", body, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization bearer token
        },
      });
      return response?.data;
      // console.log(body);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registeredUserOtpVerificationAPI = createAsyncThunk(
  "otp/verification",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const decode = jwtDecode(token);
      if (decode.usertype == "A") {
        const response = await axios.post("/admin/register/otp/verify", body, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });
        if (!response) throw new Error("Failed to fetch");
        return response?.data;
      } else if (decode.usertype == "D") {
        const response = await axios.post("/doctor/register/otp/verify", body, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });
        if (!response) throw new Error("Failed to fetch");
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logInUserAPI = createAsyncThunk(
  "user/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/login", body);
      if (!response) throw new Error("Failed to fetch");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "get/user",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { user_id } = jwtDecode(token);
      const response = await axios.get(`/user/details/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization bearer token
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "update/user",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      // console.log(token);
      const { user_id } = jwtDecode(token);
      const response = await axios.put(
        `/user/profile/update/${user_id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchUsername = createAsyncThunk(
  "search/username",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/search/username", body);
      return response?.data;
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const loggedOutUserOtpVerification = createAsyncThunk(
  "loggedoutuser/otpverification",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post("/user/otp/verification", body, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization bearer token
        },
      });

      return response?.data;
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "update/password",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { user_id } = jwtDecode(token);
      const response = await axios.patch(
        `/user/update/password/${user_id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const changeLoggedOutUserPassword = createAsyncThunk(
  "change/password",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.patch("/user/change/password", body, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization bearer token
        },
      });

      return response?.data;
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const addDoctor = createAsyncThunk(
  "add/doctor",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { admin_id } = jwtDecode(token);
      if (!admin_id) throw new Error("Admin ID missing in token");
      if (token && admin_id) {
        const response = await axios.post(
          `/admin/add/doctor/${admin_id}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set the authorization bearer token
            },
          }
        );

        return response?.data;
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getDoctors = createAsyncThunk(
  "get/doctors",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { admin_id } = jwtDecode(token);
      if (!admin_id) throw new Error("Admin ID missing in token");
      if (token && admin_id) {
        const response = await axios.get(`/admin/get/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });

        return response?.data;
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const removeDoctor = createAsyncThunk(
  "remove/doctor",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { admin_id } = jwtDecode(token);
      if (!admin_id) throw new Error("Admin ID missing in token");
      if (token && admin_id) {
        const response = await axios.delete(
          `/admin/delete/doctor/${body.doctor_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set the authorization bearer token
            },
          }
        );
        return response?.data;
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const addOutbreak = createAsyncThunk(
  "add/outbreak",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { admin_id } = jwtDecode(token);
      if (!admin_id) throw new Error("Admin ID missing in token");
      if (token && admin_id) {
        const response = await axios.post(`/admin/add/outbreak`, body, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });

        return response?.data;
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const updateOutbreak = createAsyncThunk(
  "update/outbreak",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { admin_id, doctor_id } = jwtDecode(token);
      if (token && admin_id) {
        const response = await axios.put(`/admin/update/outbreak`, body, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });

        return response?.data;
      } else if (token && doctor_id) {
        const response = await axios.put(`/doctor/update/outbreak`, body, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });

        return response?.data;
      } else {
        console.log("You're unauthorized to do this action...");
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const deleteOutbreak = createAsyncThunk(
  "delete/outbreak",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { admin_id } = jwtDecode(token);
      if (!admin_id) throw new Error("Admin ID missing in token");
      if (token && admin_id) {
        const response = await axios.delete(
          `/admin/delete/outbreak/${body.outbreak_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set the authorization bearer token
            },
          }
        );
        return response?.data;
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getOutbreaks = createAsyncThunk(
  "get/outbreaks",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { admin_id, doctor_id } = jwtDecode(token);
      if (token && admin_id) {
        const response = await axios.get(`/admin/get/outbreaks`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });

        return response?.data;
      } else if (token && doctor_id) {
        const response = await axios.get(`/doctor/get/outbreaks`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });

        return response?.data;
      } else {
        console.log("You're unauthorized to do this action...");
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const addPatient = createAsyncThunk(
  "add/patient",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { doctor_id } = jwtDecode(token);
      if (!doctor_id) throw new Error("Doctor-ID missing in token");
      if (token && doctor_id) {
        const response = await axios.post(`/doctor/add/patient/`, body, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });
        return response?.data;
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getPatientDetails = createAsyncThunk(
  "patient/details",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      if (token) {
        const { usertype } = jwtDecode(token);
        if (usertype === "A") {
          const response = await axios.get(
            `/admin/get/patient/details/${body.patient_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Set the authorization bearer token
              },
            }
          );
          return response?.data;
        } else if (usertype === "D") {
          const response = await axios.get(
            `/doctor/get/patient/details/${body.patient_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Set the authorization bearer token
              },
            }
          );
          return response?.data;
        }
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
export const getApptDetails = createAsyncThunk(
  "appointment/details",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      if (token) {
        const { usertype } = jwtDecode(token);
        if (usertype === "A") {
          const response = await axios.get(
            `/admin/get/appointment/details/${body.appt_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Set the authorization bearer token
              },
            }
          );
          return response?.data;
        } else if (usertype === "D") {
          const response = await axios.get(
            `/doctor/get/appointment/details/${body.appt_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Set the authorization bearer token
              },
            }
          );
          return response?.data;
        } else if (usertype === "P") {
          const response = await axios.get(
            `/patient/get/appointment/details/${body.appt_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Set the authorization bearer token
              },
            }
          );
          return response?.data;
        }
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getPatientsRecord = createAsyncThunk(
  "patient/record",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { usertype } = jwtDecode(token);
      if (!usertype) throw new Error("Usertype missing in token");
      if (usertype == "A") {
        const response = await axios.get(`/admin/get/patients`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });
        return response?.data;
      } else if (usertype == "D") {
        const response = await axios.get(`/doctor/get/patients`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });
        return response?.data;
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getApptsRecord = createAsyncThunk(
  "appointments/record",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) throw new Error("Token not found in localStorage");
      const { usertype } = jwtDecode(token);
      if (!usertype) throw new Error("Usertype missing in token");
      if (usertype == "A") {
        const response = await axios.get(`/admin/get/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });
        return response?.data;
      } else if (usertype == "D") {
        const response = await axios.get(`/doctor/get/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });
        return response?.data;
      } else if (usertype == "P") {
        const response = await axios.get(`/patient/get/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization bearer token
          },
        });
        return response?.data;
      }
    } catch (error) {
      console.error("Client Error:", error.message); // Log client-side errors
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
