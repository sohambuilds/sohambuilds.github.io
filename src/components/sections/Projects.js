import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink, Code, Cpu, Sparkles } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Random tech icon selection
  const icons = [
    <Cpu size={16} className="text-cyan-400" />,
    <Code size={16} className="text-blue-400" />,
    <Sparkles size={16} className="text-indigo-400" />,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-gradient-to-br from-background-light/40 to-background-light/10 backdrop-blur-sm border border-gray-800 hover:border-accent/30 rounded-xl overflow-hidden transition-all duration-500">
        {/* Tech badge */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-800/50">
          {icons[index % icons.length]}
          <span className="text-xs text-gray-300 font-medium">
            {project.technologies[0]}
          </span>
        </div>

        {/* Gradient hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="p-8 h-full flex flex-col">
          <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors duration-300 mb-3">
            {project.title}
          </h3>

          <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-xs py-1 px-2.5 rounded-md bg-white/5 border border-gray-800/50 text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 mt-auto">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">Source Code</span>
              </motion.a>
            )}

            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <ExternalLink className="h-5 w-5" />
                <span className="text-sm">Live Demo</span>
              </motion.a>
            )}
          </div>

          {/* Animated glow effect on hover */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              isHovered ? "opacity-20" : "opacity-0"
            }`}
          >
            <div className="absolute inset-[-100px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const projects = [
    {
      title: "ForgeTube",
      description:
        "Built an end-to-end prompt to YouTube video generation pipeline utilizing an agentic AI framework powered with a video assembly engine.",
      technologies: ["Agentic AI", "Video Generation", "Python", "LLMs"],
      github: "https://github.com/MLSAKIIT/ForgeTube",
      featured: true,
    },
    {
      title: "Diffusion Fine-tuning Framework",
      description:
        "Custom repository for fine-tuning Stable Diffusion 1.4 using LoRA with advanced training pipelines and optimization techniques.",
      technologies: ["PyTorch", "Diffusers", "LoRA", "HuggingFace"],
      github: "https://github.com/MLSAKIIT/stablediffusionlora",
      featured: true,
    },
    {
      title: "Automatic Interview Evaluation System",
      description:
        "Built a retrieval based automatic interview evaluation framework for PS 1653 from DRDO (SIH 2024) using RAG pipeline with LangChain and FAISS.",
      technologies: ["LangChain", "FAISS", "RAG", "LLMs"],
      github: "https://github.com/sohambuilds/interview_eval",
      featured: true,
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-32 overflow-hidden"
      ref={containerRef}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute right-0 top-[20%] w-64 h-64 rounded-full opacity-10 hidden md:block"
        style={{
          y: y1,
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(50px)",
        }}
      />

      <motion.div
        className="absolute left-0 bottom-[30%] w-80 h-80 rounded-full opacity-10 hidden md:block"
        style={{
          y: y2,
          rotate,
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-2 mb-6">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A selection of my technical projects showcasing machine learning
            implementation and research applications.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* More Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/sohambuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent border border-accent/30 hover:bg-accent/10 px-6 py-3 rounded-lg transition-all duration-300"
          >
            <span>View More on GitHub</span>
            <Github className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
