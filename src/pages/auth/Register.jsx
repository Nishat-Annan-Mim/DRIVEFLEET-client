import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaCar } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const { registerWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (password) => {
    const errs = {};
    if (!/[A-Z]/.test(password))
      errs.password = "Must have at least one uppercase letter";
    else if (!/[a-z]/.test(password))
      errs.password = "Must have at least one lowercase letter";
    else if (password.length < 6)
      errs.password = "Must be at least 6 characters";
    return errs;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = validate(form.password);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(form.name, form.email, form.photo, form.password);
      toast.success("Account created! Please login. 🎉");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Welcome! 🎉");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card-glass w-full max-w-md p-8 rounded-2xl"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaCar className="text-primary text-2xl" />
          <span className="font-heading text-2xl font-bold text-white">
            DRIVE<span className="text-primary">FLEET</span>
          </span>
        </div>
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-1">
          Create Account
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Join DriveFleet and start your journey
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {[
            {
              name: "name",
              label: "Full Name",
              type: "text",
              placeholder: "John Doe",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "your@email.com",
            },
            {
              name: "photo",
              label: "Photo URL",
              type: "url",
              placeholder: "https://...",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-gray-300 text-sm block mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required={field.name !== "photo"}
                placeholder={field.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none"
              />
            </div>
          ))}
          <div>
            <label className="text-gray-300 text-sm block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2.5 text-sm disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 border border-white/10 rounded-xl py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors"
        >
          <FcGoogle size={18} /> Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
export default Register;
