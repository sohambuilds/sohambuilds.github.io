import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, FileText, BarChart2 } from "lucide-react";

const Research = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const papers = [
    {
      title:
        "Guardians of Generation: Dynamic Inference-Time Copyright Shielding with Adaptive Guidance for AI Image Generation",
      description:
        "A model agnostic framework using mixed-weight CFG to prevent copyrighted generations in Diffusion Models",
      abstract:
        "This paper presents a novel inference-time approach to prevent the generation of copyrighted content in diffusion models without requiring model retraining. Using adaptive classifier-free guidance mixing, our method dynamically shields against protected content while preserving model performance on non-protected generations.",
      status: "Preprint 2025",
      technologies: [
        "Diffusion Models",
        "Copyright Protection",
        "Responsible AI",
      ],
      type: "Preprint",
      link: "https://arxiv.org/abs/2503.16171",
      icon: <FileText className="w-5 h-5 text-indigo-400" />,
    },
    {
      title:
        "Conversational Text Extraction with Large Language Models Using Retrieval-Augmented Systems",
      description:
        "Built an efficient RAG system achieving improved text extraction accuracy through hybrid retrieval mechanisms",
      abstract:
        "We propose a novel retrieval-augmented framework for enhancing the text extraction capabilities of large language models in conversational contexts. By implementing a hybrid retrieval mechanism that combines semantic and lexical search methodologies, our approach demonstrates significant improvements in extraction accuracy while reducing hallucination rates.",
      status: "IEEE CINE 2024",
      technologies: ["RAG", "LLMs", "Information Retrieval"],
      type: "Conference",
      link: "https://arxiv.org/abs/2501.09801",
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
    },
  ];

  return (
    <section id="research" className="relative py-32">
      {/* Decorative elements */}
      <div
        className="absolute left-0 top-1/4 w-72 h-72 rounded-full opacity-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full opacity-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full mb-6">
            <BarChart2 className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">
              Scientific Research
            </span>
          </div>

          <h2 className="heading-2 mb-6">Research Publications</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Contributing to the fields of Machine Learning and Natural Language
            Processing through published research and ongoing studies.
          </p>
        </motion.div>

        {/* Papers List - Vertical Timeline Style */}
        <div className="max-w-5xl mx-auto">
          {papers.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline connector */}
              {index !== papers.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-indigo-500/30 to-transparent"></div>
              )}

              <div className="grid md:grid-cols-[theme(spacing.16)_1fr] gap-8">
                {/* Icon node */}
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center"
                  >
                    {paper.icon}
                  </motion.div>
                </div>

                {/* Paper Card */}
                <div>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative group bg-gradient-to-br from-background-light/40 to-background-light/5 backdrop-blur-sm border border-gray-800 hover:border-indigo-500/30 rounded-xl p-8 transition-all duration-300"
                  >
                    {/* Paper Type Badge */}
                    <div className="md:absolute md:top-6 md:right-6 text-sm text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full font-medium max-md:mb-4 max-md:inline-block">
                      {paper.type}
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group-hover:text-indigo-400 transition-colors duration-300"
                        >
                          <h3 className="text-2xl font-semibold pr-20 md:pr-32">
                            {paper.title}
                          </h3>
                        </a>

                        <p className="text-indigo-400 mt-2">{paper.status}</p>
                      </div>

                      {/* Description with expandable abstract */}
                      <div className="space-y-3">
                        <p className="text-gray-400 text-lg">
                          {paper.description}
                        </p>

                        {/* Expandable abstract */}
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={
                            activeIndex === index
                              ? { height: "auto", opacity: 1 }
                              : { height: 0, opacity: 0 }
                          }
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-1 text-gray-500 border-t border-gray-800/50 font-light italic">
                            {paper.abstract}
                          </div>
                        </motion.div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {paper.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs py-1 px-2.5 rounded-md bg-white/5 border border-gray-800/50 text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      <div className="flex justify-between pt-4 border-t border-gray-800/50">
                        <span className="text-sm text-gray-500">
                          {activeIndex === index
                            ? "Abstract shown"
                            : "Hover for abstract"}
                        </span>

                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          <span>View paper</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Research Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-8 py-6 rounded-2xl border border-blue-500/20">
            <p className="text-gradient bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-medium text-lg">
              Currently researching Machine Unlearning and Copyright Protection
              for Diffusion Models at RespAI Lab
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
