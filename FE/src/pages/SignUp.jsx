import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Link2 } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../api/auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    supportingUrl: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: isDoctor ? "doctor" : "user",
    };

    if (isDoctor) {
      payload.supportingUrl = formData.supportingUrl;
    }

    try {
      await register(payload);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered. Redirecting to Sign In...",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/signin"); 
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "An error occurred during registration.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-1">
          <img
            src="/logo-rb.png"
            alt="Health Guard Logo"
            className="w-20 h-20 mb-2"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
          Sign Up
        </h2>

        {/* Tabs Role Switch */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-full shadow-sm flex">
            <button
              type="button"
              onClick={() => setIsDoctor(false)}
              className={`px-6 py-2 font-medium rounded-full transition-all ${
                !isDoctor
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setIsDoctor(true)}
              className={`px-6 py-2 font-medium rounded-full transition-all ${
                isDoctor
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Doctor
            </button>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <label className="group relative block">
            <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-[#e8e8e8]">
              <User className="flex size-6 shrink-0 text-[#bdbdbd]" />
            </div>
            <p className="placeholder font-medium text-[#6a7686] text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-placeholder-shown:top-[36px] group-focus-within:top-[25px] transition-all duration-300">
              Username
            </p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-[#e8e8e8] pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-green-600 transition-300"
              placeholder=""
              required
            />
          </label>

          {/* Email Input */}
          <label className="group relative block">
            <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-[#e8e8e8]">
              <Mail className="flex size-6 shrink-0 text-[#bdbdbd]" />
            </div>
            <p className="placeholder font-medium text-[#6a7686] text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-placeholder-shown:top-[36px] group-focus-within:top-[25px] transition-all duration-300">
              Your email
            </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-[#e8e8e8] pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-green-600 transition-300"
              placeholder=""
              required
            />
          </label>

          {/* Password Input */}
          <label className="group relative block">
            <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-[#e8e8e8]">
              <Lock className="flex size-6 shrink-0 text-[#bdbdbd]" />
            </div>
            <p className="placeholder font-medium text-[#6a7686] text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-placeholder-shown:top-[36px] group-focus-within:top-[25px] transition-all duration-300">
              Your password
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-[#e8e8e8] pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-green-600 transition-300 tracking-[0.3em]"
              placeholder=""
              required
            />
            <button
              type="button"
              className="absolute transform -translate-y-1/2 top-1/2 right-6"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="flex size-6 shrink-0 text-[#bdbdbd]" />
              ) : (
                <Eye className="flex size-6 shrink-0 text-[#bdbdbd]" />
              )}
            </button>
          </label>

          {/* Doctor URL Field */}
          {isDoctor && (
            <label className="group relative block">
              <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-[#e8e8e8]">
                <Link2 className="flex size-6 shrink-0 text-[#bdbdbd]" />
              </div>
              <p className="placeholder font-medium text-[#6a7686] text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-placeholder-shown:top-[36px] group-focus-within:top-[25px] transition-all duration-300">
                Supporting URL (LinkedIn)
              </p>
              <input
                type="url"
                name="supportingUrl"
                value={formData.supportingUrl}
                onChange={handleChange}
                className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-[#e8e8e8] pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-green-600 transition-300"
                placeholder=""
                required
              />
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-3xl text-lg mt-2 transition-all shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          Sudah punya akun?{" "}
          <RouterLink
            to="/signin"
            className="text-green-600 hover:underline font-semibold"
          >
            Sign In
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;