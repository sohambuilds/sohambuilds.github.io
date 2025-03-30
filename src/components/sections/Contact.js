import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "sohamroy.dev@gmail.com";

  const copyToClipboard = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent_50%)] animate-[pulse_4s_ease-in-out_infinite]" />

      <div className="section-container relative">
        <motion.div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-2 mb-6"
            >
              Let's Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg"
            >
              Currently open to ML Engineering and Research Internship opportunities.
            </motion.p>
          </div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 via-accent/20 to-accent/50 rounded-2xl blur-xl opacity-30" />
            
            {/* Main container */}
            <div className="relative p-8 bg-background-light/50 backdrop-blur-xl rounded-2xl border border-accent/20">
              {/* Email Card */}
              <div className="group flex flex-col md:flex-row items-center justify-between p-6 bg-background/40 rounded-xl border border-gray-800 mb-6 hover:border-accent/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/15 transition-all duration-300">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">{email}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(email, setCopied)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Email
                    </>
                  )}
                </motion.button>
              </div>

              {/* Social Links */}
              <div className="grid md:grid-cols-2 gap-4">
                <SocialLink 
                  icon={<Github className="w-5 h-5" />}
                  title="GitHub"
                  username="sohambuilds"
                  href="https://github.com/sohambuilds"
                />
                <SocialLink 
                  icon={<Linkedin className="w-5 h-5" />}
                  title="LinkedIn"
                  username="sohamr"
                  href="https://linkedin.com/in/sohamr"
                />
              </div>
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mt-12"
          >
            Based in India • Open to Remote Opportunities
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const SocialLink = ({ icon, title, username, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="group flex items-center justify-between p-5 bg-background/40 rounded-xl border border-gray-800 hover:border-accent/50 transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      <div className="p-2.5 bg-accent/10 rounded-lg group-hover:bg-accent/15 transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {title}
        </p>
        <p className="text-gray-300 group-hover:text-accent transition-colors duration-300">
          @{username}
        </p>
      </div>
    </div>
    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors duration-300" />
  </motion.a>
);

export default Contact;