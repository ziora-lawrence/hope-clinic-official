import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Eye, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Stethoscope,
  Glasses,
  ScanEye,
  AlertCircle,
  CheckCircle2,
  Clock,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Send
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Patient Education Data
const patientEducationData = [
  {
    id: 'cataract',
    title: 'Cataract',
    image: '/condition_cataract.jpg',
    whatIsIt: 'Clouding of the eye\'s natural lens, leading to blurred vision.',
    symptoms: [
      'Blurry or cloudy vision',
      'Difficulty seeing at night',
      'Sensitivity to bright light',
      'Colors appear faded'
    ],
    treatment: [
      'Surgery to replace the cloudy lens with a clear artificial lens'
    ],
    advice: [
      'Regular eye check-ups',
      'Use sunglasses to reduce glare',
      'Seek medical help if vision worsens'
    ]
  },
  {
    id: 'glaucoma',
    title: 'Glaucoma',
    image: '/condition_glaucoma.jpg',
    whatIsIt: 'Damage to the optic nerve, often linked to high eye pressure. Vision lost cannot be regained.',
    symptoms: [
      'Gradual loss of side vision',
      'Blurred vision',
      'Often no early warning signs'
    ],
    treatment: [
      'Eye drops to lower pressure',
      'Laser treatment or surgery'
    ],
    advice: [
      'Early detection is key, regular eye examination is advised',
      'Never stop prescribed eye drops without consulting your doctor'
    ],
    risks: 'Family history of glaucoma, myopia, black race, Diabetes, Hypertension.'
  },
  {
    id: 'diabetic-retinopathy',
    title: 'Diabetic Retinopathy',
    image: '/condition_diabetic.jpg',
    whatIsIt: 'Damage to the retina\'s blood vessels due to diabetes.',
    symptoms: [
      'Blurred vision',
      'Dark spots or floaters',
      'Sudden vision loss'
    ],
    treatment: [
      'Laser therapy',
      'Injections into the eye',
      'Surgery in advanced cases'
    ],
    advice: [
      'Control blood sugar, blood pressure, and cholesterol',
      'Annual eye exams'
    ]
  },
  {
    id: 'sickle-retinopathy',
    title: 'Sickle Retinopathy',
    image: '/condition_sickle.jpg',
    whatIsIt: 'Retinal damage caused by sickle cell disease affecting blood flow.',
    symptoms: [
      'Blurred vision',
      'Floaters',
      'Sudden vision loss'
    ],
    treatment: [
      'Laser therapy',
      'Surgery if severe'
    ],
    advice: [
      'Regular eye screening for sickle cell patients',
      'Prompt treatment prevents blindness'
    ]
  },
  {
    id: 'allergic-conjunctivitis',
    title: 'Allergic Conjunctivitis',
    image: '/condition_conjunctivitis.jpg',
    whatIsIt: 'Eye allergy causing redness, itching, and watering.',
    symptoms: [
      'Red, itchy eyes',
      'Watery discharge',
      'Swollen eyelids'
    ],
    treatment: [
      'Anti-allergy eye drops',
      'Cold compresses',
      'Avoid rubbing eyes'
    ],
    advice: [
      'Avoid dust, pollen, and smoke',
      'Wash hands often'
    ]
  },
  {
    id: 'retinal-detachment',
    title: 'Retinal Detachment',
    image: '/condition_detachment.jpg',
    whatIsIt: 'The retina pulls away from its normal position, leading to vision loss.',
    symptoms: [
      'Sudden flashes of light',
      'Floaters',
      'Curtain-like shadow over vision'
    ],
    treatment: [
      'Emergency surgery (laser, cryotherapy, or vitrectomy)'
    ],
    advice: [
      'Seek urgent care if symptoms occur',
      'Early treatment saves vision'
    ]
  },
  {
    id: 'retinal-vascular-occlusion',
    title: 'Retinal Vascular Occlusion',
    image: '/condition_occlusion.jpg',
    whatIsIt: 'Blockage of blood vessels in the retina.',
    symptoms: [
      'Sudden vision loss in one eye',
      'Blurred vision',
      'Dark spots'
    ],
    treatment: [
      'Injections into the eye',
      'Laser therapy',
      'Control of underlying conditions (hypertension, diabetes)'
    ],
    advice: [
      'Manage blood pressure and cholesterol',
      'Regular eye exams'
    ]
  }
];

