import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background-light py-8">
      <div className="section-container">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/sohambuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/sohamr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:sohamroy.dev@gmail.com"
              className="text-secondary hover:text-white transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} Soham Roy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
