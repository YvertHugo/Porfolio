import React, { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, Code, Briefcase, User, ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      setCursorTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: crypto.randomUUID() }];
        return newTrail.slice(-8);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.dataset.animateId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate-id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.send(
        "service_2agluj7",
        "template_2h9oagp",
        {
            from_name: form.name,
            reply_to: form.email,
            message: form.message,
        },
        "hQ6lFL84yOtM9RJCz"
    )
    .then(() => {
        alert("Message envoyé avec succès 🚀");
        setForm({ name: "", email: "", message: "" });
        setSending(false);
    })
    .catch((err) => {
    console.log("EmailJS error:", err);
    alert("Erreur lors de l'envoi 😢");
    setSending(false);
    });
 };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "Application E-commerce",
      description: "Plateforme complète de vente en ligne avec panier, paiement et gestion des commandes",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Dashboard Analytics",
      description: "Interface de visualisation de données en temps réel avec graphiques interactifs",
      tech: ["Vue.js", "D3.js", "Express"]
    },
    {
      title: "API REST",
      description: "API robuste et scalable avec documentation complète et tests automatisés",
      tech: ["Python", "FastAPI", "PostgreSQL"]
    }
  ];

  const experiences = [
    {
      year: "2024",
      title: "Développeur Full Stack Senior",
      company: "Tech Solutions Inc.",
      description: "Lead technique sur plusieurs projets d'envergure, mentorat d'équipe et architecture applicative",
      achievements: ["Migration vers microservices", "Réduction temps de chargement 60%", "Formation équipe de 5 devs"]
    },
    {
      year: "2022",
      title: "Développeur Full Stack",
      company: "Digital Innovations",
      description: "Développement d'applications web performantes et maintenables avec méthodologie Agile",
      achievements: ["10+ features majeures livrées", "Tests unitaires 85% coverage", "Optimisation CI/CD"]
    },
    {
      year: "2020",
      title: "Développeur Front-End",
      company: "StartUp Creative",
      description: "Création d'interfaces utilisateur modernes et responsives, collaboration avec designers UX/UI",
      achievements: ["Refonte complète du site", "Accessibilité WCAG 2.1", "Performance Score 95+"]
    },
    {
      year: "2019",
      title: "Développeur Junior",
      company: "WebAgency Pro",
      description: "Apprentissage des technologies web modernes et participation aux projets clients",
      achievements: ["5 sites web développés", "Maîtrise React & Vue.js", "Participation sprints Agile"]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ cursor: 'none' }}>
      {/* Curseur personnalisé */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />
      {cursorTrail.map((pos, i) => (
        <div
          key={pos.id}
          className="cursor-trail"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: (i + 1) / cursorTrail.length * 0.5,
            transform: `scale(${(i + 1) / cursorTrail.length})`,
          }}
        />
      ))}

      {/* Header fixe */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
      }`}>
        <nav className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Hugo YVERT
          </div>
          <ul className="flex gap-8">
            {['home', 'about', 'experience', 'projects', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className={`capitalize font-medium transition-colors hover:text-blue-600 ${
                    activeSection === item ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {item === 'home' ? 'Accueil' : 
                   item === 'about' ? 'À propos' :
                   item === 'experience' ? 'Expérience' :
                   item === 'projects' ? 'Projets' : 'Contact'}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Section Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center animate-fade-in">
          <div className="inline-block p-3 bg-blue-50 rounded-full mb-6 animate-bounce-slow">
            <Code className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent animate-slide-up">
            Développeur Full Stack
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up-delay">
            Passionné par la création d'expériences web innovantes et performantes
          </p>
          <div className="flex gap-4 justify-center mb-12 animate-slide-up-delay-2">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Voir mes projets
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transform hover:scale-105 transition-all"
            >
              Me contacter
            </button>
          </div>
          <ChevronDown className="w-8 h-8 mx-auto text-gray-400 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')} />
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="min-h-screen flex items-center bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div 
              className={`flex items-center gap-3 mb-12 justify-center transition-all duration-700 ${
                visibleElements.has('about-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              data-animate-id="about-title"
            >
              <User className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">À propos de moi</h2>
            </div>
            <div 
              className={`bg-white p-8 rounded-2xl shadow-xl transform transition-all duration-700 delay-200 ${
                visibleElements.has('about-card') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
              data-animate-id="about-card"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Développeur passionné avec plusieurs années d'expérience dans la création d'applications web modernes. 
                J'aime transformer des idées complexes en solutions élégantes et intuitives.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['JavaScript', 'React', 'Node.js', 'Python', 'Vue.js', 'MongoDB', 'Docker', 'Git'].map((skill, i) => (
                  <div
                    key={skill}
                    className={`bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-100 transition-all duration-500 ${
                      visibleElements.has('about-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Expérience */}
      <section id="experience" className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-6">
          <div 
            className={`flex items-center gap-3 mb-16 justify-center transition-all duration-700 ${
              visibleElements.has('experience-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            data-animate-id="experience-title"
          >
            <Briefcase className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold">Parcours Professionnel</h2>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Ligne verticale centrale */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 transform -translate-x-1/2"></div>
            
            {experiences.map((exp, i) => (
              <div 
                key={i} 
                className={`relative mb-16 last:mb-0 transition-all duration-700 ${
                  visibleElements.has(`exp-${i}`) ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
                data-animate-id={`exp-${i}`}
              >
                {/* Point sur la timeline */}
                <div className="absolute left-1/2 top-8 w-6 h-6 bg-blue-600 rounded-full transform -translate-x-1/2 z-10 shadow-lg border-4 border-white">
                  <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
                </div>
                
                {/* Année */}
                <div className="absolute left-1/2 top-6 transform -translate-x-1/2 -translate-y-full mb-2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {exp.year}
                  </span>
                </div>
                
                {/* Contenu alternant gauche/droite */}
                <div className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                      <p className="text-blue-600 font-semibold mb-3">{exp.company}</p>
                      <p className="text-gray-600 mb-4">{exp.description}</p>
                      <div className={`space-y-2 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        {exp.achievements.map((achievement, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-gray-700">
                            {i % 2 === 0 ? (
                              <>
                                <span>{achievement}</span>
                                <span className="text-blue-600">✓</span>
                              </>
                            ) : (
                              <>
                                <span className="text-blue-600">✓</span>
                                <span>{achievement}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets */}
      <section id="projects" className="min-h-screen flex items-center bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div 
            className={`flex items-center gap-3 mb-12 justify-center transition-all duration-700 ${
              visibleElements.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            data-animate-id="projects-title"
          >
            <Code className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold">Mes Projets</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, i) => (
              <div
                key={i}
                className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-700 border border-gray-100 ${
                  visibleElements.has(`project-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
                data-animate-id={`project-${i}`}
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

<footer id="contact" className="bg-gray-900 text-white py-20">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
    
    {/* Infos */}
    <div>
      <h3 className="text-3xl font-bold mb-4 text-blue-400">Hugo Yvert</h3>
      <p className="text-gray-400 mb-6">
        Développeur Full Stack passionné par les interfaces modernes et les expériences utilisateurs haut de gamme.
      </p>
      <p className="text-gray-400">
        📩 <span className="text-white">yverthugo@gmail.com</span>
      </p>
      <p className="mt-6 text-gray-500">
        © {new Date().getFullYear()} Hugo Yvert. Tous droits réservés.
      </p>
    </div>

    {/* Formulaire */}
    <form onSubmit={sendEmail} className="bg-gray-800 p-8 rounded-2xl shadow-xl space-y-5">
      <h4 className="text-2xl font-bold mb-4">Contactez-moi</h4>

      <input
        type="text"
        placeholder="Votre nom"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none"
      />

      <input
        type="email"
        placeholder="Votre email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none"
      />

      <textarea
        placeholder="Votre message"
        required
        rows="5"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none"
      />

      <button
        disabled={sending}
        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
      >
        {sending ? "Envoi..." : "Envoyer"}
      </button>
    </form>

  </div>
</footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s backwards;
        }
        .animate-slide-up-delay-2 {
          animation: slide-up 0.8s ease-out 0.4s backwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .custom-cursor {
          position: fixed;
          width: 18px;
          height: 18px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease-out;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.6);
        }

        .cursor-trail {
          position: fixed;
          width: 10px;
          height: 10px;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: opacity 0.4s ease-out, transform 0.3s ease-out;
          background: linear-gradient(135deg, #93c5fd, #60a5fa);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
        }

        * {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
}