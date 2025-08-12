import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, Check, ExternalLink, ChevronDown, Database, BarChart3, Brain, X } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{command: string, output: string}>>([]);
  const [currentDirectory, setCurrentDirectory] = useState('~/career');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Ensure page always starts at the top on load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    // Clear any hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const handleTerminalCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case 'help':
        output = `Available commands:
• ls - List career files and directories
• cat <file> - View file contents (e.g., cat about.txt)
• cd <directory> - Change directory
• pwd - Show current directory
• whoami - Show personal info
• skills - Display technical skills
• experience - Show work experience
• education - Display education background
• projects - List projects
• contact - Show contact information
• clear - Clear terminal
• help - Show this help message`;
        break;

      case 'ls':
        output = `about.txt
skills/
experience/
education/
projects/
contact.txt
resume.pdf`;
        break;

      case 'pwd':
        output = currentDirectory;
        break;

      case 'me':
        output = `DHEEPAK KARAN ES
Data Scientist & Machine Learning Engineer
Location: India
Email: dheepak@example.com
LinkedIn: linkedin.com/in/dheepak-karan-es`;
        break;

      case 'bio':
        output = `DHEEPAK KARAN ES
===================

Passionate Data Scientist with 3+ years of experience in machine learning, 
statistical analysis, and data engineering. Specialized in developing 
predictive models and data-driven solutions for business problems.

Core Competencies:
• Machine Learning & AI
• Statistical Analysis
• Data Engineering
• Business Intelligence
• Cloud Technologies

Currently working on advanced analytics projects and exploring 
cutting-edge AI technologies.`;
        break;

      case 'bits':
        output = `TECHNICAL SKILLS
================

Programming Languages:
• Python (Advanced)
• R (Intermediate)
• SQL (Advanced)
• JavaScript (Basic)

Machine Learning:
• Scikit-learn, TensorFlow, PyTorch
• XGBoost, LightGBM
• Natural Language Processing
• Computer Vision

Data Engineering:
• Apache Spark, Hadoop
• Kafka, Redis
• Docker, Kubernetes
• AWS, Azure, GCP

Visualization & BI:
• Tableau, Power BI
• Matplotlib, Seaborn, Plotly
• Streamlit, Dash

Databases:
• PostgreSQL, MySQL
• MongoDB, Redis
• Elasticsearch`;
        break;

      case 'grind':
        output = `WORK EXPERIENCE
================

Senior Data Scientist | TechCorp Inc.
2022 - Present
• Led machine learning projects with 95%+ accuracy
• Reduced operational costs by $2.1M annually
• Mentored 5 junior data scientists
• Implemented real-time fraud detection system

Data Scientist | DataFlow Solutions
2021 - 2022
• Developed customer churn prediction models
• Built automated reporting dashboards
• Improved customer retention by 23%
• Created A/B testing frameworks

Junior Data Analyst | AnalyticsPro
2020 - 2021
• Performed data cleaning and preprocessing
• Created interactive visualizations
• Assisted in statistical analysis
• Generated weekly business reports`;
        break;

      case 'creds':
        output = `EDUCATION
==========

Master of Science in Data Science
University of Technology | 2020
• GPA: 3.8/4.0
• Thesis: "Advanced Anomaly Detection in Financial Data"
• Relevant Coursework: Machine Learning, Statistics, Big Data

Bachelor of Technology in Computer Science
Engineering Institute | 2018
• GPA: 3.7/4.0
• Final Project: "Predictive Analytics for E-commerce"
• Dean's List: 3 semesters

Certifications:
• AWS Certified Machine Learning - Specialty
• Google Cloud Professional Data Engineer
• Microsoft Azure Data Scientist Associate
• TensorFlow Developer Certificate`;
        break;

      case 'works':
        output = `PROJECTS PORTFOLIO
===================

1. Customer Churn Prediction System
   • Achieved 89% prediction accuracy
   • Saved $2.1M annually
   • Technologies: Python, XGBoost, TensorFlow

2. Real-time Fraud Detection
   • 99.2% fraud detection rate
   • Processes 10K+ transactions/second
   • Technologies: Apache Spark, Kafka, Redis

3. Sales Forecasting Dashboard
   • 95% forecast accuracy
   • Real-time insights and reporting
   • Technologies: Prophet, ARIMA, Streamlit

4. Market Basket Analysis
   • Increased cross-sales by 18%
   • Optimized product placement
   • Technologies: Apriori Algorithm, R, Tableau

5. A/B Testing Platform
   • Automated 200+ experiments
   • Reduced testing time by 60%
   • Technologies: Statistical Testing, Docker, AWS`;
        break;

      case 'connect':
        output = `CONTACT INFORMATION
====================

Email: dheepak@example.com
LinkedIn: linkedin.com/in/dheepak-karan-es
GitHub: github.com/dheepak-karan-es
Phone: +91-98765-43210
Location: Bangalore, India

Available for:
• Full-time opportunities
• Freelance projects
• Consulting work
• Speaking engagements`;
        break;

      case 'clear':
        setTerminalHistory([]);
        return;

      case '':
        return;

      default:
        if (cmd.startsWith('cat ')) {
          output = `File not found: ${cmd.substring(4)}
Use 'ls' to see available files.`;
        } else if (cmd.startsWith('cd ')) {
          const dir = cmd.substring(3);
          if (dir === '..' || dir === '~' || dir === '~/career' || dir.includes('/')) {
            setCurrentDirectory('~/career');
            output = `Changed directory to ~/career`;
          } else {
            output = `Directory not found: ${dir}
Use 'ls' to see available directories.`;
          }
        } else {
          output = `Command not found: ${command}
Type 'help' for available commands.`;
        }
    }

    setTerminalHistory(prev => [...prev, { command, output }]);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      handleTerminalCommand(terminalInput);
      setTerminalInput('');
    }
  };

  const skills = [
    ['Python', 'R', 'SQL', 'Pandas', 'NumPy'],
    ['Scikit-Learn', 'TensorFlow', 'PyTorch', 'Keras', 'XGBoost'],
    ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'Plotly'],
    ['AWS', 'Azure', 'GCP', 'Docker', 'Apache Spark']
  ];

  const projects = [
    {
      title: 'Customer Churn Prediction',
      subtitle: 'Machine Learning Model',
      description: 'Predictive model using ensemble methods to identify at-risk customers',
      detailedDescription: 'Developed a comprehensive customer churn prediction system using machine learning algorithms. The model achieved 89% accuracy in identifying customers likely to churn within 30 days. Implemented feature engineering techniques and used ensemble methods including Random Forest, XGBoost, and Neural Networks.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'XGBoost', 'TensorFlow'],
      outcomes: ['89% prediction accuracy', 'Reduced churn by 23%', 'Saved $2.1M annually'],
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      title: 'Sales Forecasting Dashboard',
      subtitle: 'Time Series Analysis',
      description: 'Interactive dashboard with ARIMA and Prophet models for revenue prediction',
      detailedDescription: 'Built an interactive sales forecasting dashboard that predicts revenue trends using time series analysis. Integrated multiple forecasting models including ARIMA, Prophet, and LSTM networks. The dashboard provides real-time insights and automated reporting capabilities.',
      technologies: ['Python', 'Prophet', 'ARIMA', 'Plotly', 'Streamlit', 'PostgreSQL'],
      outcomes: ['95% forecast accuracy', 'Automated reporting', 'Real-time insights'],
      icon: <Database className="w-8 h-8" />
    },
    {
      title: 'Fraud Detection System',
      subtitle: 'Anomaly Detection',
      description: 'Real-time fraud detection using isolation forests and neural networks',
      detailedDescription: 'Implemented a real-time fraud detection system that processes thousands of transactions per second. Used isolation forests, autoencoders, and deep learning models to detect fraudulent patterns. The system provides instant alerts and detailed risk scoring.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Apache Spark', 'Kafka', 'Redis'],
      outcomes: ['99.2% fraud detection rate', 'Real-time processing', 'Reduced false positives by 45%'],
      icon: <Brain className="w-8 h-8" />
    },
    {
      title: 'Market Basket Analysis',
      subtitle: 'Association Rules Mining',
      description: 'Customer behavior analysis using Apriori algorithm for cross-selling',
      detailedDescription: 'Conducted comprehensive market basket analysis to understand customer purchasing patterns. Implemented Apriori algorithm and association rule mining to identify product relationships. Results were used to optimize product placement and cross-selling strategies.',
      technologies: ['Python', 'R', 'Apriori Algorithm', 'Tableau', 'SQL', 'Pandas'],
      outcomes: ['Increased cross-sales by 18%', 'Optimized product placement', 'Enhanced customer experience'],
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      title: 'A/B Testing Platform',
      subtitle: 'Statistical Analysis',
      description: 'Automated A/B testing framework with statistical significance testing',
      detailedDescription: 'Developed an automated A/B testing platform that handles experiment design, data collection, and statistical analysis. The platform supports multiple testing methodologies and provides comprehensive reporting with confidence intervals and effect sizes.',
      technologies: ['Python', 'R', 'Statistical Testing', 'Docker', 'AWS', 'React'],
      outcomes: ['Automated 200+ experiments', 'Reduced testing time by 60%', 'Improved decision making'],
      icon: <Database className="w-8 h-8" />
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation Menu */}
      <nav className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 transition-all duration-300 ${
        darkMode ? 'bg-[#1e1e1e]/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">DK</div>
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`text-sm md:text-base transition-all duration-300 hover:scale-105 ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`text-sm md:text-base transition-all duration-300 hover:scale-105 ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('terminal')}
              className={`text-sm md:text-base transition-all duration-300 hover:scale-105 ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Terminal
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/20' 
                  : 'bg-gray-900/10 hover:bg-gray-900/20'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-center space-y-4 order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 leading-tight">
              DHEEPAK
              <br />
              KARAN ES
            </h1>
            <h2 className="text-lg md:text-xl lg:text-3xl mb-4 tracking-wide font-light">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                AI ENGINEER
              </span>
            </h2>
            
            <p className={`text-base md:text-lg mb-4 leading-relaxed max-w-lg font-light ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Data-driven professional skilled in analytics, 
              machine learning, and cloud technologies.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <img 
                src="/lalalei/marcus-portrait.png"
                alt="Marcus Rodriguez - Data Scientist"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-[32rem] lg:h-[32rem] object-contain rounded-full"
              />
            </div>
          </div>
        </div>

        
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">PROJECTS</h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {projects.map((project, index) => (
              <div 
                key={index} 
                onClick={() => openProjectModal(project)}
                className={`backdrop-blur-sm rounded-lg p-4 transition-all duration-300 group cursor-pointer transform hover:scale-105 ${
                  darkMode 
                    ? 'bg-white/10 hover:bg-white/15' 
                    : 'bg-gray-900/10 hover:bg-gray-900/15'
                }`}
              >
                <h3 className="text-base font-bold mb-1">{project.title}</h3>
                <h4 className={`text-xs font-medium mb-2 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>{project.subtitle}</h4>
                <p className={`text-xs leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{project.description}</p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className={`w-3 h-3 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeProjectModal}
          ></div>
          
          {/* Modal Content */}
          <div className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-8 ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
                  darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Project Icon */}
            <div className={`mb-6 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {selectedProject.icon}
            </div>
            
            {/* Project Title */}
            <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
            <h3 className={`text-xl font-medium mb-6 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>{selectedProject.subtitle}</h3>
            
            {/* Detailed Description */}
            <p className={`text-lg leading-relaxed mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>{selectedProject.detailedDescription}</p>
            
            {/* Technologies */}
            <div className="mb-6">
              <h4 className={`text-lg font-semibold mb-3 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech: string, index: number) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Outcomes */}
            <div>
              <h4 className={`text-lg font-semibold mb-3 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>Key Outcomes</h4>
              <ul className="space-y-2">
                {selectedProject.outcomes.map((outcome: string, index: number) => (
                  <li key={index} className={`flex items-center gap-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <Check className="w-4 h-4 text-green-400" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Section */}
      <section id="terminal" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">TERMINAL</h2>
          
          <div className={`rounded-2xl overflow-hidden shadow-2xl ${
            darkMode ? 'bg-gray-600' : 'bg-gray-100'
          }`}>
            {/* Terminal Header */}
            <div className={`flex items-center justify-between px-6 py-3 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className={`text-sm font-mono ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                dhee@terminal:~$
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className={`p-6 font-mono text-sm ${
              darkMode ? 'text-gray-100' : 'bg-gray-100 text-gray-800'
            }`} style={{ 
              minHeight: '400px',
              backgroundColor: darkMode ? '#1e1e1e' : undefined
            }}>
              {/* Welcome Message */}
              {terminalHistory.length === 0 && (
                <div className="mb-4">
                  <div className="text-blue-400">Welcome to DHEEPAK's Career Terminal!</div>
                  <div className="text-gray-500 mt-2">Type 'help' to see available commands.</div>
                  <div className="text-gray-500">Type 'ls' to explore career files and directories.</div>
                </div>
              )}
              
              {/* Command History */}
              {terminalHistory.map((entry, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">dhee@terminal:~$</span>
                    <span className="text-white">{entry.command}</span>
                  </div>
                  {entry.output && (
                    <div className={`mt-2 whitespace-pre-wrap ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {entry.output}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Current Input Line */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center">
                <span className="text-blue-400 mr-2">dhee@terminal:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className={`flex-1 bg-transparent outline-none ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                  placeholder="Type a command..."
                  autoFocus
                />
              </form>
            </div>
          </div>
          
          {/* Quick Commands */}
          <div className="mt-8 text-center">
            <p className={`text-lg mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Try these commands to explore:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['help', 'me', 'bio', 'bits', 'grind', 'creds', 'connect', 'clear'].map((cmd) => (
              <button
                  key={cmd}
                  onClick={() => {
                    setTerminalInput(cmd);
                    handleTerminalCommand(cmd);
                    setTerminalInput('');
                  }}
                                     className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                  darkMode 
                       ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                  {cmd}
              </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p> DHEEPAK KARAN ES.</p>
            <p className="text-sm mt-1">This website is created with AI assistance</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/dheepakkaran" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'bg-white/10 hover:bg-white/20' 
                : 'bg-gray-900/10 hover:bg-gray-900/20'
            }`}>
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/dheepakkaran/" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'bg-white/10 hover:bg-white/20' 
                : 'bg-gray-900/10 hover:bg-gray-900/20'
            }`}>
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:dheepakkaranes@gmail.com?subject=Portfolio Contact - DHEEPAK KARAN ES&body=Hello DHEEPAK,%0D%0A%0D%0AI came across your portfolio and would like to connect with you.%0D%0A%0D%0AMy details:%0D%0AName: [Your Name]%0D%0ACompany: [Your Company]%0D%0APosition: [Your Position]%0D%0A%0D%0AI'm interested in: [Brief description of what you'd like to discuss]%0D%0A%0D%0ABest regards,%0D%0A[Your Name]" className={`p-2 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'bg-white/10 hover:bg-white/20' 
                : 'bg-gray-900/10 hover:bg-gray-900/20'
            }`}>
              <Mail className="w-5 h-5" />
            </a>
            <button 
              onClick={() => window.open('/lalalei/resume.pdf', '_blank')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                darkMode 
                  ? 'bg-white text-gray-900 hover:bg-gray-200' 
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              Resume
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;