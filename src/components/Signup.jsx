import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideImageCard from "./common/SideImageCard";
import { APP_BASE_URL, SIGNUP } from "../utils/constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "mickey",
    lastName: "mouse",
    emailId: "mickey@mail.com",
    password: "StronG@812888",
    age: "23",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.emailId.trim() || !/^\S+@\S+\.\S+$/.test(formData.emailId))
      newErrors.emailId = "Valid email is required.";
    if (!formData.password.trim() || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (
      formData.password &&
      (!/[A-Z]/.test(formData.password) ||
        !/[a-z]/.test(formData.password) ||
        !/[0-9]/.test(formData.password) ||
        !/[@$!%*?&#]/.test(formData.password))
    ) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character.";
    }
    if (!formData.age || isNaN(formData.age) || parseInt(formData.age) <= 0)
      newErrors.age = "Age must be a positive number.";
    if (!formData.gender) newErrors.gender = "Gender is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(APP_BASE_URL + SIGNUP, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="max-w-md w-full">
        <SideImageCard
          card_title="Create an account!"
          card_description="Sign up to start your journey with us."
          card_image_url="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={`input input-bordered w-full ${
                errors.firstName ? "input-error" : ""
              }`}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={`input input-bordered w-full ${
                errors.lastName ? "input-error" : ""
              }`}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}

            <input
              type="email"
              name="emailId"
              placeholder="Email"
              className={`input input-bordered w-full ${
                errors.emailId ? "input-error" : ""
              }`}
              value={formData.emailId}
              onChange={handleChange}
            />
            {errors.emailId && (
              <p className="text-red-500 text-sm">{errors.emailId}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <input
              type="number"
              name="age"
              placeholder="Age"
              className={`input input-bordered w-full ${
                errors.age ? "input-error" : ""
              }`}
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

            <select
              name="gender"
              className={`select select-bordered w-full ${
                errors.gender ? "select-error" : ""
              }`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-full">
                Sign Up
              </button>
            </div>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 underline">
                Login
              </a>
            </p>
          </form>
        </SideImageCard>
      </div>
    </div>
  );
};

export default Signup;
