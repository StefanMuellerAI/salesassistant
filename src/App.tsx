import React, { useState, useEffect } from 'react';
import { Users, Package2, Lightbulb, Loader2, ChevronDown, ChevronUp, LinkedinIcon, Globe2, BarChart3, Users2, PlusCircle, MessageCircle, RefreshCw, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Types
type Profile = {
  id: number;
  name: string;
  title: string;
  company: string;
  experience: string;
  education: string;
  languages: string[];
  interests: string[];
  achievements: string[];
  painPoints: string[];
  budget: string;
  decisionMaking: string;
  preferredContact: string;
  image: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  features: string[];
  benefits: string[];
  pricing: string;
  image: string;
  icon: React.ReactNode;
};

type Strategy = {
  title: string;
  approach: string;
  talkingPoints: string[];
  openingMessage: string;
};

type LegalContent = {
  impressum: string;
  datenschutz: string;
};

// Sample Data
const profiles: Profile[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Leiterin der digitalen Transformation",
    company: "Global Logistics Co.",
    experience: "Über 15 Jahre Erfahrung in digitaler Transformation und Change Management",
    education: "MBA von INSEAD, BSc Informatik",
    languages: ["Englisch", "Mandarin", "Deutsch"],
    interests: ["Digitale Innovation", "Nachhaltige Betriebsabläufe", "Teamführung", "Industrie 4.0"],
    achievements: [
      "Leitung eines digitalen Transformationsprojekts im Wert von 5 Mio. €",
      "Reduzierung der Betriebskosten um 35%",
      "Referentin beim LogiTech Summit 2024"
    ],
    painPoints: [
      "Schwierigkeiten bei der Mitarbeiterakzeptanz neuer Technologien",
      "Notwendigkeit, die digitale Präsenz zu verbessern",
      "Suche nach innovativen Wegen zur Talentgewinnung"
    ],
    budget: "50.000 € - 100.000 € jährlich",
    decisionMaking: "Endgültige Entscheidungsträgerin für digitale Initiativen",
    preferredContact: "Frühe Morgenvideoanrufe, LinkedIn-Nachrichten",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "VP Geschäftsentwicklung",
    company: "TechCorp Solutions",
    experience: "12 Jahre im Unternehmensvertrieb und Partnerschaften",
    education: "Executive MBA von LBS, BA Internationales Business",
    languages: ["Englisch", "Spanisch", "Portugiesisch"],
    interests: ["Strategische Partnerschaften", "SaaS-Vertrieb", "Marktexpansion", "KI im Geschäftsbereich"],
    achievements: [
      "200% Umsatzwachstum in der EMEA-Region",
      "Etablierung von Schlüsselpartnerschaften mit Fortune 500",
      "Aufbau eines Vertriebsteams von 3 auf 30 Personen"
    ],
    painPoints: [
      "Notwendigkeit, die Qualität der Leadgenerierung zu verbessern",
      "Suche nach besseren Vertriebsunterstützungstools",
      "Wunsch nach Etablierung als Thought Leader"
    ],
    budget: "Über 150.000 € jährlich",
    decisionMaking: "Benötigt Vorstandsgenehmigung für >200.000 €",
    preferredContact: "Direkte Telefonanrufe, Geschäftsessen",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Emma Thompson",
    title: "Chief Marketing Officer",
    company: "Future Dynamics",
    experience: "18 Jahre im B2B-Marketing und in der Markenentwicklung",
    education: "MSc Marketing von LSE, Google Digital Marketing Zertifizierung",
    languages: ["Englisch", "Französisch"],
    interests: ["Content-Strategie", "Marketing-Analytik", "Personal Branding", "Social Selling"],
    achievements: [
      "Steigerung der Inbound-Leads um 400%",
      "Aufbau eines preisgekrönten Marketing-Teams",
      "Veröffentlichte Autorin zum Thema B2B-Marketing"
    ],
    painPoints: [
      "Notwendigkeit, das Social-Media-Engagement zu verbessern",
      "Wunsch nach besserer Marketing-Attribution",
      "Suche nach innovativen Content-Formaten"
    ],
    budget: "80.000 € - 120.000 € jährlich",
    decisionMaking: "Volle Autonomie über das Marketing-Budget",
    preferredContact: "Zuerst E-Mail, dann Videoanruf",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const products: Product[] = [
  {
    id: 1,
    name: "LinkedIn Wachstumsbeschleuniger",
    description: "Komplette LinkedIn-Präsenzoptimierung und Engagement-Strategie",
    features: [
      "Entwicklung der persönlichen Marke",
      "Content-Kalender-Management",
      "Engagement-Automatisierung",
      "Analytik und Berichterstattung"
    ],
    benefits: [
      "3-fache Steigerung der Profilsichtbarkeit",
      "Qualitative Lead-Generierung",
      "Etablierung als Thought Leader",
      "Netzwerkwachstumsoptimierung"
    ],
    pricing: "Ab 2.500 €/Monat",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=200&h=200",
    icon: <LinkedinIcon />
  },
  {
    id: 2,
    name: "B2B Social Selling Suite",
    description: "Umfassende Social-Selling- und Lead-Generierungsplattform",
    features: [
      "Multi-Plattform-Management",
      "Lead-Scoring und -Tracking",
      "Automatisierte Kontaktaufnahme",
      "CRM-Integration"
    ],
    benefits: [
      "Qualifizierte Lead-Generierung",
      "Verkürzter Verkaufszyklus",
      "Verbesserte Konversionsraten",
      "ROI-Tracking"
    ],
    pricing: "Individuelle Preisgestaltung je nach Umfang",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200&h=200",
    icon: <Globe2 />
  },
  {
    id: 3,
    name: "Executive Branding Programm",
    description: "Premium Personal Branding und Thought Leadership Entwicklung",
    features: [
      "Content-Erstellung und Ghostwriting",
      "Buchung von Vortragsengagements",
      "Medienpräsenz",
      "Einreichung für Auszeichnungen"
    ],
    benefits: [
      "Status als Branchenautorität",
      "Hochwertiges Netzwerkwachstum",
      "Mediensichtbarkeit",
      "Geschäftsmöglichkeiten"
    ],
    pricing: "5.000 €/Monat (Mindestlaufzeit 6 Monate)",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=200&h=200",
    icon: <Users2 />
  },
  {
    id: 4,
    name: "Social Analytics & Intelligence",
    description: "Fortschrittliche Social-Media-Analytik und Wettbewerbsintelligenz",
    features: [
      "Wettbewerbsanalyse",
      "Markttrendverfolgung",
      "Engagement-Metriken",
      "ROI-Berechnung"
    ],
    benefits: [
      "Datengestützte Entscheidungen",
      "Strategische Einblicke",
      "Leistungsoptimierung",
      "Marktpositionierung"
    ],
    pricing: "Ab 1.500 €/Monat",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200&h=200",
    icon: <BarChart3 />
  }
];

function App() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);
  const [showNewServiceModal, setShowNewServiceModal] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);
  const [showImpressumModal, setShowImpressumModal] = useState(false);
  const [showDatenschutzModal, setShowDatenschutzModal] = useState(false);
  const [legalContent, setLegalContent] = useState<LegalContent>({ impressum: '', datenschutz: '' });

  useEffect(() => {
    const fetchLegalContent = async () => {
      try {
        const [impressumResponse, datenschutzResponse] = await Promise.all([
          fetch('/server/impressum.md'),
          fetch('/server/datenschutz.md')
        ]);
        
        const [impressum, datenschutz] = await Promise.all([
          impressumResponse.text(),
          datenschutzResponse.text()
        ]);
        
        setLegalContent({ impressum, datenschutz });
      } catch (error) {
        console.error('Error loading legal content:', error);
      }
    };
    
    fetchLegalContent();
  }, []);

  const generateStrategies = async () => {
    if (!selectedProfile || !selectedProduct) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      console.log('Sending request to backend with:', { profile: selectedProfile, product: selectedProduct });
      
      const response = await fetch('/api/generate-strategies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: selectedProfile,
          product: selectedProduct
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server antwortete mit Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received response from backend:', data);
      console.log('Response type:', typeof data);
      console.log('Response keys:', Object.keys(data));
      console.log('Has strategies property:', data.hasOwnProperty('strategies'));
      
      // Prüfe verschiedene mögliche Formate der Antwort
      let strategiesData: Strategy[] = [];
      
      if (data && Array.isArray(data.strategies)) {
        // Format: { strategies: [...] }
        strategiesData = data.strategies;
      } else if (data && Array.isArray(data)) {
        // Format: [...]
        strategiesData = data;
      } else if (typeof data === 'object' && data !== null) {
        // Versuche, die Daten als Strategien zu interpretieren
        if (data.title && data.approach && Array.isArray(data.talkingPoints) && data.openingMessage) {
          strategiesData = [data as Strategy];
        }
      }
      
      if (strategiesData.length > 0) {
        console.log('Setting strategies and showing modal:', strategiesData);
        setStrategies(strategiesData);
        console.log('Modal state before:', showModal);
        setShowModal(true);
        console.log('Modal state after:', true);
      } else {
        console.error('Invalid response format:', data);
        // Erstelle eine Fallback-Strategie
        const fallbackStrategy: Strategy = {
          title: "Fallback-Strategie",
          approach: "Es gab ein Problem bei der Generierung der Strategien. Hier ist eine einfache Fallback-Strategie.",
          talkingPoints: ["Kontaktieren Sie den Kunden direkt", "Stellen Sie Fragen zu seinen Bedürfnissen", "Präsentieren Sie die Vorteile des Produkts"],
          openingMessage: "Hallo, ich würde gerne mehr über Ihre Bedürfnisse erfahren."
        };
        setStrategies([fallbackStrategy]);
        setShowModal(true);
        setError('Ungültiges Antwortformat vom Server. Fallback-Strategie wird angezeigt.');
      }
    } catch (err) {
      console.error('Error generating strategies:', err);
      setError(err instanceof Error ? err.message : 'Fehler bei der Generierung von Strategien');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = () => {
    generateStrategies();
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setExpandedStrategy(null);
    generateStrategies().finally(() => {
      setIsRegenerating(false);
    });
  };

  const toggleProfile = (profileId: number) => {
    setExpandedProfile(expandedProfile === profileId ? null : profileId);
  };

  const toggleStrategy = (strategyIndex: number) => {
    setExpandedStrategy(expandedStrategy === strategyIndex ? null : strategyIndex);
  };

  const LegalModal = ({ isOpen, onClose, title, content }: { isOpen: boolean; onClose: () => void; title: string; content: string }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl">🚀</span>
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Sales Assistant (Demo)</h1>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!selectedProfile || !selectedProduct || isAnalyzing}
              className={`
                px-6 py-3 rounded-lg text-white font-medium flex items-center
                ${
                  !selectedProfile || !selectedProduct || isAnalyzing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }
              `}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Analyzing Sales Vectors...
                </>
              ) : (
                <>
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Generate Sales Strategies
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Profiles Column */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-indigo-600" />
                  Customer Profiles
                </h2>
                <button
                  className="inline-flex items-center px-3 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowNewProfileModal(true)}
                >
                  <LinkedinIcon className="h-4 w-4 mr-1" />
                  Import from LinkedIn
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6">Please select a customer profile you want to create a sales strategy for</p>
              <div className="space-y-4">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className={`rounded-lg border transition-all ${
                      selectedProfile?.id === profile.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => {
                        setSelectedProfile(profile);
                        toggleProfile(profile.id);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={profile.image}
                            alt={profile.name}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{profile.name}</h3>
                            <p className="text-sm text-gray-600">{profile.title}</p>
                            <p className="text-sm text-gray-500">{profile.company}</p>
                          </div>
                        </div>
                        {expandedProfile === profile.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    {expandedProfile === profile.id && (
                      <div className="px-4 pb-4 space-y-4">
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Background</h4>
                          <p className="text-sm text-gray-600">{profile.experience}</p>
                          <p className="text-sm text-gray-600 mt-1">{profile.education}</p>
                          <p className="text-sm text-gray-600 mt-1">Languages: {profile.languages.join(", ")}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Key Achievements</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {profile.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Current Challenges</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {profile.painPoints.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Budget</h4>
                            <p className="text-sm text-gray-600">{profile.budget}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Decision Making</h4>
                            <p className="text-sm text-gray-600">{profile.decisionMaking}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Interests</h4>
                          <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Package2 className="h-5 w-5 mr-2 text-indigo-600" />
                  Services & Solutions
                </h2>
                <button
                  className="inline-flex items-center px-3 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowNewServiceModal(true)}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  New Service
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6">Choose a service or solution to match with the selected profile</p>
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedProduct?.id === product.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                          {product.icon}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                          <ul className="mt-2 grid grid-cols-2 gap-2">
                            {product.features.map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-indigo-600">{product.pricing}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Personalized Sales Strategies</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {error && (
                <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg">
                  <p>Error: {error}</p>
                  <p>Please try again or check your API key configuration.</p>
                </div>
              )}
              
              <div className="space-y-4">
                {!isRegenerating ? (
                  strategies.map((strategy, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleStrategy(index)}
                      >
                        <h4 className="font-medium text-indigo-600">{strategy.title}</h4>
                        {expandedStrategy === index ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      
                      {expandedStrategy === index && (
                        <div className="p-4 border-t border-gray-200">
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">Approach:</h5>
                            <p className="text-gray-700">{strategy.approach}</p>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">Key Talking Points:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {strategy.talkingPoints.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">Suggested Opening Message:</h5>
                            <p className="text-sm text-gray-600 italic">"{strategy.openingMessage}"</p>
                          </div>
                          
                          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Use This Strategy
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleRegenerate}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
                  disabled={isRegenerating}
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${isRegenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Profile Modal */}
        {showNewProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Import from LinkedIn</h3>
                <button
                  onClick={() => setShowNewProfileModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-indigo-700">This feature is currently under development. Coming soon!</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowNewProfileModal(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Service Modal */}
        {showNewServiceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create New Service</h3>
                <button
                  onClick={() => setShowNewServiceModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-indigo-700">This feature is currently under development. Coming soon!</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowNewServiceModal(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto py-4 bg-white border-t">
        <div className="container mx-auto px-4 flex justify-center space-x-4 text-sm text-gray-600">
          <button
            onClick={() => setShowImpressumModal(true)}
            className="hover:text-gray-900 hover:underline"
          >
            Impressum
          </button>
          <button
            onClick={() => setShowDatenschutzModal(true)}
            className="hover:text-gray-900 hover:underline"
          >
            Datenschutz
          </button>
        </div>
      </footer>

      <LegalModal
        isOpen={showImpressumModal}
        onClose={() => setShowImpressumModal(false)}
        title="Impressum"
        content={legalContent.impressum}
      />

      <LegalModal
        isOpen={showDatenschutzModal}
        onClose={() => setShowDatenschutzModal(false)}
        title="Datenschutzerklärung"
        content={legalContent.datenschutz}
      />
    </div>
  );
}

export default App;