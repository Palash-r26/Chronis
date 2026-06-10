import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  Moon, 
  Sun, 
  Loader2, 
  Brain, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  FileDown,
  Lock,
  Compass,
  Mail,
  User,
  Eye,
  EyeOff,
  Terminal,
  Shield,
  Heart
} from 'lucide-react';
import Logo from '../components/Logo';

const Login = () => {
  const [authMode, setAuthMode] = useState('signin');
  const [role, setRole] = useState('teacher');
  
  // Traditional Credentials States
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  // Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Demo user selection state
  const [demoUser, setDemoUser] = useState('');
  const demoUsers = {
    'User 1': { email: 'user1@chronis.app', password: 'demo1234' },
    'User 2': { email: 'user2@chronis.app', password: 'demo1234' },
    'User 3': { email: 'user3@chronis.app', password: 'demo1234' },
    'User 4': { email: 'user4@chronis.app', password: 'demo1234' },
    'User 5': { email: 'user5@chronis.app', password: 'demo1234' },
    'Admin': { email: 'admin@chronis.app', password: 'admin123' },
  };
  
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark'); // Default to dark mode
  
  const navigate = useNavigate();
  const { user, login, register: registerUser, setUser } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Load and apply theme (defaults to dark mode)
  useEffect(() => {
    const savedTheme = localStorage.getItem('chronis-theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync theme changes from other components
  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail) {
        setTheme(e.detail);
      }
    };
    window.addEventListener('chronis-theme-changed', handleThemeChange);
    return () => {
      window.removeEventListener('chronis-theme-changed', handleThemeChange);
    };
  }, []);

  // Populate email/password when demo user selected
  useEffect(() => {
    if (demoUser && demoUsers[demoUser]) {
      setEmail(demoUsers[demoUser].email);
      setPassword(demoUsers[demoUser].password);
    }
  }, [demoUser]);



  // Load Google Identity Services script on mount for real Chrome account picking
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('chronis-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('chronis-theme-changed', { detail: nextTheme }));
    toast.success(`${nextTheme === 'light' ? 'Light' : 'Dark'} mode activated!`);
  };

  // Traditional Email/Password Form Submit
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!email || !password || (authMode === 'signup' && (!name || !confirmPassword))) {
      setLoginError('Please fill in all required fields');
      return;
    }
    
    // Sign-up Password matching check
    if (authMode === 'signup' && password !== confirmPassword) {
      setLoginError('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      if (authMode === 'signup') {
        await registerUser(name, email, password);
        toast.success('Registration successful! Welcome to Chronis');
        navigate('/dashboard');
      } else {
        await login(email, password);
        toast.success('Sign-in successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 400 || err.response.status === 404)) {
        setLoginError('Invalid email or password');
      } else {
        setLoginError(err.response?.data?.detail || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <main id="home" className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 flex flex-col font-sans theme-transition scroll-smooth overflow-x-hidden">
        
        {/* ─── NAVBAR ─── */}
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 dark:bg-[#131B2E]/85 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 py-3">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
            <a href="/" className="group cursor-pointer transition-transform duration-200 hover:scale-105">
              <Logo className="w-10 h-10 shrink-0" withText={true} />
            </a>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/#about" className="text-sm font-bold text-slate-500 hover:text-[#7c3aed] transition-colors">About</Link>
              <Link to="/#how-it-works" className="text-sm font-bold text-slate-500 hover:text-[#7c3aed] transition-colors">How it Works</Link>
              <Link to="/developer" className="text-sm font-bold text-slate-500 hover:text-[#7c3aed] transition-colors">Developer</Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-650 dark:text-slate-400 focus:outline-none cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </nav>

        {/* ─── SPLIT MAIN CONTENT ─── */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32 md:pt-40 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          
          {/* Left Side: Chronis Identity & Feature Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#7c3aed]/10 text-[#7c3aed] dark:text-[#7c3aed] border border-[#7c3aed]/20">
                <Sparkles size={14} className="text-[#7c3aed] animate-spin" />
                Advanced Assessment Engine
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                Chronis Behavioral <br />
                <span className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] bg-clip-text text-transparent">
                  Platform
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-550 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
                Log your daily habits, sleep, and screen time. Our AI engine extracts behavioral contexts to help you reach peak productivity.
              </p>
            </div>

            {/* Chronis pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PillarCard 
                icon={<Brain className="text-[#7c3aed]" size={20} />}
                title="Unified Metrics" 
                desc="Sync sleep, screen time, exercise, and deep work seamlessly." 
              />
              <PillarCard 
                icon={<Zap className="text-amber-500" size={20} />}
                title="Actionable Insights" 
                desc="Discover hidden correlations to optimize your daily routines." 
              />
              <PillarCard 
                icon={<Compass className="text-blue-500" size={20} />}
                title="AI Blueprints" 
                desc="Set targets based on historical data to guide improvement." 
              />
              <PillarCard 
                icon={<FileDown className="text-violet-500" size={20} />}
                title="Goal Tracking" 
                desc="Track milestones and long-term habits effectively." 
              />
            </div>
          </div>

          {/* Right Side: Traditional Login + Google Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-white dark:bg-[#131B2E] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl theme-transition flex flex-col items-center">
              
              {/* Chronis Logo Square */}
              <div className="mb-5 shrink-0 flex items-center justify-center">
                <Logo className="w-16 h-16" withText={false} />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5 tracking-tight">
                {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-400 text-center max-w-[280px] leading-relaxed mb-6">
                {authMode === 'signin' ? 'Sign in to access your Chronis analytics portal.' : 'Register to start generating AI behavioral insights.'}
              </p>

              {/* Custom Mode Segment Switcher (Sign In vs Sign Up) */}
              <div className="w-full bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-1 flex gap-1 mb-6 border border-slate-200/20 dark:border-slate-700/30">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl capitalize transition-all focus:outline-none cursor-pointer ${
                    authMode === 'signin' 
                      ? 'bg-white dark:bg-[#131B2E] text-slate-900 dark:text-white shadow-sm border border-slate-200/20 dark:border-slate-700/20' 
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-650'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl capitalize transition-all focus:outline-none cursor-pointer ${
                    authMode === 'signup' 
                      ? 'bg-white dark:bg-[#131B2E] text-slate-900 dark:text-white shadow-sm border border-slate-200/20 dark:border-slate-700/20' 
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-650'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Traditional Email & Password Form */}
              <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                {loginError && (<p className="text-xs text-red-500 font-bold mb-2 text-center">{loginError}</p>)}
                {/* Demo User selector */}
                {authMode === 'signin' && (
                  <div className="mb-4">
                    <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Demo User</label>
                    <select
                      value={demoUser}
                      onChange={(e) => setDemoUser(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl pl-3 pr-3 py-2.5 text-xs focus:outline-none focus:border-[#7c3aed] text-slate-900 dark:text-white"
                    >
                      <option value="">Select a demo user</option>
                      {Object.keys(demoUsers).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Enter your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-xs focus:outline-none focus:border-[#7c3aed] font-bold transition-all text-slate-900 dark:text-white placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-slate-400" size={16} />
                    <input 
                      type="email" 
                      placeholder="user1@chronis.app"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-xs focus:outline-none focus:border-[#7c3aed] font-bold transition-all text-slate-900 dark:text-white placeholder-slate-400"
                      required
                    />
                  </div>
                </div>

                {/* Password field with Eye Toggle Option */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-slate-400" size={16} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-12 py-3.5 text-xs focus:outline-none focus:border-[#7c3aed] font-bold transition-all text-slate-900 dark:text-white placeholder-slate-400"
                      required
                    />
                    {/* Eye Icon */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-650 dark:hover:text-white focus:outline-none cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field (Sign-up only, with Eye Toggle) */}
                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-12 py-3.5 text-xs focus:outline-none focus:border-[#7c3aed] font-bold transition-all text-slate-900 dark:text-white placeholder-slate-400"
                        required
                      />
                      {/* Confirm Password Eye Icon */}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-white focus:outline-none cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}



                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3.5 rounded-full font-bold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-violet-500/20 disabled:opacity-50 mt-4 cursor-pointer focus:outline-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight size={16} />
                    </div>
                  )}
                </button>

              </form>



            </div>
          </div>

        </div>

        {/* ─── PALASH RAI ULTRA FOOTER ─── */}
        <footer className="w-full bg-white dark:bg-[#131B2E] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-8 px-6 lg:px-8 relative z-20 theme-transition mt-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-6 flex flex-col items-center text-center md:items-start md:text-left">
              <Link to="/" className="inline-flex">
                <Logo className="w-8 h-8 shrink-0" withText={true} />
              </Link>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                Chronis is a cutting-edge behavioral analytics platform engineered from the ground up by Palash Rai to revolutionize personal productivity and health tracking.
              </p>
              <div className="flex items-center gap-2 text-sm font-black text-[#7c3aed]">
                <Shield size={16} />
                <span>100% Privacy Focused</span>
              </div>
            </div>

            {/* Links Column 1 */}
            <div className="md:col-span-3 space-y-4 text-center md:text-left">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Platform</h4>
              <ul className="space-y-3">
                <li><Link to="/#about" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">About Chronis</Link></li>
                <li><Link to="/#how-it-works" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">How it Works</Link></li>
                <li><Link to="/login" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">Sign In / Register</Link></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="md:col-span-4 space-y-4 text-center md:text-left">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Developer</h4>
              <ul className="space-y-3">
                <li><Link to="/developer" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">Palash Rai - Developer Profile</Link></li>
                <li><a href="https://github.com/Palash-r26" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">GitHub Repository</a></li>
                <li><a href="https://www.linkedin.com/in/palash-rai2612" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">LinkedIn Connect</a></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} Chronis. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center gap-1.5">
                Solely Developed by <Link to="/developer" className="text-[#7c3aed] hover:underline cursor-pointer transition-colors">Palash Rai</Link>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Built with</span>
              <Heart size={12} className="text-red-500 animate-pulse fill-red-500" />
              <span>by <Link to="/developer" className="hover:text-[#7c3aed] hover:underline cursor-pointer transition-colors">Palash Rai</Link></span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

// ─── CARD PILLAR COMPONENT ───
function PillarCard({ icon, title, desc }) {
  return (
    <div className="bg-white dark:bg-[#131B2E] border border-slate-200/40 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[#7c3aed]/30 transition-all theme-transition group flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-slate-100 dark:border-slate-700/30 shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-extrabold text-slate-900 dark:text-slate-200 text-sm tracking-tight mb-0.5">{title}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default Login;
