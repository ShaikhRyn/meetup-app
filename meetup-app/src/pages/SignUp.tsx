import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Lock, User, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from '../components/Logo';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [step, setStep] = useState<'info' | 'role'>('info');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState('');

  const handleNextStep = () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setStep('role');
  };

  const handleSignUp = async () => {
    try {
      setError('');
      await signup(name, email, password, role);
      navigate(role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-6">
              <Logo size="lg" lightText />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join Our Community</h1>
            <p className="text-gray-400">Create an account to discover amazing events</p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {['info', 'role'].map((s, i) => (
              <motion.div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  step === s || (step === 'role' && i === 0)
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-slate-700'
                }`}
                layoutId="progress"
              />
            ))}
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-red-300 text-sm">{error}</span>
              </motion.div>
            )}

            {step === 'info' ? (
              <motion.form
                key="info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
                </div>

                {/* Terms */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-slate-900 text-green-500" required />
                  <span className="text-sm text-gray-300">
                    I agree to the <span className="text-green-400">Terms of Service</span>
                  </span>
                </label>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="role"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-gray-300 mb-6 text-center">Choose your role to get started</p>
                
                <div className="space-y-4 mb-8">
                  {[
                    { value: 'user', title: 'Attendee', desc: 'Discover and attend meetups' },
                    { value: 'admin', title: 'Organizer', desc: 'Create and manage events' }
                  ].map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setRole(option.value as 'user' | 'admin')}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                        role === option.value
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          role === option.value
                            ? 'border-green-500 bg-green-500'
                            : 'border-slate-500'
                        }`}>
                          {role === option.value && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{option.title}</p>
                          <p className="text-sm text-gray-400">{option.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSignUp}
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-5 h-5" />
                        Create Account
                      </>
                    )}
                  </motion.button>

                  <button
                    onClick={() => setStep('info')}
                    className="w-full py-3 border-2 border-slate-600 text-gray-300 font-semibold rounded-lg hover:border-slate-500 transition"
                  >
                    Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Sign In Link */}
            <p className="text-center text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold transition">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
