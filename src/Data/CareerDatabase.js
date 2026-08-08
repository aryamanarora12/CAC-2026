
const CAREER_DATABASE = [

  // =====================================================
  // ENGINEERING
  // =====================================================

  {
    name: "Mechanical Engineer",
    category: "Engineering",
    description: "Designs machines, mechanical systems, and physical products.",
    riasec: { R: 10, I: 9, A: 3, S: 2, E: 4, C: 7 }
  },

  {
    name: "Robotics Engineer",
    category: "Engineering",
    description: "Designs, builds, and programs robots and automated systems.",
    riasec: { R: 10, I: 10, A: 4, S: 3, E: 5, C: 7 }
  },

  {
    name: "Electrical Engineer",
    category: "Engineering",
    description: "Designs electrical systems, electronics, circuits, and technology.",
    riasec: { R: 8, I: 10, A: 3, S: 2, E: 4, C: 8 }
  },

  {
    name: "Computer Engineer",
    category: "Engineering",
    description: "Works with computer hardware, embedded systems, and digital technology.",
    riasec: { R: 8, I: 10, A: 4, S: 3, E: 4, C: 8 }
  },

  {
    name: "Aerospace Engineer",
    category: "Engineering",
    description: "Designs aircraft, spacecraft, propulsion systems, and aerospace technology.",
    riasec: { R: 9, I: 10, A: 4, S: 2, E: 4, C: 8 }
  },

  {
    name: "Civil Engineer",
    category: "Engineering",
    description: "Designs infrastructure such as bridges, roads, buildings, and water systems.",
    riasec: { R: 9, I: 8, A: 3, S: 4, E: 5, C: 8 }
  },

  {
    name: "Chemical Engineer",
    category: "Engineering",
    description: "Uses chemistry, physics, and engineering to develop industrial processes.",
    riasec: { R: 8, I: 10, A: 3, S: 3, E: 4, C: 8 }
  },

  {
    name: "Biomedical Engineer",
    category: "Engineering",
    description: "Develops medical devices and technologies using engineering and biology.",
    riasec: { R: 7, I: 10, A: 4, S: 5, E: 4, C: 7 }
  },

  {
    name: "Environmental Engineer",
    category: "Engineering",
    description: "Develops solutions to environmental and sustainability problems.",
    riasec: { R: 8, I: 9, A: 3, S: 5, E: 4, C: 8 }
  },

  {
    name: "Materials Engineer",
    category: "Engineering",
    description: "Develops and tests materials used in products and engineering systems.",
    riasec: { R: 8, I: 10, A: 4, S: 3, E: 3, C: 8 }
  },

  {
    name: "Industrial Engineer",
    category: "Engineering",
    description: "Improves manufacturing systems, efficiency, and organizational processes.",
    riasec: { R: 7, I: 9, A: 2, S: 5, E: 7, C: 9 }
  },

  {
    name: "Nuclear Engineer",
    category: "Engineering",
    description: "Works with nuclear energy, radiation systems, and nuclear technologies.",
    riasec: { R: 7, I: 10, A: 2, S: 2, E: 3, C: 9 }
  },

  {
    name: "Petroleum Engineer",
    category: "Engineering",
    description: "Develops methods for extracting and producing oil and natural gas.",
    riasec: { R: 9, I: 9, A: 2, S: 3, E: 5, C: 8 }
  },

  {
    name: "Systems Engineer",
    category: "Engineering",
    description: "Designs and manages complex technical systems.",
    riasec: { R: 7, I: 10, A: 3, S: 5, E: 6, C: 9 }
  },

  {
    name: "Manufacturing Engineer",
    category: "Engineering",
    description: "Designs and improves manufacturing processes and production systems.",
    riasec: { R: 10, I: 9, A: 2, S: 4, E: 5, C: 9 }
  },


  // =====================================================
  // COMPUTER SCIENCE & TECHNOLOGY
  // =====================================================

  {
    name: "Software Engineer",
    category: "Technology",
    description: "Designs, develops, tests, and maintains software.",
    riasec: { R: 4, I: 10, A: 6, S: 4, E: 5, C: 8 }
  },

  {
    name: "Computer Scientist",
    category: "Technology",
    description: "Studies computing, algorithms, programming, and computational systems.",
    riasec: { R: 3, I: 10, A: 5, S: 3, E: 4, C: 8 }
  },

  {
    name: "Data Scientist",
    category: "Technology",
    description: "Uses statistics, programming, and data to solve complex problems.",
    riasec: { R: 3, I: 10, A: 3, S: 4, E: 5, C: 10 }
  },

  {
    name: "Data Analyst",
    category: "Technology",
    description: "Analyzes data to identify patterns and support decision-making.",
    riasec: { R: 2, I: 9, A: 2, S: 4, E: 5, C: 10 }
  },

  {
    name: "Cybersecurity Analyst",
    category: "Technology",
    description: "Protects computer systems, networks, and data from security threats.",
    riasec: { R: 5, I: 10, A: 2, S: 3, E: 5, C: 9 }
  },

  {
    name: "AI Engineer",
    category: "Technology",
    description: "Develops artificial intelligence and machine learning systems.",
    riasec: { R: 4, I: 10, A: 5, S: 3, E: 5, C: 8 }
  },

  {
    name: "Machine Learning Engineer",
    category: "Technology",
    description: "Builds systems that learn from data using machine learning algorithms.",
    riasec: { R: 4, I: 10, A: 4, S: 3, E: 4, C: 9 }
  },

  {
    name: "Web Developer",
    category: "Technology",
    description: "Creates and maintains websites and web applications.",
    riasec: { R: 4, I: 8, A: 8, S: 4, E: 5, C: 7 }
  },

  {
    name: "Game Developer",
    category: "Technology",
    description: "Creates interactive games using programming, design, and technology.",
    riasec: { R: 5, I: 9, A: 9, S: 5, E: 5, C: 6 }
  },

  {
    name: "Database Administrator",
    category: "Technology",
    description: "Manages databases, data systems, and database security.",
    riasec: { R: 3, I: 8, A: 2, S: 3, E: 4, C: 10 }
  },

  {
    name: "Cloud Engineer",
    category: "Technology",
    description: "Designs and manages cloud computing infrastructure.",
    riasec: { R: 5, I: 9, A: 3, S: 4, E: 5, C: 9 }
  },

  {
    name: "Network Engineer",
    category: "Technology",
    description: "Designs and maintains computer networks and communication systems.",
    riasec: { R: 7, I: 9, A: 2, S: 4, E: 5, C: 9 }
  },

  {
    name: "IT Manager",
    category: "Technology",
    description: "Manages technology teams, systems, and organizational IT operations.",
    riasec: { R: 5, I: 7, A: 3, S: 7, E: 9, C: 8 }
  },

  {
    name: "UX Designer",
    category: "Technology",
    description: "Designs digital experiences based on user needs and research.",
    riasec: { R: 3, I: 7, A: 10, S: 8, E: 5, C: 5 }
  },

  {
    name: "Product Designer",
    category: "Technology",
    description: "Designs products and experiences that solve user problems.",
    riasec: { R: 4, I: 7, A: 10, S: 7, E: 6, C: 5 }
  },


  // =====================================================
  // SCIENCE
  // =====================================================

  {
    name: "Physicist",
    category: "Science",
    description: "Studies matter, energy, forces, and the laws of nature.",
    riasec: { R: 5, I: 10, A: 3, S: 3, E: 3, C: 7 }
  },

  {
    name: "Chemist",
    category: "Science",
    description: "Studies chemical substances, reactions, and materials.",
    riasec: { R: 5, I: 10, A: 3, S: 3, E: 3, C: 8 }
  },

  {
    name: "Biologist",
    category: "Science",
    description: "Studies living organisms and biological systems.",
    riasec: { R: 5, I: 10, A: 4, S: 5, E: 3, C: 7 }
  },

  {
    name: "Microbiologist",
    category: "Science",
    description: "Studies microorganisms such as bacteria, viruses, and fungi.",
    riasec: { R: 4, I: 10, A: 3, S: 4, E: 3, C: 8 }
  },

  {
    name: "Astronomer",
    category: "Science",
    description: "Studies stars, planets, galaxies, and the universe.",
    riasec: { R: 4, I: 10, A: 4, S: 3, E: 3, C: 7 }
  },

  {
    name: "Geologist",
    category: "Science",
    description: "Studies Earth's materials, structure, and geological processes.",
    riasec: { R: 8, I: 10, A: 3, S: 3, E: 3, C: 7 }
  },

  {
    name: "Environmental Scientist",
    category: "Science",
    description: "Studies environmental problems and develops scientific solutions.",
    riasec: { R: 6, I: 10, A: 3, S: 5, E: 4, C: 8 }
  },

  {
    name: "Marine Biologist",
    category: "Science",
    description: "Studies marine organisms and ocean ecosystems.",
    riasec: { R: 7, I: 10, A: 4, S: 4, E: 3, C: 7 }
  },

  {
    name: "Neuroscientist",
    category: "Science",
    description: "Studies the brain, nervous system, and human cognition.",
    riasec: { R: 3, I: 10, A: 4, S: 5, E: 3, C: 7 }
  },

  {
    name: "Research Scientist",
    category: "Science",
    description: "Conducts experiments and research to develop new knowledge.",
    riasec: { R: 4, I: 10, A: 4, S: 4, E: 3, C: 8 }
  },


  // =====================================================
  // HEALTHCARE
  // =====================================================

  {
    name: "Doctor",
    category: "Healthcare",
    description: "Diagnoses and treats patients using medical knowledge.",
    riasec: { R: 5, I: 9, A: 3, S: 10, E: 5, C: 8 }
  },

  {
    name: "Nurse",
    category: "Healthcare",
    description: "Provides patient care, education, and medical support.",
    riasec: { R: 5, I: 6, A: 3, S: 10, E: 5, C: 8 }
  },

  {
    name: "Pharmacist",
    category: "Healthcare",
    description: "Works with medications and helps patients use them safely.",
    riasec: { R: 4, I: 9, A: 2, S: 7, E: 4, C: 9 }
  },

  {
    name: "Physical Therapist",
    category: "Healthcare",
    description: "Helps patients improve movement and recover physical abilities.",
    riasec: { R: 8, I: 7, A: 3, S: 10, E: 4, C: 7 }
  },

  {
    name: "Occupational Therapist",
    category: "Healthcare",
    description: "Helps people develop or recover skills needed for daily activities.",
    riasec: { R: 6, I: 6, A: 5, S: 10, E: 4, C: 7 }
  },

  {
    name: "Dentist",
    category: "Healthcare",
    description: "Diagnoses and treats problems involving teeth and oral health.",
    riasec: { R: 8, I: 8, A: 3, S: 8, E: 5, C: 8 }
  },

  {
    name: "Veterinarian",
    category: "Healthcare",
    description: "Diagnoses and treats diseases and injuries in animals.",
    riasec: { R: 8, I: 9, A: 3, S: 7, E: 4, C: 8 }
  },

  {
    name: "Medical Laboratory Scientist",
    category: "Healthcare",
    description: "Performs laboratory tests used to diagnose and monitor diseases.",
    riasec: { R: 5, I: 10, A: 2, S: 4, E: 2, C: 9 }
  },

  {
    name: "Radiologic Technologist",
    category: "Healthcare",
    description: "Uses imaging technology to help diagnose medical conditions.",
    riasec: { R: 8, I: 8, A: 3, S: 7, E: 3, C: 8 }
  },

  {
    name: "Public Health Specialist",
    category: "Healthcare",
    description: "Works to improve health outcomes across communities and populations.",
    riasec: { R: 3, I: 7, A: 3, S: 10, E: 7, C: 7 }
  },


  // =====================================================
  // BUSINESS & FINANCE
  // =====================================================

  {
    name: "Entrepreneur",
    category: "Business",
    description: "Creates businesses, develops ideas, and manages projects.",
    riasec: { R: 5, I: 6, A: 7, S: 7, E: 10, C: 5 }
  },

  {
    name: "Business Analyst",
    category: "Business",
    description: "Analyzes business problems and develops data-driven solutions.",
    riasec: { R: 3, I: 8, A: 3, S: 6, E: 8, C: 9 }
  },

  {
    name: "Financial Analyst",
    category: "Finance",
    description: "Analyzes financial data and supports investment decisions.",
    riasec: { R: 2, I: 8, A: 2, S: 3, E: 7, C: 10 }
  },

  {
    name: "Accountant",
    category: "Finance",
    description: "Manages financial records and prepares financial reports.",
    riasec: { R: 2, I: 6, A: 1, S: 3, E: 4, C: 10 }
  },

  {
    name: "Investment Analyst",
    category: "Finance",
    description: "Researches investments and evaluates financial opportunities.",
    riasec: { R: 2, I: 9, A: 2, S: 3, E: 9, C: 10 }
  },

  {
    name: "Financial Advisor",
    category: "Finance",
    description: "Helps clients plan investments, savings, and financial goals.",
    riasec: { R: 2, I: 7, A: 2, S: 9, E: 9, C: 8 }
  },

  {
    name: "Marketing Manager",
    category: "Business",
    description: "Develops marketing strategies and campaigns.",
    riasec: { R: 2, I: 5, A: 8, S: 7, E: 10, C: 6 }
  },

  {
    name: "Sales Manager",
    category: "Business",
    description: "Leads sales teams and develops strategies to reach customers.",
    riasec: { R: 3, I: 4, A: 4, S: 8, E: 10, C: 7 }
  },

  {
    name: "Human Resources Manager",
    category: "Business",
    description: "Manages hiring, employee development, and workplace programs.",
    riasec: { R: 2, I: 4, A: 3, S: 10, E: 9, C: 8 }
  },

  {
    name: "Project Manager",
    category: "Business",
    description: "Coordinates teams, schedules, resources, and project goals.",
    riasec: { R: 4, I: 6, A: 4, S: 8, E: 10, C: 9 }
  },

  {
    name: "Management Consultant",
    category: "Business",
    description: "Helps organizations solve problems and improve performance.",
    riasec: { R: 2, I: 8, A: 4, S: 7, E: 10, C: 8 }
  },

  {
    name: "Supply Chain Manager",
    category: "Business",
    description: "Manages the movement of products, materials, and resources.",
    riasec: { R: 7, I: 7, A: 2, S: 5, E: 8, C: 10 }
  },


  // =====================================================
  // LAW & GOVERNMENT
  // =====================================================

  {
    name: "Lawyer",
    category: "Law",
    description: "Researches legal issues and represents clients.",
    riasec: { R: 2, I: 8, A: 5, S: 7, E: 10, C: 8 }
  },

  {
    name: "Judge",
    category: "Law",
    description: "Evaluates legal cases and makes decisions based on law.",
    riasec: { R: 1, I: 9, A: 3, S: 7, E: 8, C: 10 }
  },

  {
    name: "Paralegal",
    category: "Law",
    description: "Supports lawyers through research, documentation, and case preparation.",
    riasec: { R: 2, I: 7, A: 3, S: 5, E: 5, C: 10 }
  },

  {
    name: "Political Scientist",
    category: "Government",
    description: "Studies political systems, institutions, and public policy.",
    riasec: { R: 1, I: 9, A: 4, S: 7, E: 8, C: 7 }
  },

  {
    name: "Policy Analyst",
    category: "Government",
    description: "Researches policies and evaluates their potential effects.",
    riasec: { R: 2, I: 9, A: 3, S: 6, E: 7, C: 8 }
  },

  {
    name: "Government Administrator",
    category: "Government",
    description: "Manages programs and operations within government organizations.",
    riasec: { R: 2, I: 5, A: 2, S: 7, E: 8, C: 10 }
  },

  {
    name: "Urban Planner",
    category: "Government",
    description: "Plans communities, cities, transportation, and land use.",
    riasec: { R: 6, I: 8, A: 7, S: 7, E: 7, C: 8 }
  },


  // =====================================================
  // EDUCATION & SOCIAL SERVICES
  // =====================================================

  {
    name: "Teacher",
    category: "Education",
    description: "Educates students and helps them develop knowledge and skills.",
    riasec: { R: 2, I: 5, A: 5, S: 10, E: 6, C: 7 }
  },

  {
    name: "Professor",
    category: "Education",
    description: "Teaches students and conducts research in an academic field.",
    riasec: { R: 2, I: 10, A: 5, S: 9, E: 5, C: 7 }
  },

  {
    name: "School Counselor",
    category: "Education",
    description: "Helps students with academic, personal, and career development.",
    riasec: { R: 1, I: 5, A: 4, S: 10, E: 7, C: 6 }
  },

  {
    name: "School Principal",
    category: "Education",
    description: "Leads schools and manages educational programs and staff.",
    riasec: { R: 2, I: 5, A: 3, S: 9, E: 10, C: 9 }
  },

  {
    name: "Special Education Teacher",
    category: "Education",
    description: "Supports students with different learning and educational needs.",
    riasec: { R: 3, I: 5, A: 4, S: 10, E: 6, C: 8 }
  },

  {
    name: "Social Worker",
    category: "Social Services",
    description: "Helps individuals and families navigate social and personal challenges.",
    riasec: { R: 2, I: 5, A: 4, S: 10, E: 7, C: 6 }
  },

  {
    name: "Career Counselor",
    category: "Social Services",
    description: "Helps people explore careers, education, and professional goals.",
    riasec: { R: 1, I: 6, A: 4, S: 10, E: 8, C: 7 }
  },

  {
    name: "Community Organizer",
    category: "Social Services",
    description: "Works with communities to organize projects and address local issues.",
    riasec: { R: 4, I: 4, A: 5, S: 10, E: 10, C: 5 }
  },


  // =====================================================
  // ART & DESIGN
  // =====================================================

  {
    name: "Graphic Designer",
    category: "Design",
    description: "Creates visual designs for digital media, advertising, and communication.",
    riasec: { R: 3, I: 4, A: 10, S: 4, E: 6, C: 5 }
  },

  {
    name: "Art Director",
    category: "Design",
    description: "Leads the visual direction of creative projects and campaigns.",
    riasec: { R: 3, I: 4, A: 10, S: 7, E: 9, C: 5 }
  },

  {
    name: "Animator",
    category: "Design",
    description: "Creates animated visual content for entertainment and media.",
    riasec: { R: 3, I: 4, A: 10, S: 3, E: 5, C: 5 }
  },

  {
    name: "Illustrator",
    category: "Design",
    description: "Creates drawings and visual artwork for publications and media.",
    riasec: { R: 2, I: 3, A: 10, S: 3, E: 4, C: 5 }
  },

  {
    name: "Photographer",
    category: "Design",
    description: "Creates photographs for artistic, commercial, or documentary purposes.",
    riasec: { R: 6, I: 3, A: 10, S: 6, E: 6, C: 4 }
  },

  {
    name: "Architect",
    category: "Design",
    description: "Designs buildings and spaces using creativity, planning, and technical knowledge.",
    riasec: { R: 8, I: 7, A: 9, S: 3, E: 5, C: 8 }
  },

  {
    name: "Interior Designer",
    category: "Design",
    description: "Designs functional and visually appealing interior spaces.",
    riasec: { R: 6, I: 4, A: 10, S: 6, E: 5, C: 6 }
  },

  {
    name: "Fashion Designer",
    category: "Design",
    description: "Creates clothing, accessories, and fashion concepts.",
    riasec: { R: 5, I: 3, A: 10, S: 5, E: 7, C: 4 }
  },


  // =====================================================
  // MEDIA & COMMUNICATION
  // =====================================================

  {
    name: "Journalist",
    category: "Media",
    description: "Researches and communicates news and information to the public.",
    riasec: { R: 2, I: 8, A: 8, S: 8, E: 7, C: 5 }
  },

  {
    name: "Writer",
    category: "Media",
    description: "Creates written content for books, publications, websites, and media.",
    riasec: { R: 1, I: 5, A: 10, S: 4, E: 5, C: 5 }
  },

  {
    name: "Public Relations Specialist",
    category: "Media",
    description: "Manages communication between organizations and the public.",
    riasec: { R: 1, I: 4, A: 7, S: 9, E: 10, C: 6 }
  },

  {
    name: "Content Creator",
    category: "Media",
    description: "Creates digital content for online audiences and platforms.",
    riasec: { R: 3, I: 4, A: 10, S: 8, E: 8, C: 4 }
  },

  {
    name: "Film Director",
    category: "Media",
    description: "Leads the creative and production direction of films and videos.",
    riasec: { R: 6, I: 4, A: 10, S: 8, E: 10, C: 5 }
  },

  {
    name: "Video Editor",
    category: "Media",
    description: "Edits video content for entertainment, communication, and media.",
    riasec: { R: 5, I: 4, A: 10, S: 3, E: 4, C: 6 }
  },


  // =====================================================
  // TRADES & HANDS-ON CAREERS
  // =====================================================

  {
    name: "Electrician",
    category: "Skilled Trades",
    description: "Installs, maintains, and repairs electrical systems.",
    riasec: { R: 10, I: 7, A: 2, S: 4, E: 5, C: 8 }
  },

  {
    name: "Plumber",
    category: "Skilled Trades",
    description: "Installs and repairs water, drainage, and piping systems.",
    riasec: { R: 10, I: 5, A: 2, S: 5, E: 6, C: 7 }
  },

  {
    name: "Carpenter",
    category: "Skilled Trades",
    description: "Builds and repairs structures and products using wood and other materials.",
    riasec: { R: 10, I: 4, A: 6, S: 3, E: 6, C: 6 }
  },

  {
    name: "Welder",
    category: "Skilled Trades",
    description: "Joins metal components using specialized tools and equipment.",
    riasec: { R: 10, I: 5, A: 4, S: 2, E: 4, C: 7 }
  },

  {
    name: "Automotive Technician",
    category: "Skilled Trades",
    description: "Diagnoses, maintains, and repairs vehicles.",
    riasec: { R: 10, I: 7, A: 2, S: 4, E: 5, C: 7 }
  },

  {
    name: "HVAC Technician",
    category: "Skilled Trades",
    description: "Installs and repairs heating, ventilation, and air conditioning systems.",
    riasec: { R: 10, I: 7, A: 2, S: 5, E: 6, C: 7 }
  },

  {
    name: "Machinist",
    category: "Skilled Trades",
    description: "Operates machines to manufacture precise mechanical components.",
    riasec: { R: 10, I: 8, A: 2, S: 2, E: 3, C: 9 }
  },


  // =====================================================
  // OTHER
  // =====================================================

  {
    name: "Pilot",
    category: "Transportation",
    description: "Operates aircraft and manages complex aviation systems.",
    riasec: { R: 9, I: 7, A: 2, S: 6, E: 6, C: 9 }
  },

  {
    name: "Air Traffic Controller",
    category: "Transportation",
    description: "Coordinates aircraft movement and maintains aviation safety.",
    riasec: { R: 7, I: 8, A: 1, S: 6, E: 7, C: 10 }
  },

  {
    name: "Emergency Medical Technician",
    category: "Healthcare",
    description: "Provides emergency medical care and transportation to patients.",
    riasec: { R: 8, I: 6, A: 2, S: 10, E: 6, C: 7 }
  },

  {
    name: "Firefighter",
    category: "Public Safety",
    description: "Responds to emergencies, protects communities, and performs rescue operations.",
    riasec: { R: 10, I: 4, A: 2, S: 9, E: 7, C: 6 }
  },

  {
    name: "Police Officer",
    category: "Public Safety",
    description: "Protects communities and responds to public safety situations.",
    riasec: { R: 9, I: 5, A: 1, S: 8, E: 8, C: 7 }
  },

  {
    name: "Detective",
    category: "Public Safety",
    description: "Investigates cases by gathering evidence and analyzing information.",
    riasec: { R: 7, I: 9, A: 3, S: 6, E: 7, C: 8 }
  },

  {
    name: "Park Ranger",
    category: "Environment",
    description: "Protects natural areas and helps visitors learn about the environment.",
    riasec: { R: 10, I: 6, A: 4, S: 7, E: 5, C: 6 }
  },

  {
    name: "Agricultural Scientist",
    category: "Science",
    description: "Researches crops, soil, agriculture, and food production.",
    riasec: { R: 8, I: 10, A: 3, S: 4, E: 4, C: 8 }
  },

  {
    name: "Economist",
    category: "Business",
    description: "Studies markets, economic behavior, and financial systems.",
    riasec: { R: 1, I: 10, A: 2, S: 4, E: 6, C: 9 }
  },

  {
    name: "Operations Manager",
    category: "Business",
    description: "Manages organizational processes, resources, and day-to-day operations.",
    riasec: { R: 5, I: 7, A: 2, S: 7, E: 10, C: 10 }
  },

  {
    name: "Recruiter",
    category: "Business",
    description: "Finds and evaluates candidates for employment opportunities.",
    riasec: { R: 1, I: 4, A: 4, S: 10, E: 9, C: 7 }
  },

  {
    name: "Librarian",
    category: "Information",
    description: "Organizes information resources and helps people find knowledge.",
    riasec: { R: 2, I: 7, A: 5, S: 8, E: 3, C: 10 }
  },

  {
    name: "Archivist",
    category: "Information",
    description: "Preserves, organizes, and manages historical documents and records.",
    riasec: { R: 2, I: 8, A: 4, S: 3, E: 2, C: 10 }
  },

  {
    name: "Technical Writer",
    category: "Communication",
    description: "Creates technical documentation and explains complex information clearly.",
    riasec: { R: 3, I: 8, A: 8, S: 4, E: 4, C: 8 }
  },

  {
    name: "Interpreter",
    category: "Communication",
    description: "Translates spoken communication between people who speak different languages.",
    riasec: { R: 1, I: 5, A: 8, S: 10, E: 5, C: 6 }
  }

];

export default CAREER_DATABASE;