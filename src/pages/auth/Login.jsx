import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaCar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await loginWithEmail(email, password);
    toast.success('Welcome back! 🚗');
    navigate(from, { replace: true });
  } catch (err) {
    const msg = err.response?.data?.message || 'Login failed.';
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success('Welcome! 🎉');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error('Google login failed.');
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
          <span className="font-heading text-2xl font-bold text-white">DRIVE<span className="text-primary">FLEET</span></span>
        </div>
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-1">Welcome Back</h2>
        <p className="text-gray-400 text-sm text-center mb-6">Login to your account to continue</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none pr-10"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full btn-primary py-2.5 text-sm disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 border border-white/10 rounded-xl py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors">
          <FcGoogle size={18} /> Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};
export default Login;