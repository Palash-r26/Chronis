import { Link } from 'react-router-dom';
import { Activity, BrainCircuit, ArrowRight, Zap, Target, Shield, Clock, Sparkles, Heart, Sun, Moon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from '../components/Logo';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="relative group cursor-pointer h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="bg-white dark:bg-[#131B2E] p-8 rounded-3xl relative h-full border border-slate-200/50 dark:border-slate-800/60 overflow-hidden shadow-lg group-hover:shadow-[#7c3aed]/5 transition-all flex flex-col">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-[#7c3aed]/10 transition-colors duration-500 border border-slate-100 dark:border-slate-700/50 shrink-0">
        <Icon className="w-7 h-7 text-slate-400 group-hover:text-[#7c3aed] transition-colors duration-500" />
      </div>
      <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">{description}</p>
    </div>
  </motion.div>
);

const Landing = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Theme sync
    const savedTheme = localStorage.getItem('chronis-theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    const handleThemeChange = (e) => {
      if (e.detail) {
        setTheme(e.detail);
      }
    };
    window.addEventListener('chronis-theme-changed', handleThemeChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('chronis-theme-changed', handleThemeChange);
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
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 relative overflow-hidden font-sans selection:bg-[#7c3aed]/30 theme-transition scroll-smooth">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 w-full h-[120vh] overflow-hidden pointer-events-none flex justify-center items-center z-0">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#7c3aed]/5 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[100px] rounded-full" 
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* ─── NAVBAR ─── */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-[#131B2E]/85 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 py-3' : 'bg-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
            <Link to="/" className="group cursor-pointer transition-transform duration-200 hover:scale-105">
              <Logo className="w-10 h-10 shrink-0" withText={true} />
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-bold text-slate-500 hover:text-[#7c3aed] transition-colors">About</a>
              <a href="#how-it-works" className="text-sm font-bold text-slate-500 hover:text-[#7c3aed] transition-colors">How it Works</a>
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
              <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#7c3aed] dark:hover:text-[#7c3aed] transition-colors px-4 py-2">
                Sign In
              </Link>
              <Link to="/login" className="px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-violet-500/20 hover:scale-105 active:scale-95 flex items-center gap-2">
                Get Started
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </nav>

        {/* ─── HERO SECTION ─── */}
        <main className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
          <motion.div style={{ y: y1, opacity }} className="text-center max-w-4xl mx-auto mb-24 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#7c3aed]/20 bg-[#7c3aed]/10 text-sm font-bold mb-4 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#7c3aed] animate-pulse" />
              <span className="text-[#7c3aed]">Powered by Advanced AI Analytics</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-slate-900 dark:text-white"
            >
              Master your <br/>
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] bg-clip-text text-transparent">
                Behavior.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Track your metrics, discover hidden patterns with Machine Learning, and take ultimate control of your time, focus, and well-being. Built exclusively by Palash Rai.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8"
            >
              <Link to="/login" className="px-8 py-4 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black rounded-full overflow-hidden transition-all hover:scale-105 shadow-xl shadow-violet-500/20 flex items-center gap-2 text-base w-full sm:w-auto justify-center">
                Start Tracking Free 
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="px-8 py-4 bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-black rounded-full transition-all flex items-center gap-2 text-base w-full sm:w-auto justify-center shadow-sm">
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          {/* ─── ABOUT SECTION ─── */}
          <section id="about" className="w-full py-20 relative z-20">
            <div className="flex items-center justify-center mb-6">
              <Logo className="w-12 h-12" withText={true} />
            </div>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                What is Chronis?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-sm md:text-base">
                Chronis is a cutting-edge telemetry dashboard engineered by Palash Rai to synthesize your raw daily data—sleep, screen time, exercise—into actionable, AI-driven insights. 
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 w-full relative">
              <motion.div style={{ y: y2 }} className="absolute -inset-4 bg-gradient-to-b from-transparent via-[#7c3aed]/5 to-transparent blur-2xl -z-10" />
              
              <FeatureCard 
                icon={Activity}
                title="Unified Metrics"
                description="Sync sleep, screen time, exercise, and deep work seamlessly in one beautiful, highly responsive dashboard."
                delay={0.1}
              />
              <FeatureCard 
                icon={BrainCircuit}
                title="AI Intelligence"
                description="Our advanced ML models discover hidden correlations between your habits and productivity, delivering personalized advice."
                delay={0.2}
              />
              <FeatureCard 
                icon={Target}
                title="Actionable Goals"
                description="Set targets based on your historical data and let the automated coaching system guide you towards rapid improvement."
                delay={0.3}
              />
            </div>
          </section>

          {/* ─── HOW IT WORKS SECTION ─── */}
          <section id="how-it-works" className="w-full py-24 relative z-20 border-t border-slate-200 dark:border-slate-800/80 mt-12">
            <div className="text-center mb-20 space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-2 text-blue-500">
                <Clock size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                How Chronis Works
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-sm md:text-base">
                Three simple steps to regain control of your life using predictive behavior modeling.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 lg:gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#7c3aed]/20 via-[#7c3aed]/50 to-[#7c3aed]/20 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#131B2E] border-4 border-[#F8FAFC] dark:border-[#0B0F19] shadow-xl shadow-[#7c3aed]/10 flex items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#7c3aed]/30 animate-[spin_10s_linear_infinite]"></div>
                  <span className="font-black text-3xl text-[#7c3aed]">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Log Your Data</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-4">
                    Securely input your daily activities. From sleep hours to focused coding sessions, Chronis safely stores your telemetry.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#131B2E] border-4 border-[#F8FAFC] dark:border-[#0B0F19] shadow-xl shadow-[#7c3aed]/10 flex items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#7c3aed]/30 animate-[spin_10s_linear_infinite_reverse]"></div>
                  <span className="font-black text-3xl text-[#7c3aed]">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">AI Processing</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-4">
                    The Chronis engine, developed by Palash Rai, cross-references your metrics to find hidden productivity drains.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#131B2E] border-4 border-[#F8FAFC] dark:border-[#0B0F19] shadow-xl shadow-[#7c3aed]/10 flex items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#7c3aed]/30 animate-[spin_10s_linear_infinite]"></div>
                  <span className="font-black text-3xl text-[#7c3aed]">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Optimize & Improve</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-4">
                    Follow auto-generated recommendations to adjust your routine, boost your deep work, and enhance overall well-being.
                  </p>
                </div>
              </div>

            </div>
          </section>

        </main>

        {/* ─── PALASH RAI ULTRA FOOTER ─── */}
        <footer className="w-full bg-white dark:bg-[#131B2E] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-8 px-6 lg:px-8 relative z-20 theme-transition">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-6">
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
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Platform</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">About Chronis</a></li>
                <li><a href="#how-it-works" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">How it Works</a></li>
                <li><Link to="/login" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] transition-colors">Sign In / Register</Link></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="md:col-span-4 space-y-4">
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
                Solely Developed by <span className="text-[#7c3aed]">Palash Rai</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Built with</span>
              <Heart size={12} className="text-red-500 animate-pulse fill-red-500" />
              <span>by Palash Rai</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Landing;