// Services Data
const servicesData = [
  {
    icon: Stethoscope,
    title: 'Eye Consultations',
    description: 'Comprehensive eye examinations and professional consultations'
  },
  {
    icon: Glasses,
    title: 'Spectacle Prescriptions',
    description: 'Designer frames with precision lenses'
  },
  {
    icon: ScanEye,
    title: 'Modern Cataract Surgery',
    description: 'Advanced intraocular lens implantation'
  },
  {
    icon: ScanEye,
    title: 'Laser Surgery',
    description: 'For glaucoma and retinal diseases'
  },
  {
    icon: ScanEye,
    title: 'Retinal Surgeries',
    description: 'Scleral buckle, vitrectomy for retinal detachment'
  },
  {
    icon: ScanEye,
    title: 'Intravitreal Injections',
    description: 'Anti-VEGF medications (Avastin, Lucentis, Eylea, Faricimab)'
  },
  {
    icon: ScanEye,
    title: 'Pterygium Excision',
    description: 'With autograft procedures'
  },
  {
    icon: ScanEye,
    title: 'Lid Surgeries',
    description: 'Entropion, chalazion, cysts treatment'
  },
  {
    icon: ScanEye,
    title: 'Cryotherapy',
    description: 'Advanced freezing treatment for eye conditions'
  },
  {
    icon: ScanEye,
    title: 'ROP Screening',
    description: 'Premature baby retinopathy screening'
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCondition, setExpandedCondition] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo('.hero-content', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.gallery-item',
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          delay: 0.5 
        }
      );

      // Scroll animations
      gsap.fromTo('.services-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.about-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.contact-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.education-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: educationRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const toggleCondition = (id: string) => {
    setExpandedCondition(expandedCondition === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6 lg:w-8 lg:h-8 text-[#0EA5E9]" />
              <div className="flex flex-col">
                <span className="font-bold text-[#0F172A] text-sm lg:text-base leading-tight">HOPE SPECIALIST</span>
                <span className="text-[#0EA5E9] text-xs lg:text-sm leading-tight">CLINIC & RETINAL CENTER</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {[
                { label: 'Home', ref: heroRef },
                { label: 'Services', ref: servicesRef },
                { label: 'About', ref: aboutRef },
                { label: 'Contact', ref: contactRef },
                { label: 'Patient Education', ref: educationRef },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref)}
                  className="text-[#475569] hover:text-[#0EA5E9] font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="bg-[#0EA5E9] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#0284C7] transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {[
                { label: 'Home', ref: heroRef },
                { label: 'Services', ref: servicesRef },
                { label: 'About', ref: aboutRef },
                { label: 'Contact', ref: contactRef },
                { label: 'Patient Education', ref: educationRef },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref)}
                  className="block w-full text-left py-2 text-[#475569] hover:text-[#0EA5E9] font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="w-full bg-[#0EA5E9] text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Section 1: Hero & Gallery */}
      <section ref={heroRef} className="pt-20 lg:pt-24">
        {/* Hero Content */}
        <div className="hero-content bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                HOPE SPECIALIST CLINIC<br />
                <span className="text-[#0EA5E9]">AND RETINAL CENTER</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                A homely environment for eye care where consultations are done in a relaxed atmosphere
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/2348169924588"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact via WhatsApp
                </a>
                <a 
                  href="mailto:hopeeyeclinic@gmail.com"
                  className="bg-white text-[#0F172A] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-8 text-center">Our Clinic Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {[
              '/layout1.png',
              '/layout2.png',
              '/layout3.png',
              '/layout4.png',
              '/layout5.png',
              '/layout6.png',
            ].map((img, index) => (
              <div key={index} className="gallery-item relative aspect-[4/3] rounded-xl overflow-hidden group">
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Our Services */}
      <section ref={servicesRef} className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">Our Services</h2>
            <p className="text-[#475569] max-w-2xl mx-auto">
              Comprehensive eye care services delivered with expertise and compassion
            </p>
          </div>

          <div className="services-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesData.map((service, index) => (
              <div 
                key={index}
                className="bg-[#F8FAFC] rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-shadow group"
              >
                <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0EA5E9] transition-colors">
                  <service.icon className="w-7 h-7 text-[#0EA5E9] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{service.title}</h3>
                <p className="text-[#475569]">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Service Images */}
          <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img 
                src="/layout3.png" 
                alt="Laser Treatment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-white font-bold text-lg">Advanced Laser Technology</h4>
                  <p className="text-white/80">State-of-the-art equipment for precise treatment</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src="/expert surgical care.png"
                alt="Surgical Procedures"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-white font-bold text-lg">Expert Surgical Care</h4>
                  <p className="text-white/80">Experienced surgeons for complex procedures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: About the Clinic & Team */}
      <section ref={aboutRef} className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">About Our Clinic</h2>
            <p className="text-[#475569] max-w-2xl mx-auto">
              Meet our dedicated team of eye care professionals
            </p>
          </div>

          {/* Prof. Tunji Oluleye */}
          <div className="about-content bg-white rounded-3xl overflow-hidden shadow-lg mb-8">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[4/5] lg:aspect-auto">
                <img 
                  src="/doc oluleye.jpg" 
                  alt="Prof. Tunji Sunday Oluleye"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="text-[#0EA5E9] font-semibold text-sm uppercase tracking-wider">Medical Director</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mt-2">Prof. Tunji Sunday Oluleye</h3>
                  <p className="text-[#475569] mt-1">Professor of Ophthalmology & Consultant Vitreo-Retinal Surgeon</p>
                </div>
                
                <div className="space-y-4 text-[#475569]">
                  <p>
                    Prof. Tunji Sunday Oluleye is a renowned Professor of Ophthalmology and a Consultant Vitreo-Retinal Surgeon at the <strong>University of Ibadan</strong> and the <strong>University College Hospital (UCH), Ibadan</strong>. He currently serves as the <strong>Head of the Department of Ophthalmology</strong> at the University of Ibadan.
                  </p>
                  
                  <div>
                    <h4 className="font-bold text-[#0F172A] mb-2">Academic and Professional Background</h4>
                    <p className="text-sm">
                      <strong>Education:</strong> He earned his Bachelor of Medicine, Bachelor of Surgery (MBBS) from the <strong>University of Ilorin</strong> (1985–1991) and later obtained a Postgraduate Degree in Learning and Teaching from the University of Roehampton (2016–2017).
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Specialization:</strong> After completing his residency fellowship in 2001, he specialized in retinal care. He holds fellowships in Medical Retina from the LV Prasad Eye Institute, India, and Surgical Retina from the Aravind Eye Hospital, India.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0F172A] mb-2">Career Highlights</h4>
                    <p className="text-sm">
                      In 2004, he was appointed a lecturer at the University of Ibadan, where he eventually established the <strong>Retina Unit</strong>. He has also served as a Visiting Senior Lecturer at the University of Lagos.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0F172A] mb-2">Expertise and Research</h4>
                    <p className="text-sm">
                      Prof. Oluleye is a leading expert in diagnosing and treating complex retinal conditions, including: <strong>Diabetic retinopathy</strong>, <strong>retinal detachment</strong>, <strong>sickle retinopathy</strong>, and <strong>retinopathy of prematurity</strong>, which are his current research passions.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0F172A] mb-2">Leadership and Philanthropy</h4>
                    <p className="text-sm">
                      Beyond his clinical and academic work, he is the Medical Director of <strong>Hope Eye Clinic</strong>. He is frequently involved in facilitating medical donations to UCH, such as specialized laser and visual field machines, to improve eye care accessibility for indigent patients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dr. Kehinde Oluleye */}
          <div className="about-content bg-white rounded-3xl overflow-hidden shadow-lg">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="mb-6">
                  <span className="text-[#0EA5E9] font-semibold text-sm uppercase tracking-wider">Clinic Administrator</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mt-2">Dr. Kehinde Oluleye</h3>
                </div>
                
                <div className="space-y-4 text-[#475569]">
                  <p>
                    Dr. Kehinde Oluleye is the Hope Eye Clinic Administrator. She obtained her Bachelor of Medicine and Surgery from the prestigious <strong>University of Ibadan</strong>.
                  </p>
                  <p>
                    She is the brain behind the successes recorded by Hope Specialist Eye Clinic, Ibadan as a remarkable administrator and a <strong>compassionate medical professional</strong>.
                  </p>
                  <p>
                    Her dedication to patient care and clinic operations ensures that every visitor receives the highest standard of service in a welcoming environment.
                  </p>
                </div>
              </div>
              <div className="relative aspect-[4/5] lg:aspect-auto order-1 lg:order-2">
                <img 
                  src="/mrs oluleye.jpg" 
                  alt="Dr. Kehinde Oluleye"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Patient Information & Contact */}
      <section ref={contactRef} className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">Contact Us</h2>
            <p className="text-[#475569] max-w-2xl mx-auto">
              Visit us or reach out for appointments and inquiries
            </p>
          </div>

          <div className="contact-content grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-1">Address</h3>
                    <p className="text-[#475569]">
                      Hope Specialist Eye Clinic<br />
                      7, Akobo Housing Estate<br />
                      General Gas, Akobo, Ibadan
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-1">Phone / WhatsApp</h3>
                    <div className="space-y-1">
                      <a href="tel:08169924588" className="block text-[#475569] hover:text-[#0EA5E9]">0816 992 4588</a>
                      <a href="tel:08053083249" className="block text-[#475569] hover:text-[#0EA5E9]">0805 308 3249</a>
                      <a href="tel:08023265594" className="block text-[#475569] hover:text-[#0EA5E9]">0802 326 5594</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-1">Opening Hours</h3>
                    <p className="text-[#475569]">
                      <strong>Consultations:</strong> Tuesdays and Saturdays only<br />
                      <strong>Time:</strong> 8:00 AM - 3:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-1">Email</h3>
                    <a href="mailto:hopeeyeclinic@gmail.com" className="text-[#475569] hover:text-[#0EA5E9]">
                      hopeeyeclinic@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
              <img
                src="/location.png"
                alt="Hope Eye Clinic Location"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-white font-bold text-lg">Hope Eye Clinic</h4>
                  <p className="text-white/80">7, Akobo Housing Estate, General Gas, Akobo, Ibadan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Patient Education */}
      <section ref={educationRef} className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">Patient Education</h2>
            <p className="text-[#475569] max-w-2xl mx-auto">
              Learn about common eye conditions, their symptoms, treatments, and preventive care
            </p>
          </div>

          {/* Conditions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patientEducationData.map((condition) => (
              <div 
                key={condition.id}
                className="education-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-video">
                  <img 
                    src={condition.image} 
                    alt={condition.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">{condition.title}</h3>
                </div>
                
                <div className="p-5">
                  <p className="text-[#475569] text-sm mb-4">{condition.whatIsIt}</p>
                  
                  <button
                    onClick={() => toggleCondition(condition.id)}
                    className="w-full flex items-center justify-between text-[#0EA5E9] font-semibold text-sm hover:text-[#0284C7] transition-colors"
                  >
                    <span>Learn More</span>
                    {expandedCondition === condition.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {expandedCondition === condition.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                      {condition.risks && (
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-sm mb-1">Risks:</h4>
                          <p className="text-[#475569] text-sm">{condition.risks}</p>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-sm mb-1">Symptoms:</h4>
                        <ul className="text-[#475569] text-sm space-y-1">
                          {condition.symptoms.map((symptom, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#0F172A] text-sm mb-1">Treatment:</h4>
                        <ul className="text-[#475569] text-sm space-y-1">
                          {condition.treatment.map((treat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ScanEye className="w-4 h-4 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
                              {treat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#0F172A] text-sm mb-1">Advice:</h4>
                        <ul className="text-[#475569] text-sm space-y-1">
                          {condition.advice.map((adv, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                              {adv}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 lg:mt-16 text-center bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Visit Hope Eye Clinic, Ibadan
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-6">
              For regular check-ups and early treatment to protect your sight. Our team of experts is ready to help you maintain healthy vision.
            </p>
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="bg-white text-[#0EA5E9] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book an Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-8 h-8 text-[#0EA5E9]" />
                <div>
                  <span className="font-bold text-lg">HOPE SPECIALIST</span>
                  <span className="text-[#0EA5E9] text-sm block">CLINIC & RETINAL CENTER</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                A homely environment for eye care where consultations are done in a relaxed atmosphere.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection(servicesRef)} className="hover:text-[#0EA5E9]">Services</button></li>
                <li><button onClick={() => scrollToSection(aboutRef)} className="hover:text-[#0EA5E9]">About Us</button></li>
                <li><button onClick={() => scrollToSection(contactRef)} className="hover:text-[#0EA5E9]">Contact</button></li>
                <li><button onClick={() => scrollToSection(educationRef)} className="hover:text-[#0EA5E9]">Patient Education</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>7, Akobo Housing Estate</li>
                <li>General Gas, Akobo, Ibadan</li>
                <li><a href="tel:08169924588" className="hover:text-[#0EA5E9]">0816 992 4588</a></li>
                <li><a href="mailto:hopeeyeclinic@gmail.com" className="hover:text-[#0EA5E9]">hopeeyeclinic@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2026 Hope Specialist Eye Clinic & Retina Centre. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
