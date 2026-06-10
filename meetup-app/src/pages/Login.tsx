import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from '../components/Logo';

const DEMO_ACCOUNTS = [
  { email: 'alice@example.com', role: 'Admin', name: 'Alice Freeman' },
  { email: 'bob@example.com', role: 'User', name: 'Bob Smith' },
  { email: 'charlie@example.com', role: 'User', name: 'Charlie Davis' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/user');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0E1020' }}>

      {/* ── Left Panel (decorative) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #FF6B1A 0%, #F5A623 45%, #0B7B83 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-black/10 blur-3xl" />
        {/* Rangoli dot pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-12"
        >
          <Logo size="lg" lightText className="justify-center mb-6" tagline="Connect · Learn · Grow" />
          <p className="text-white/60 text-sm max-w-xs mx-auto">
            India's premier platform for tech meetups, workshops and networking events
          </p>

          {/* City badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {['Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Pune', 'Chennai'].map((city) => (
              <span key={city} className="px-3 py-1 bg-white/15 backdrop-blur text-white text-xs font-semibold rounded-full">
                📍 {city}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { val: '500+', label: 'Events' },
              { val: '50K+', label: 'Members' },
              { val: '30+', label: 'Cities' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-3">
                <p className="text-2xl font-black text-white">{s.val}</p>
                <p className="text-white/70 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Logo size="md" lightText />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">Welcome back! 🙏</h2>
            <p className="text-gray-400 text-sm">Sign in to discover events across India</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-red-300 text-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#161828] border border-[#252840] rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#161828] border border-[#252840] rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition"
                  required
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#252840] bg-[#161828] accent-orange-500" />
                <span className="text-xs text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-orange-400 hover:text-orange-300 font-semibold transition">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 btn-saffron flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#252840]" />
            <span className="text-xs text-gray-600 font-medium">Quick Demo Login</span>
            <div className="flex-1 h-px bg-[#252840]" />
          </div>

          {/* Demo accounts */}
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                onClick={() => { setEmail(acc.email); setPassword('password'); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-left group ${
                  email === acc.email
                    ? 'border-orange-500/50 bg-orange-500/10'
                    : 'border-[#252840] bg-[#161828] hover:border-orange-500/30 hover:bg-[#1a1c30]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                    acc.role === 'Admin' ? 'saffron-gradient' : 'teal-gradient'
                  }`}>
                    {acc.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-200">{acc.name}</p>
                    <p className="text-[10px] text-gray-500">{acc.email}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  acc.role === 'Admin'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-teal-500/20 text-teal-400'
                }`}>{acc.role}</span>
              </button>
            ))}
          </div>

          {/* Sign up link */}
          <p className="text-center text-xs text-gray-500 mt-6">
            New to MeetUp India?{' '}
            <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-semibold transition">
              Create an account →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
