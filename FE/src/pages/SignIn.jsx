import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { login } from "../api/auth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // ✅ Mulai loading

    try {
      const credentials = { email, password };
      await login(credentials);
      // lanjutkan navigasi / aksi setelah login berhasil
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // ✅ Selesai loading
    }
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
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Sign In
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-[#e8e8e8] pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-green-600 transition-300"
              placeholder=""
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-[#e8e8e8] pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-green-600 transition-300 tracking-[0.3em]"
              placeholder=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-3xl text-lg mt-2 transition-all shadow-md flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-700">
          Belum punya akun?{" "}
          <Link
            to="/signup"
            className="text-green-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
