import React, { useState, useEffect } from 'react';
import { VisibilityIcon, NoShowIcon, FinanceIcon } from './components/Icons';

// --- TYPE DEFINITIONS ---
interface FormData {
  name: string;
  whatsapp: string;
  email: string;
}

// --- HELPER & UI COMPONENTS (defined outside main component) ---

const Header: React.FC = () => (
  <header className="bg-light-gray py-6 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto">
      <h1 className="text-3xl font-serif font-bold text-charcoal-black">iTuk</h1>
    </div>
  </header>
);

interface HeroSectionProps {
  onCTAClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCTAClick }) => (
  <section className="bg-light-gray">
    <div className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content Column */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-charcoal-black leading-tight">
            iTuk: Sua Agenda Sempre Disponível. Mais Clientes. Mais Lucro.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-charcoal-black/80">
            Plataforma de gestão e visibilidade feita para profissionais de Beleza e Saúde. O investimento que se paga com o primeiro agendamento.
          </p>
          <button
            onClick={onCTAClick}
            className="mt-10 bg-soft-orange text-charcoal-black font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          >
            Quero Receber os Detalhes dos Planos e Acesso Prioritário
          </button>
        </div>
        
        {/* Image Column */}
        <div className="mt-12 md:mt-0 flex justify-center">
          <img 
            src="https://i.ibb.co/0RpNCjFf/image.png"
            alt="iTuk app mockup"
            className="rounded-3xl shadow-2xl max-h-[70vh] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection: React.FC = () => {
    const features = [
        { icon: VisibilityIcon, title: "Visibilidade Premium", description: "Perfil completo com avaliações que atraem novos clientes." },
        { icon: NoShowIcon, title: "Zero No-Show", description: "Lembretes automáticos via App e WhatsApp." },
        { icon: FinanceIcon, title: "Controle Financeiro", description: "Gestão clara de agenda e faturamento." }
    ];

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-soft-orange/20 p-4 rounded-full">
                                <feature.icon className="h-8 w-8 text-soft-orange" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold font-serif text-charcoal-black">{feature.title}</h3>
                            <p className="mt-2 text-charcoal-black/70">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

interface PricingCardProps {
    plan: {
        name: string;
        price: string;
        features: string[];
        note?: string;
        highlight: boolean;
        badge?: string;
    };
    onCTAClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onCTAClick }) => {
    const cardClasses = plan.highlight 
        ? "bg-soft-orange text-charcoal-black border-2 border-soft-orange" 
        : plan.name === 'iTuk STARTER' 
        ? "bg-charcoal-black text-white"
        : "bg-light-gray text-charcoal-black border border-gray-200";

    return (
        <div className={`p-8 rounded-2xl shadow-lg relative flex flex-col ${cardClasses} transform transition-transform duration-300 md:hover:scale-105`}>
            {plan.badge && <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-charcoal-black text-white px-4 py-1 rounded-full text-sm font-bold">{plan.badge}</span>}
            <h3 className="text-2xl font-serif font-bold text-center">{plan.name}</h3>
            <p className={`text-4xl font-bold text-center my-4 ${plan.name === 'iTuk STARTER' ? 'text-soft-orange' : ''}`}>{plan.price}</p>
            <ul className="space-y-3 my-6 text-center flex-grow">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            {plan.note && <p className="text-xs text-center text-charcoal-black/60 my-6">{plan.note}</p>}
             <button
              onClick={onCTAClick}
              className={`w-full mt-auto font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${plan.highlight ? 'bg-charcoal-black text-white hover:bg-black' : plan.name === 'iTuk STARTER' ? 'bg-soft-orange text-charcoal-black hover:bg-opacity-90' : 'bg-charcoal-black text-white hover:bg-black/80'}`}
            >
              Quero este plano
            </button>
        </div>
    );
}

const PricingSection: React.FC<{onCTAClick: () => void;}> = ({ onCTAClick }) => {
    const plans = [
        { name: "GRATUITO", price: "R$ 0", features: ["Perfil básico", "Contato via WhatsApp"], note: "Não recebe agendamentos diretos pelo app, avaliações não são exibidas.", highlight: false },
        { name: "iTuk STARTER", price: "R$ 9,99/mês", features: ["Até 20 agendamentos/mês", "Avaliações visíveis", "Ferramentas de gestão"], highlight: false },
        { name: "iTuk PREMIUM", price: "R$ 19,99/mês", features: ["Agendamentos ilimitados", "Avaliações visíveis", "Todas funcionalidades premium"], highlight: true, badge: "+ Recomendado" }
    ];

    return (
        <section id="planos" className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-black text-center mb-12">Escolha o plano ideal para você</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => <PricingCard key={i} plan={plan} onCTAClick={onCTAClick} />)}
                </div>
            </div>
        </section>
    );
};


const TestimonialsSection: React.FC = () => {
    const testimonials = [
        { quote: "Com o iTuk aumentei meus agendamentos em 40%.", name: "Ana", role: "Manicure", img: "https://picsum.photos/id/342/100/100" },
        { quote: "Diminuí quase 100% dos no-shows.", name: "Rafael", role: "Barbeiro", img: "https://picsum.photos/id/1005/100/100" },
        { quote: "Finalmente consigo controlar minha agenda e faturamento.", name: "Carla", role: "Esteticista", img: "https://picsum.photos/id/1027/100/100" }
    ];

    return (
        <section className="bg-light-gray py-16 md:py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-serif font-bold text-charcoal-black text-center mb-12">O que nossos parceiros dizem</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <div key={i} className="bg-white p-8 rounded-lg shadow-md">
                            <p className="text-charcoal-black/80 text-lg italic">"{testimonial.quote}"</p>
                            <div className="flex items-center mt-6">
                                <img src={testimonial.img} alt={testimonial.name} className="h-14 w-14 rounded-full object-cover" />
                                <div className="ml-4">
                                    <p className="font-bold text-charcoal-black">{testimonial.name}</p>
                                    <p className="text-sm text-charcoal-black/60">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

interface SignUpFormProps {
    onSubmitSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmitSuccess }) => {
    const [formData, setFormData] = useState<FormData>({ name: '', whatsapp: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!navigator.onLine) {
            setError("Você parece estar offline. Por favor, verifique sua conexão com a internet e tente novamente.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("https://formspree.io/f/mwpaeqog", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({ name: '', whatsapp: '', email: '' });
                onSubmitSuccess();
            } else {
                const data = await response.json();
                if (data.errors) {
                    setError(data.errors.map((err: { message: string }) => err.message).join(', '));
                } else {
                    setError("Ocorreu um erro ao enviar o formulário. Tente novamente.");
                }
            }
        } catch (err) {
            // This is a common pattern for CORS errors. The submission succeeds on Formspree,
            // but the browser blocks the response, causing a generic network error.
            // This more specific error message guides the user to the correct solution.
            setError("Erro de rede. Pode ser um erro de CORS. Verifique se o domínio do seu site está na lista de permissões nas configurações do seu formulário Formspree.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Seu Nome Completo" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-soft-orange focus:border-transparent transition" />
            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp (com DDD)" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-soft-orange focus:border-transparent transition" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Seu Melhor E-mail" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-soft-orange focus:border-transparent transition" />
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-soft-orange text-charcoal-black font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 disabled:bg-soft-orange/60 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Enviando...' : 'Quero Acesso Prioritário e os Detalhes dos Planos'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
    );
};


interface FinalCTASectionProps {
    onSubmitSuccess: () => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onSubmitSuccess }) => (
    <section id="final-cta" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal-black">Pronto para transformar sua carreira?</h2>
            <p className="mt-4 text-lg text-charcoal-black/70 mb-8">Deixe seus dados para receber os detalhes e um desconto exclusivo.</p>
            <SignUpForm onSubmitSuccess={onSubmitSuccess} />
            <p className="mt-6 text-sm text-charcoal-black/60 max-w-md mx-auto">
                Estamos em pré-lançamento. Sua inscrição garante prioridade e descontos exclusivos na primeira mensalidade.
            </p>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="bg-charcoal-black text-white py-6">
        <div className="container mx-auto px-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} iTuk. Todos os direitos reservados.</p>
        </div>
    </footer>
);


const ThankYouPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => (
    <div className="font-sans bg-white min-h-screen flex flex-col">
        <Header />
        <main className="bg-light-gray flex-grow flex items-center justify-center py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-black">Obrigado por se inscrever!</h2>
                <p className="mt-6 text-lg md:text-xl text-charcoal-black/80 max-w-2xl mx-auto">
                    Seus dados foram enviados com sucesso. Entraremos em contato em breve com os detalhes dos planos e seu acesso prioritário.
                </p>
                <button
                    onClick={onNavigateHome}
                    className="mt-10 bg-soft-orange text-charcoal-black font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                >
                    Voltar ao Início
                </button>
            </div>
        </main>
        <Footer />
    </div>
);


// --- MAIN APP COMPONENT ---

export default function App() {
    // Determine the current view based on the URL hash
    const getCurrentView = () => window.location.hash;
    const [view, setView] = useState(getCurrentView());

    // Listen for changes to the URL hash (e.g., browser back/forward buttons)
    useEffect(() => {
        const handleHashChange = () => {
            setView(getCurrentView());
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Function to programmatically navigate by changing the hash
    const navigate = (hash: string) => {
        window.location.hash = hash;
    };

    const handleFormSubmitSuccess = () => {
        navigate('obrigado'); // Navigates to #obrigado
    };

    const scrollToForm = () => {
        const formSection = document.getElementById('final-cta');
        formSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    if (view === '#obrigado') {
        return <ThankYouPage onNavigateHome={() => navigate('')} />;
    }

    return (
        <div className="font-sans bg-white">
            <Header />
            <main>
                <HeroSection onCTAClick={scrollToForm} />
                <FeaturesSection />
                <PricingSection onCTAClick={scrollToForm} />
                <TestimonialsSection />
                <FinalCTASection onSubmitSuccess={handleFormSubmitSuccess} />
            </main>
            <Footer />
        </div>
    );
}
