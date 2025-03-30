import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  FileText,
  Terminal,
} from "lucide-react";
import { fadeIn, fadeInUp, stagger } from "../../utils/animations";
import HeroBackground from "../effects/HeroBackground";

// Components for the mathematical equation display
const MathEquation = ({ children }) => (
  <div className="font-mono text-sm text-gray-400 bg-background/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-800/50 inline-block whitespace-nowrap overflow-hidden">
    {children}
  </div>
);

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-3deg", "3deg"]);
  const translateX = useTransform(x, [-0.5, 0.5], ["-3px", "3px"]);
  const translateY = useTransform(y, [-0.5, 0.5], ["-3px", "3px"]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (event.clientX - centerX) / rect.width;
    const normalizedY = (event.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  // ML researcher skill keywords for visual emphasis
  const mlKeywords = [
    "Computer Vision",
    "NLP",
    "Reinforcement Learning",
    "Diffusion Models",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full">
        <HeroBackground />
      </div>

      {/* Main Content */}
      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="md:col-span-3"
          >
            {/* Diffusion Model equations positioned strategically around the content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -left-4 top-5 transform rotate-[-5deg] z-[-1] opacity-40 hidden md:block"
            >
              <MathEquation>{"x_t = √α_t x_0 + √(1-α_t) ε"}</MathEquation>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute left-36 bottom-24 transform rotate-[2deg] z-[-1] opacity-40 hidden md:block"
            >
              <MathEquation>
                {"p_θ(x_{t-1}|x_t) = 𝒩(x_{t-1}; μ_θ(x_t,t), Σ_θ(x_t,t))"}
              </MathEquation>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="absolute right-12 top-10 transform rotate-[4deg] z-[-1] opacity-40 hidden md:block"
            >
              <MathEquation>
                {"L = E_{t,x_0,ε}[||ε - ε_θ(x_t,t)||²]"}
              </MathEquation>
            </motion.div>

            {/* ML Researcher Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6"
            >
              <Terminal className="h-4 w-4 text-accent" />
              <span className="text-accent text-sm font-medium">
                ML Researcher
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={fadeInUp} className="heading-1 mb-4">
              Soham Roy
            </motion.h1>

            {/* Role Description */}
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-medium mb-6"
            >
              UG Researcher @ RespAI Lab
            </motion.h2>

            {/* Bio */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-400 mb-6 leading-relaxed"
            >
              Machine Learning Researcher and Computer Science sophomore with
              published IEEE research. Currently conducting research at RespAI
              Lab on Diffusion Models and Vision-Language Models. Research
              contributor with publications in Diffusion Models and RAG
              systems, combining strong theoretical foundations with practical
              ML implementation across CV, NLP, and RL domains.
            </motion.p>

            {/* ML Keywords */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 mb-8"
            >
              {mlKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="text-sm text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-md"
                >
                  {keyword}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#contact"
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
              >
                Get in Touch
              </a>
              <a
                href="#research"
                className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105 group flex items-center gap-2"
              >
                <span>View Research</span>
                <FileText className="h-4 w-4 text-gray-400 group-hover:text-accent" />
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex gap-6">
              <a
                href="https://github.com/sohambuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/sohamr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:sohamroy.dev@gmail.com"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-6 w-6" />
              </a>
            </motion.div>
          </motion.div>

          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 relative hidden md:block"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            <div className="relative w-[400px] h-[360px] mx-auto">
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  translateX,
                  translateY,
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                className="w-full h-full"
              >
                {/* Abstract ML visualization elements */}
                <div className="absolute -right-16 -top-10 w-32 h-32 border border-blue-500/20 rounded-full mix-blend-plus-lighter animate-pulse opacity-30"></div>
                <div
                  className="absolute -left-8 bottom-10 w-16 h-16 border border-indigo-500/20 rounded-full mix-blend-plus-lighter animate-pulse opacity-20"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Far Outer Glow */}
                <div className="absolute -inset-12 bg-gradient-to-r from-cyan-500/[0.04] via-blue-500/[0.04] to-indigo-600/[0.04] rounded-[32px] blur-3xl opacity-60" />

                {/* Main Image Container with Border */}
                <div className="relative w-full h-full">
                  {/* Animated Border Container */}
                  <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-indigo-600/40 animate-border-rotate blur-[0.4px]" />

                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-background m-[2px]">
                      <img
                        src="../assets/images/Headshot.jpeg"
                        alt="Soham Roy"
                        className="w-full h-full object-cover rounded-2xl filter brightness-95 hover:brightness-100 transition-all duration-300"
                      />

                      {/* Subtle Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-background/30 via-transparent to-transparent rounded-2xl" />

                      {/* Ultra-Subtle Inner Glow on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.05] via-transparent to-indigo-600/[0.05] opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-2xl blur-xl" />
                    </div>
                  </div>

                  {/* Ambient Glow Following Mouse */}
                  <div
                    className="absolute -inset-16 rounded-[40px] blur-3xl opacity-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${
                        50 + mousePosition.x * 30
                      }% ${
                        50 + mousePosition.y * 30
                      }%, rgba(56, 189, 248, 0.06), transparent 70%)`,
                    }}
                  />

                  {/* Additional Diffused Glow */}
                  <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/[0.02] via-blue-600/[0.02] to-indigo-600/[0.02] rounded-[30px] blur-2xl opacity-40" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Prompt */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;