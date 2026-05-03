import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, ShieldCheck, Sprout, CheckCircle2, Leaf, MousePointer2 } from 'lucide-react';
import FloatingParticles from '../components/effects/FloatingParticles';
import T from '../components/T';
import CountUp from '../components/CountUp';
import HowItWorksModal from '../components/HowItWorksModal';

const Home = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY     = useTransform(scrollYProgress, [0, 1], [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const imageY    = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <motion.div
      className="bg-brand-cream min-h-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.38, ease: "easeInOut" }}
    >
      <FloatingParticles />
      <div className="noise-overlay" />

      {/* Animated background dots — purely decorative, do not change theme */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.12)',
            left:  `${[12, 28, 45, 58, 72, 85, 34, 64][i]}%`,
            top:   `${[25, 45, 18, 62, 35, 55, 75, 82][i]}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [-6, 6, -6],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3.5 + i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        <div className="max-w-[1600px] mx-auto w-full px-6 flex flex-col md:flex-row items-center">

          {/* Left Side: Content */}
          <motion.div 
            className="md:w-[45%] z-10 py-12"
            ref={heroRef}
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0  }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="badge-shimmer flex items-center space-x-2 text-brand-green font-bold text-sm uppercase tracking-widest mb-6 bg-brand-green/5 w-fit px-4 py-1.5 rounded-full border border-brand-green/10"
            >
              <Zap size={16} fill="currentColor" />
              <T>Powered by XGBoost + SHAP</T>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black text-brand-dark leading-[0.9] tracking-tighter mb-8 overflow-hidden">
              {['GROW THE', 'RIGHT CROP', 'EVERY TIME.'].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 52, skewY: 4 }}
                  animate={{ opacity: 1, y: 0,  skewY: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.25 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    display: 'block',
                    overflow: 'hidden',  // clips the slide-up effect
                  }}
                >
                  <T>{line}</T>
                </motion.div>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              transition={{ duration: 0.65, delay: 0.62, ease: 'easeOut' }}
              className="text-xl text-brand-olive max-w-lg mb-10 leading-relaxed font-medium"
            >
              <T>Join the next generation of precision farming with AgroXAI — where explainable machine learning meets the field.</T>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.5, delay: 0.78 }}
              style={{ display: 'flex', gap: '12px' }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <Link to="/recommend" className="btn-primary group block">
                  <T>Start Recommendation</T>
                  <ArrowRight className="inline ml-2 transition-transform group-hover:translate-x-1" size={20} />
                </Link>
                <span style={{
                  position: 'absolute',
                  top: 0, bottom: 0,
                  width: '40%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
                  animation: 'none',
                  pointerEvents: 'none',
                }}
                className="btn-shine-sweep"
                />
              </motion.button>
              <motion.button
                onClick={() => setShowHowItWorks(true)}
                whileHover={{ scale: 1.03, borderColor: 'rgba(0,0,0,0.6)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className="px-8 py-3 bg-white border border-brand-olive/10 text-brand-dark rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <T>How it Works</T>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side: Cinematic Image Card */}
          <motion.div 
            className="md:w-[55%] relative mt-12 md:mt-0 -mr-12 md:-mr-24 lg:-mr-32"
            style={{ y: imageY }}
          >
            <motion.div 
              className="relative aspect-video md:aspect-[4/3] lg:aspect-video w-full"
              initial={{ opacity: 0, x: 64, scale: 0.97 }}
              animate={{ opacity: 1, x: 0,  scale: 1    }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative' }}
            >
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0   }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-brand-green rounded-l-[10rem] md:rounded-l-[20rem] rounded-r-3xl overflow-hidden shadow-2xl border-l-[16px] md:border-l-[32px] border-brand-green"
              >
                <img
                  src="/hero_bg.png"
                  alt="Modern Agriculture"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-[20s] hover:scale-110"
                  style={{
                    animation: 'kenBurnsSubtle 18s ease-in-out infinite alternate',
                    transformOrigin: 'center center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.75 }}
                animate={{ opacity: 1, y: 0,   scale: 1    }}
                transition={{
                  duration: 0.6,
                  delay: 0.9,
                  type: 'spring',
                  stiffness: 260,
                  damping: 18,
                }}
                style={{
                  position: 'absolute',
                  animation: 'floatUp 4s ease-in-out infinite',
                  animationDelay: '0s',
                }}
                className="absolute -top-6 left-[10%] glass-card p-4 !rounded-2xl shadow-2xl flex items-center space-x-3 border-brand-gold/20 z-20"
              >
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center relative">
                  <span style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    border: '2px solid rgba(34,197,94,0.5)',
                    animation: 'pulseRingGreen 2s ease-out infinite',
                    pointerEvents: 'none',
                  }}/>
                  <ShieldCheck className="text-brand-gold" size={24} />
                </div>
                <div>
                  <T as="p" className="text-[10px] uppercase font-black text-brand-dark tracking-tighter opacity-40">Precision AI</T>
                  <T as="p" className="text-xs font-bold text-brand-dark">VERIFIED MATCH</T>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.75 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                transition={{
                  duration: 0.6,
                  delay: 1.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 18,
                }}
                style={{
                  position: 'absolute',
                  animation: 'floatUpDelayed 4s ease-in-out infinite',
                  animationDelay: '1.8s',
                }}
                className="absolute -bottom-4 right-[15%] glass-card p-4 !rounded-2xl shadow-2xl flex items-center space-x-3 border-brand-green/20 z-20"
              >
                <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center">
                  <Sprout className="text-brand-green" size={24} />
                </div>
                <div>
                  <T as="p" className="text-[10px] uppercase font-black text-brand-dark tracking-tighter opacity-40">Healthy Growth</T>
                  <T as="p" className="text-xs font-bold text-brand-dark">
                    <CountUp end={98} duration={1.8} delay={1.2} suffix="%" /> OPTIMIZATION
                  </T>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <span style={{
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.3)',
            fontFamily: 'inherit',
          }}>
            Scroll
          </span>
          <motion.div
            style={{
              width: 1,
              height: 28,
              background: 'rgba(0,0,0,0.2)',
              originY: 0,
            }}
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* Bento Preview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="md:col-span-8 glass-card flex flex-col justify-between hover:scale-[1.02] transition-all"
            >
              <div>
                <T as="h3" className="text-4xl font-black text-brand-dark mb-4">Scientific Backing</T>
                <T as="p" className="text-lg text-brand-olive mb-8 max-w-xl">Every prediction is cross-referenced with your local N-P-K soil values and seasonal trends.</T>
              </div>
              <div className="flex gap-4">
                <div className="bg-brand-green/5 px-4 py-2 rounded-xl text-brand-green font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} /><T>Explainable AI</T>
                </div>
                <div className="bg-brand-gold/5 px-4 py-2 rounded-xl text-brand-gold font-bold text-sm flex items-center gap-2">
                  <Leaf size={16} /><T>Eco-Optimized</T>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
              className="md:col-span-4 bg-brand-dark p-8 rounded-[2rem] flex flex-col justify-between group hover:scale-[1.02] transition-all"
            >
              <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12">
                <MousePointer2 className="text-brand-gold" size={32} />
              </div>
              <div>
                <T as="h3" className="text-3xl font-black text-white mb-4">Quick Analysis</T>
                <T as="p" className="text-white/60 text-sm leading-relaxed mb-6">Input farm metrics in under a minute and get instant results.</T>
                <div style={{ display: 'inline-block' }}>
                  <Link to="/recommend" className="text-brand-green font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    <T>Try now</T> <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </motion.div>
  );
};

export default Home;
