import { Link } from 'react-router-dom';
import { Activity, BrainCircuit, Calendar } from 'lucide-react';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const Landing = () => {
  const comp = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-item", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
      gsap.from(".feature-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: "power2.out"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="z-10 text-center px-6 max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="hero-item text-6xl md:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Chronis
          </h1>
          <p className="hero-item text-xl md:text-2xl text-textSecondary max-w-2xl mx-auto font-light">
            Understand yourself through your behavior. Track, analyze, and discover meaningful insights from your daily data.
          </p>
        </div>

        <div className="hero-item flex flex-wrap justify-center gap-6">
          <Link to="/register" className="px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/25">
            Get Started
          </Link>
          <Link to="/login" className="px-8 py-4 bg-surface text-textPrimary font-medium rounded-full border border-white/10 hover:bg-white/5 transition-transform hover:scale-105">
            Login
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-16">
          <div className="feature-card bg-card/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <Activity className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">Track Metrics</h3>
            <p className="text-textSecondary text-sm">Monitor sleep, screen time, exercise, and deep work seamlessly.</p>
          </div>
          <div className="feature-card bg-card/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <BrainCircuit className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">AI Insights</h3>
            <p className="text-textSecondary text-sm">Discover hidden correlations between your habits and productivity.</p>
          </div>
          <div className="feature-card bg-card/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <Calendar className="w-10 h-10 text-warning mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">Visual Timelines</h3>
            <p className="text-textSecondary text-sm">View your behavioral narrative over time with beautiful charts.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
