import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import './App.css';

const GlowingButton = ({ children, isActive, onClick }) => {
  const buttonRef = useRef(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setGlowPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`glowing-button ${isActive ? 'active' : ''}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <span className="button-content">{children}</span>
      <div
        className="glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      />
    </motion.button>
  );
};

const GlowingIcon = ({ Icon }) => {
  return (
    <motion.div
      className="glowing-icon"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <Icon size={24} />
    </motion.div>
  );
};

const Project3DCard = ({ project }) => {
  const cardRef = useRef(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Adjust these values to control the intensity of the effect
    const rotateXValue = mouseY / 15;
    const rotateYValue = mouseX / 15;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);

    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const springConfig = { damping: 28, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      ref={cardRef}
      className="project-card glowing-card bg-custom-button p-6 rounded-lg border border-custom-outline"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
      }}
    >
      <div className="card-content">
        <h3 className="text-xl font-styrene-bold mb-2">{project.name}</h3>
        <p className="font-styrene text-custom-body mb-4">{project.description}</p>
        <motion.a
          href={project.link}
          className="inline-flex items-center font-styrene text-blue-400 hover:text-blue-300 transition-colors"
          whileHover={{ x: 5 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          View Project <ExternalLink size={16} className="ml-2" />
        </motion.a>
      </div>
      <div
        className="glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      />
    </motion.div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('bio');

  const projects = [
    { name: 'Easy 4o 🤖', description: 'Roblox Module for AI chatbots.', link: 'https://www.roblox.com/users/1779591156/profile' },
  ];

  useEffect(() => {
    document.fonts.ready.then(() => {
      document.body.style.opacity = '1';
    });
  }, []);

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <header className="flex items-center mb-12">
          <div className="profile-picture-container">
            <img
              src="src/assets/Profile.png"
              alt="Profile"
            />
          </div>
          <div className="ml-6">
            <h1 className="text-4xl font-styrene-bold mb-2">Ghost</h1>
            <p className="text-xl text-custom-body font-styrene">Game Developer & Designer</p>
          </div>
        </header>

        <nav className="mb-12">
          <ul className="flex space-x-4">
            {['bio', 'projects'].map((section) => (
              <li key={section}>
                <GlowingButton
                  isActive={activeSection === section}
                  onClick={() => setActiveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </GlowingButton>
              </li>
            ))}
          </ul>
        </nav>

        <motion.main
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {activeSection === 'bio' && (
            <section>
              <h2 className="text-2xl font-styrene-bold mb-4">About Me</h2>
              <p className="font-styrene text-custom-body mb-6">
               Hey! 👋 I'm a passionate Roblox game developer and designer with a love for AI and backend development. 💻 The only real programming language I'm good at is Luau, although I do some have knowledge in Python and JavaScript. 🐍
                <br /> <br /> 
                Easy-4o 🤖: This is a project I've started recently. ✒️ It's not completed but hopefully it will be soon! 🤞 This module gives you the ability to create AI chatbots in Roblox. 🚀
              </p>
            </section>
          )}

          {activeSection === 'projects' && (
            <section>
              <h2 className="text-2xl font-styrene-bold mb-6">My Projects</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                  <Project3DCard key={index} project={project} />
                ))}
              </div>
            </section>
          )}
        </motion.main>
      </motion.div>
    </div>
  );
};

export default App;