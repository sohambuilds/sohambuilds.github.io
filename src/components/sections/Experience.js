import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  BriefcaseIcon,
  ArrowUpRight,
  GraduationCap,
  Code,
  Building,
} from "lucide-react";

const ExperienceCard = ({ experience, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const bgGradient = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX * 100}% ${mouseY * 100}%,
      rgba(96, 165, 250, 0.1),
      rgba(0, 0, 0, 0) 40%
    )
  `;

  // Choose icon based on experience type
  let icon = <BriefcaseIcon className="w-8 h-8 text-accent" />;
  if (experience.type === "Research") {
    icon = <Code className="w-8 h-8 text-accent" />;
  } else if (experience.type === "Internship") {
    icon = <Building className="w-8 h-8 text-accent" />;
  } else if (experience.type === "Education") {
    icon = <GraduationCap className="w-8 h-8 text-accent" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative mb-16 last:mb-0"
    >
      {/* Timeline line */}
      {index !== 0 && (
        <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-accent/50 to-transparent" />
      )}

      <div className="group relative grid md:grid-cols-[theme(spacing.16)_1fr] gap-8">
        {/* Timeline node */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center"
          >
            {icon}
          </motion.div>
        </div>

        {/* Content Card */}
        <div className="relative">
          <motion.div
            whileHover={{ y: -4 }}
            onMouseMove={handleMouseMove}
            style={{
              background: bgGradient,
            }}
            className="relative p-8 rounded-2xl bg-background-light/50 backdrop-blur-sm border border-gray-800 hover:border-accent/50 transition-colors duration-300 overflow-hidden"
          >
            {/* Role Type Badge - Mobile-optimized */}
            <div className="md:absolute md:top-6 md:right-6 text-sm text-accent/90 bg-accent/10 px-4 py-1.5 rounded-full font-medium max-md:mb-4 max-md:inline-block">
              {experience.type}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors md:pr-32 max-md:pr-0">
                  {experience.title}
                </h3>
                <p className="text-lg text-gray-400 mt-1">
                  {experience.company}
                </p>
                <p className="text-accent mt-2">{experience.period}</p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                {Array.isArray(experience.description) ? (
                  experience.description.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-accent mt-1.5">•</span>
                      <p className="text-gray-400 text-lg">{item}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-lg">
                    {experience.description}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-sm text-gray-300 bg-background/60 px-4 py-1.5 rounded-full border border-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Learn More Link */}
              {experience.link && (
                <a
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 text-accent cursor-pointer hover:text-accent/80 transition-colors"
                  >
                    Learn more <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </a>
              )}
            </div>

            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
                backgroundSize: "80px 80px",
                backgroundColor: "transparent",
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Research Member",
      company: "RespAI Lab",
      period: "June 2024 - Present",
      description:
        "Pursuing research in Machine Unlearning and Copyright Protection for Diffusion Models, focusing on Responsible AI implementation.",
      skills: ["Machine Learning", "Diffusion Models", "Computer Vision"],
      link: "https://respailab.github.io",
      type: "Research",
    },
    {
      title: "NLP Intern",
      company: "IIT Bhubaneswar",
      period: "Dec 2024 - Jan 2025",
      description:
        "Worked under Dr. Shreya Ghosh, optimizing a dataset for finetuning large language models to work efficiently with travel planning.",
      skills: ["Natural Language Processing", "LLMs", "Data Processing"],
      type: "Internship",
    },
    {
      title: "Technical Executive: AI/ML",
      company: "Microsoft Learn Student Ambassadors",
      period: "Jan 2024 - Present",
      description: [
        "Developed and led an open-source framework for fine-tuning Stable Diffusion using LoRA, scaling to 10+ active contributors",
        "Engineered Wear-AI-ble, a generative AI application leveraging Stable Diffusion for custom T-shirt design generation",
        "Implemented DDQN reinforcement learning framework for Super Mario with custom reward shaping",
        "Demonstrated live MITM attack at D3FCON cybersecurity event to 400+ audience",
      ],
      skills: [
        "PyTorch",
        "Stable Diffusion",
        "Reinforcement Learning",
        "Leadership",
      ],
      link: "https://mlsakiit.com",
      type: "Technical Leadership",
    },
  ];

  return (
    <section id="experience" className="relative py-32">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Decorative elements */}
      <div
        className="absolute left-0 top-1/3 w-64 h-64 rounded-full opacity-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        className="absolute right-0 bottom-1/3 w-72 h-72 rounded-full opacity-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6">
            <BriefcaseIcon className="h-4 w-4 text-accent" />
            <span className="text-accent text-sm font-medium">Career Path</span>
          </div>

          <h2 className="heading-2 mb-6">Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My journey in machine learning research and technical leadership.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <div className="grid md:grid-cols-[theme(spacing.16)_1fr] gap-8">
            {/* Icon node */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-indigo-400" />
              </div>
            </div>

            {/* Education Card */}
            <div className="p-8 rounded-2xl bg-background-light/50 backdrop-blur-sm border border-gray-800">
              <div className="md:absolute md:top-6 md:right-6 text-sm text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full font-medium max-md:mb-4 max-md:inline-block">
                Education
              </div>

              <h3 className="text-2xl font-semibold text-white md:pr-32">
                Kalinga Institute of Industrial Technology (KIIT DU)
              </h3>
              <p className="text-indigo-400 mt-2">2023 - 2027</p>

              <div className="mt-4">
                <p className="text-gray-400 text-lg">
                  B.Tech in Computer Science and Engineering
                </p>
                
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
