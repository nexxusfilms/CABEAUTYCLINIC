import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Star, 
  MapPin, 
  Instagram, 
  MessageCircle, 
  ShieldCheck, 
  Heart, 
  Clock, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_URL = "https://wa.me/5511979715304?text=Ol%C3%A1%21+Gostaria+de+agendar+uma+experi%C3%AAncia+na+CA+Beauty+Clinic.";
const INSTAGRAM_URL = "https://www.instagram.com/cabeautyclinic_/";
const MAPS_URL = "https://www.google.com/maps/place/CA+BEAUTY+CLINIC/@-23.6691346,-46.7356439,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce5353ffd3fbc9:0x6d71a620053ce62f!8m2!3d-23.6691379!4d-46.7339415!16s%2Fg%2F11svf2m78r";
const WAZE_URL = "https://waze.com/ul?ll=-23.6691379,-46.7339415&navigate=yes";
const LOGO_URL = "https://pbs.twimg.com/media/HDzb7T7XIAAeaPu?format=jpg&name=large";
const WHATSAPP_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";

const SERVICE_DETAILS: Record<string, string> = {
  "Fibra de Vidro": "A técnica de Fibra de Vidro é um método de extensão que proporciona alongamento com aspecto extremamente natural.\nIndicada para quem deseja unhas mais longas, resistentes e elegantes, ela se destaca pela durabilidade e acabamento delicado. A estrutura é moldada fio a fio, garantindo leveza, alta resistência e um resultado sofisticado. Ideal para quem busca beleza com performance.",
  "Banho de Gel": "O Banho de Gel não é um método de alongamento.\nEle é aplicado sobre a unha natural com o objetivo de fortalecer, proteger e criar uma camada estrutural que reduz quebras e descamações. O gel forma uma barreira resistente que auxilia no crescimento saudável das unhas.\nPerfeito para quem deseja manter o comprimento natural com mais firmeza e durabilidade.",
  "Blindagem (Esmaltação em Gel)": "A blindagem é uma esmaltação em gel aplicada sobre a unha natural, ideal para prolongar a durabilidade do esmalte e manter o brilho impecável por mais tempo.\nDurabilidade média: até 20 dias, dependendo dos cuidados e crescimento natural.",
  "Brow Lamination": "A técnica de Brow Lamination é um procedimento que foca na organização e alinhamento dos fios das sobrancelhas.\nEla permite criar um efeito de sobrancelhas mais cheias, alinhadas e com aspecto de 'penteadas'.\nIdeal para quem tem fios rebeldes, falhas ou deseja um visual mais moderno e expressivo.\nA técnica utiliza produtos específicos que suavizam a cutícula do fio, permitindo que ele seja moldado na direção desejada.\nResultado: sobrancelhas impecáveis, com volume e definição natural.",
  "Design Personalizado": "Cada sobrancelha é única e o design também deve ser. A técnica é realizada com visagismo, respeitando o formato do rosto, proporções faciais, personalidade e estrutura natural dos fios.\nO objetivo não é transformar, mas harmonizar.\nCriamos um desenho estratégico que valoriza sua expressão sem perder naturalidade.\nResultado: equilíbrio, leveza e identidade preservada.",
  "Design Personalizado com Tintura": "Além do design estratégico, a tintura intensifica a cor dos fios, proporcionando maior definição e preenchimento visual. Ideal para fios claros, ralos ou com pequenas falhas. Diferente da henna, a tintura pigmenta os fios e não a pele, garantindo um resultado mais natural e sofisticado.\nDurabilidade média de até 30 dias nos fios.\nDefinição sutil, elegante e duradoura.",
  "Combo: Brow Lamination + Lash Lifting": "A união perfeita para transformar o olhar de forma completa.\nEnquanto o Brow Lamination organiza e estrutura as sobrancelhas, o Lash Lifting eleva e curva os cílios naturais, ampliando a expressão do olhar sem necessidade de extensão.\nUm combo pensado para quem deseja praticidade, sofisticação e impacto natural.\nResultado: olhar mais aberto, marcante e harmonioso.",
  "Volume Brasileiro": "Uma técnica que equilibra naturalidade e presença.\nO Volume Brasileiro combina fios tecnológicos e aplicação estratégica para criar um efeito mais preenchido, mantendo leveza e movimento. Ideal para quem deseja realçar o olhar sem perder a suavidade. Mais definição, sem exageros.\nUm olhar naturalmente marcante.",
  "Volume Marrom": "Perfeito para quem busca sutileza e elegância.\nA aplicação com fios marrons proporciona um efeito mais delicado e harmonioso, suavizando o contraste e valorizando traços de forma sofisticada.\nIdeal para loiras, ruivas ou para quem prefere um acabamento mais discreto e refinado.\nNaturalidade com personalidade.",
  "Volume Hollywood": "Intenso, estruturado e impactante.\nO Volume Hollywood entrega máximo preenchimento com acabamento uniforme, criando um olhar poderoso e glamouroso.\nIndicado para quem ama presença, fotos marcantes e um visual mais expressivo.\nImpacto controlado. Elegância com atitude.",
  "Volume Inglês": "Uma técnica que proporciona mais volume e definição, com curvatura estratégica e acabamento marcante.\nEntrega um olhar mais evidente e sofisticado, mantendo equilíbrio entre intensidade e harmonia facial.\nIdeal para quem deseja destacar os olhos no dia a dia ou em ocasiões especiais.",
  "Fox Eyes": "Tendência moderna que cria efeito alongado e levemente puxado no canto externo dos olhos.\nA técnica valoriza o formato natural, proporcionando um olhar mais sensual, elegante e contemporâneo.\nPerfeita para quem busca um visual mais afilado e estilizado.\nOlhar alongado. Expressão marcante.",
  "Sirena": "Aplicação estratégica que concentra a extensão até aproximadamente 50% a 60% dos cílios naturais.\nO resultado é um efeito leve, alongado e extremamente natural, criando um olhar delicado e sofisticado.\nIdeal para quem deseja realce sutil com acabamento minimalista.\nMenos volume. Mais elegância.",
  "Efeito Delineado": "Técnica que posiciona estrategicamente fios mais longos na linha superior, criando a ilusão de um delineado discreto e elegante.\nO efeito proporciona mais profundidade ao olhar, destacando o formato dos olhos sem perder leveza.\nIdeal para quem deseja definição marcante com acabamento sofisticado.\nUm olhar definido, sem precisar de maquiagem.",
  "Lash Lifting": "Procedimento que curva e eleva os fios naturais desde a raiz, proporcionando efeito de cílios mais longos e alinhados.\nO resultado é um olhar mais aberto e expressivo, mantendo total naturalidade sem extensões.\nDurabilidade média de 35 a 45 dias, variando conforme os cuidados e o ciclo natural dos fios.\nBeleza natural potencializada.",
  "Hidra Gloss": "Hidra Gloss Lips\nÉ um tratamento avançado de hidratação profunda e regeneração labial.\nMais do que estética, ele devolve aos seus lábios aquilo que o tempo, o clima e os hábitos diários retiram: maciez, viço e saúde.\n\nSua fórmula atua diretamente na revitalização do tecido labial, restaurando a hidratação de dentro para fora proporcionando lábios mais suaves, uniformes e naturalmente iluminados.\n\nE o mais importante:\nO Hidra Gloss é um dos poucos procedimentos estéticos capazes de promover hidratação real e duradoura, indo além da hidratação superficial que apenas a água oferece.\n\nResultado?\nLábios renovados, saudáveis e com aquele brilho sofisticado que dispensa filtros.\n\nAumenta os labios?\nNão. O Hidra Gloss Lips não é um procedimento de aumento labial.\nNo entanto, logo após a aplicação, é comum perceber um leve efeito de volume e contorno mais evidente. Isso acontece porque o sérum utilizado na hidratação contém Ácido Hialurônico um ativo amplamente conhecido por sua capacidade de reter água e proporcionar aspecto mais preenchido à pele.\n\nDiferente do preenchimento labial, o foco aqui não é volumizar, mas hidratar profundamente e revitalizar a estrutura dos lábios. O resultado é um efeito visual mais uniforme, viçoso e saudável, o que naturalmente cria a sensação de lábios mais definidos.\n\nBeleza real, sem exageros. Apenas lábios tratados, nutridos e naturalmente mais bonitos.\n\nTempo de duração\nA durabilidade do Hidra Gloss Lips pode chegar a até 2 meses, variando de acordo com o nível de ressecamento e os cuidados individuais de cada cliente.\nLábios mais ressecados tendem a absorver mais o ativo na primeira aplicação, o que torna o tratamento ainda mais necessário.\n\nPara resultados mais duradouros e consistentes, recomendamos um protocolo de 2 a 4 sessões, respeitando o intervalo ideal indicado pela profissional.\n\nO Hidra Gloss não é apenas um procedimento pontual, é um cuidado contínuo que mantém os lábios sempre hidratados, saudáveis e com aspecto naturalmente revitalizado."
};

const CATALOGS = {
  premium: {
    title: "Serviços Premium",
    categories: [
      {
        name: "Lash Design",
        services: [
          { name: "Volume Brasileiro", price: "Consulte", img: "https://pbs.twimg.com/media/HEMGrpebAAAvSWV?format=jpg&name=large" },
          { name: "Volume Marrom", price: "Consulte", img: "https://pbs.twimg.com/media/HEMGcOUWAAAC0vQ?format=jpg&name=large" },
          { name: "Volume Hollywood", price: "Consulte", img: "https://pbs.twimg.com/media/HEMGcObWMAMgF46?format=jpg&name=large" },
          { name: "Volume Inglês", price: "Consulte", img: "https://pbs.twimg.com/media/HEMGcOoaIAAfX09?format=jpg&name=large" },
          { name: "Fox Eyes", price: "Consulte", img: "https://pbs.twimg.com/media/HEMGcOaWMAMQbSx?format=jpg&name=large" },
          { name: "Sirena", price: "Consulte", img: "https://pbs.twimg.com/media/HEMGrpDWMAIrDWe?format=jpg&name=large" },
          { name: "Efeito Delineado", price: "Consulte", img: "https://pbs.twimg.com/media/HEL2dIpa8AA7hVe?format=jpg&name=large" },
          { name: "Lash Lifting", price: "Consulte", img: "https://pbs.twimg.com/media/HE2KCaOXEAA7pBr?format=jpg&name=large" },
          { name: "Combo: Brow Lamination + Lash Lifting", price: "Consulte", img: "https://pbs.twimg.com/media/HE2Syz_bMAA0PvN?format=jpg&name=large" }
        ]
      },
      {
        name: "Sobrancelhas",
        services: [
          { name: "Brow Lamination", price: "Consulte", img: "https://pbs.twimg.com/media/HEL2dIpa8AA7hVe?format=jpg&name=large" },
          { name: "Design Personalizado", price: "Consulte", img: "http://pbs.twimg.com/media/HF5BvqGXcAAN9xa?format=jpg&name=large" },
          { name: "Design Personalizado com Tintura", price: "Consulte", img: "https://pbs.twimg.com/media/HF5Bvo2WgAAlDYd?format=jpg&name=large" },
          { name: "Combo: Brow Lamination + Lash Lifting", price: "Consulte", img: "https://pbs.twimg.com/media/HE2Syz_bMAA0PvN?format=jpg&name=large" }
        ]
      },
      {
        name: "Estética Labial",
        services: [
          { name: "Hidra Gloss", price: "Consulte", img: "https://pbs.twimg.com/media/HEMIpsoWYAAqPEo?format=jpg&name=large" }
        ]
      }
    ]
  },
  nails: {
    title: "Nail Design",
    services: [
      { name: "Fibra de Vidro", price: "Consulte", img: "https://pbs.twimg.com/media/HELvUW9XIAAtyi3?format=jpg&name=large" },
      { name: "Banho de Gel", price: "Consulte", img: "https://pbs.twimg.com/media/HELvTEYaIAMirTH?format=jpg&name=large" },
      { name: "Blindagem (Esmaltação em Gel)", price: "Consulte", img: "https://pbs.twimg.com/media/HE2IJp8WIAAoPxa?format=jpg&name=large" }
    ]
  }
};

const ServiceDetailModal = ({ isOpen, onClose, title, items }: { isOpen: boolean, onClose: () => void, title: string, items: string[] }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const whatsappMessage = encodeURIComponent(`Olá! Gostaria de agendar uma experiência de ${title}.`);
  const dynamicWhatsappUrl = `https://wa.me/5511979715304?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy/95 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh]"
          >
            <div className="p-5 md:p-10 flex justify-between items-center border-b border-light-gray">
              <h2 className="text-xl md:text-3xl font-sans font-black text-navy tracking-tighter">{title}</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-light-gray flex items-center justify-center text-navy hover:bg-rose-gold hover:text-white transition-all flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-10 space-y-6 md:space-y-8">
              {items.map((item, idx) => (
                <div key={idx} className="space-y-2 md:space-y-3">
                  <h4 className="text-lg md:text-xl font-sans font-bold text-rose-gold tracking-tight">{item}</h4>
                  <p className="text-navy/70 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {SERVICE_DETAILS[item] || "Informações detalhadas em breve."}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-soft-pink/20 text-center">
              <a 
                href="#catalogo"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-rose-gold transition-all"
              >
                Agende seu momento <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const CatalogModal = ({ isOpen, onClose, catalogType }: { isOpen: boolean, onClose: () => void, catalogType: 'premium' | 'nails' | null }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!catalogType) return null;
  const catalog = CATALOGS[catalogType];

  const handleServiceClick = (serviceName: string) => {
    const message = encodeURIComponent(`Olá! Gostaria de agendar o serviço: ${serviceName}`);
    window.open(`https://wa.me/5511979715304?text=${message}`, '_blank');
  };

  const allServices = 'categories' in catalog 
    ? catalog.categories.flatMap(c => c.services)
    : catalog.services;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy/90 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl bg-white rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-[90vh] md:h-auto md:max-h-[90vh]"
          >
            <div className="p-5 md:p-10 flex justify-between items-center border-b border-light-gray flex-shrink-0">
              <div>
                <h2 className="text-xl md:text-4xl font-sans font-black text-navy tracking-tighter">{catalog.title}</h2>
                <p className="text-navy/60 text-[10px] md:text-sm mt-1 md:mt-2 uppercase tracking-widest">Explore nossas especialidades</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-light-gray flex items-center justify-center text-navy hover:bg-rose-gold hover:text-white transition-all flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 md:py-10 px-4 md:px-10">
              {'categories' in catalog ? (
                <div className="space-y-12">
                  {catalog.categories.map((category, catIdx) => (
                    <div key={catIdx}>
                      <h3 className="text-lg md:text-2xl font-sans font-black text-navy mb-6 md:mb-8 uppercase tracking-widest border-l-4 border-rose-gold pl-4">{category.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {category.services.map((service, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="snap-center bg-white rounded-[1rem] md:rounded-[2rem] overflow-hidden border border-light-gray/50 shadow-sm hover:shadow-md hover:border-rose-gold/30 transition-all group cursor-pointer"
                            onClick={() => handleServiceClick(service.name)}
                          >
                            <div className="aspect-square overflow-hidden">
                              <img 
                                src={service.img} 
                                alt={service.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="p-3 md:p-6 text-center">
                              <h4 className="text-[10px] md:text-base font-sans font-bold text-navy mb-1 leading-tight">{service.name}</h4>
                              <p className="text-rose-gold font-bold mb-2 md:mb-4 text-[8px] md:text-xs">{service.price}</p>
                              <button className="w-full py-2 md:py-3 bg-navy text-white rounded-lg text-[7px] md:text-[9px] uppercase tracking-[0.15em] font-bold group-hover:bg-rose-gold transition-colors">
                                Agendar
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {catalog.services.map((service, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="snap-center bg-white rounded-[1rem] md:rounded-[2rem] overflow-hidden border border-light-gray/50 shadow-sm hover:shadow-md hover:border-rose-gold/30 transition-all group cursor-pointer"
                      onClick={() => handleServiceClick(service.name)}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={service.img} 
                          alt={service.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-3 md:p-6 text-center">
                        <h4 className="text-[10px] md:text-base font-sans font-bold text-navy mb-1 leading-tight">{service.name}</h4>
                        <p className="text-rose-gold font-bold mb-2 md:mb-4 text-[8px] md:text-xs">{service.price}</p>
                        <button className="w-full py-2 md:py-3 bg-navy text-white rounded-lg text-[7px] md:text-[9px] uppercase tracking-[0.15em] font-bold group-hover:bg-rose-gold transition-colors">
                          Agendar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 md:p-8 bg-soft-pink/30 text-center text-[9px] md:text-xs text-navy/50 uppercase tracking-widest flex-shrink-0">
              Clique no serviço para iniciar o agendamento via WhatsApp
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Quem Somos', href: '#quem-somos' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Localização', href: '#localizacao' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-navy shadow-xl py-4 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#servicos" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-sans font-bold text-white tracking-tighter group-hover:text-rose-gold transition-colors">
            CA Beauty Clinic
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-rose-gold transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#catalogo"
            className="bg-rose-gold text-white px-5 py-2 rounded-full text-[10px] uppercase tracking-widest hover:bg-rose-gold/90 transition-all shadow-sm hover:shadow-md"
          >
            Agendar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-navy/95 backdrop-blur-lg shadow-2xl md:hidden py-6 px-6 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm uppercase tracking-[0.2em] text-white/90 border-b border-white/5 pb-3"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#catalogo"
                className="bg-rose-gold text-white py-3.5 rounded-full text-[10px] uppercase tracking-widest text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                Agendar Agora
              </a>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ title, items, icon: Icon, delay, onShowDetails }: { title: string, items: string[], icon: any, delay: number, onShowDetails: (title: string, items: string[]) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const showMore = items.length > 3;
  const displayedItems = isExpanded ? items : items.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-light-gray hover:border-rose-gold/30 transition-all group flex flex-col h-full"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative bg-rose-gold/5 rounded-2xl">
        <Icon size={28} className="text-rose-gold relative z-10 md:size-[32px]" />
      </div>
      <h3 className="text-xl md:text-2xl font-sans font-extrabold text-navy mb-4 tracking-tighter">{title}</h3>
      <ul className="space-y-3 flex-grow">
        {displayedItems.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-navy/70">
            <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            {item}
          </li>
        ))}
        {showMore && (
          <li>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-rose-gold uppercase tracking-widest hover:underline mt-2"
            >
              {isExpanded ? "- Ver menos" : "+ Ver mais"}
            </button>
          </li>
        )}
      </ul>
      <button 
        onClick={() => onShowDetails(title, items)}
        className="mt-8 flex items-center gap-2 text-rose-gold text-sm font-semibold uppercase tracking-wider group-hover:gap-3 transition-all text-left"
      >
        Saiba mais <ChevronRight size={16} />
      </button>
    </motion.div>
  );
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCatalog, setActiveCatalog] = useState<'premium' | 'nails' | null>(null);
  
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailTitle, setDetailTitle] = useState("");
  const [detailItems, setDetailItems] = useState<string[]>([]);

  const openCatalog = (type: 'premium' | 'nails') => {
    setActiveCatalog(type);
    setModalOpen(true);
  };

  const openDetails = (title: string, items: string[]) => {
    setDetailTitle(title);
    setDetailItems(items);
    setDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen selection:bg-rose-gold/20 selection:text-rose-gold">
      <Navbar />
      
      <CatalogModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        catalogType={activeCatalog} 
      />

      <ServiceDetailModal 
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title={detailTitle}
        items={detailItems}
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://pbs.twimg.com/media/HELx8a4aIAQpuww?format=jpg&name=large" 
            alt="Luxury Clinic Interior" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 md:bg-gradient-to-r md:from-white md:via-white/80 md:to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-12 md:py-0">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-left mx-auto md:mx-0"
            >
              <span className="inline-block px-4 py-1.5 bg-soft-pink text-rose-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6">
                Estética Premium em São Paulo
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-black text-navy leading-[1.1] mb-8 tracking-tighter">
                Realçando sua beleza com <span className="italic text-rose-gold font-display font-medium">excelência</span> e naturalidade.
              </h1>
              <p className="text-base md:text-xl text-navy/80 font-light mb-10 max-w-lg leading-relaxed">
                Especialistas em Cílios, Sobrancelhas, Unhas e Estética Avançada. Uma experiência exclusiva para quem não abre mão do cuidado premium.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#catalogo"
                  className="bg-rose-gold text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-rose-gold/90 transition-all shadow-xl hover:shadow-rose-gold/20 flex items-center justify-center gap-3 group border border-rose-gold/20"
                >
                  Agendar Minha Experiência
                  <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-6 h-6 object-contain group-hover:rotate-12 transition-transform" referrerPolicy="no-referrer" />
                </a>
                <a 
                  href="#catalogo"
                  className="bg-white/70 backdrop-blur-sm border border-navy/10 text-navy px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-navy hover:text-white transition-all text-center"
                >
                  Ver Catálogo
                </a>
              </div>
            </motion.div>

            {/* Floating Elements - Now inside the flex container to avoid overlap */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden xl:block shrink-0 ml-12"
            >
              <div className="w-80 h-80 rounded-[5rem] border-4 border-gold p-0 bg-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
                <img 
                  src="https://pbs.twimg.com/media/HDzRoKyXEAEvLpO?format=jpg&name=large" 
                  alt="Beauty Detail" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-light-gray/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-sans font-black text-navy mb-4 tracking-tighter">Nossas Especialidades</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6" />
            <p className="text-navy/60 max-w-2xl mx-auto font-light">
              Técnicas exclusivas desenvolvidas para realçar seus traços naturais com sofisticação e durabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              title="Nail Design"
              icon={Sparkles}
              delay={0.1}
              items={["Fibra de Vidro", "Banho de Gel", "Blindagem (Esmaltação em Gel)"]}
              onShowDetails={openDetails}
            />
            <ServiceCard 
              title="Lash Design"
              icon={Star}
              delay={0.2}
              items={["Volume Brasileiro", "Volume Marrom", "Volume Hollywood", "Volume Inglês", "Fox Eyes", "Sirena", "Efeito Delineado", "Lash Lifting", "Combo: Brow Lamination + Lash Lifting"]}
              onShowDetails={openDetails}
            />
            <ServiceCard 
              title="Sobrancelhas"
              icon={Heart}
              delay={0.3}
              items={["Brow Lamination", "Design Personalizado", "Design Personalizado com Tintura", "Combo: Brow Lamination + Lash Lifting"]}
              onShowDetails={openDetails}
            />
            <ServiceCard 
              title="Estética Labial"
              icon={ShieldCheck}
              delay={0.4}
              items={["Hidra Gloss"]}
              onShowDetails={openDetails}
            />
          </div>
        </div>
      </section>

      {/* Catalogs Section */}
      <section id="catalogo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-sans font-black text-navy mb-4 tracking-tighter">Nosso Catálogo</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6" />
            <p className="text-navy/60 max-w-2xl mx-auto font-light">
              Explore nossos serviços detalhados e escolha a experiência perfeita para você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] aspect-[4/3] md:aspect-video shadow-2xl"
            >
              <img 
                src="https://pbs.twimg.com/media/HDz_zksXkAAbjVw?format=jpg&name=large" 
                alt="Catálogo de Serviços" 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                <h3 className="text-2xl md:text-3xl font-sans font-bold mb-2">Serviços Premium</h3>
                <p className="text-white/80 mb-4 md:mb-6 font-light text-sm md:text-base">Lash Design, Sobrancelhas e Estética Labial</p>
                <button 
                  onClick={() => openCatalog('premium')}
                  className="inline-flex items-center gap-2 bg-rose-gold px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[10px] md:text-sm uppercase tracking-widest hover:bg-rose-gold/90 transition-all"
                >
                  Ver Catálogo <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] aspect-[4/3] md:aspect-video shadow-2xl"
            >
              <img 
                src="https://pbs.twimg.com/media/HELf4pvaIAEr5Dv?format=jpg&name=large" 
                alt="Catálogo Nail Design" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                <h3 className="text-2xl md:text-3xl font-sans font-bold mb-2">Nail Design</h3>
                <p className="text-white/80 mb-4 md:mb-6 font-light text-sm md:text-base">Fibra de Vidro, Gel e Blindagem</p>
                <button 
                  onClick={() => openCatalog('nails')}
                  className="inline-flex items-center gap-2 bg-rose-gold px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[10px] md:text-sm uppercase tracking-widest hover:bg-rose-gold/90 transition-all"
                >
                  Ver Catálogo <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section id="diferenciais" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10"
              >
                <img 
                  src="https://pbs.twimg.com/media/HELx8a4aIAQpuww?format=jpg&name=large" 
                  alt="Professional Treatment" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-soft-pink rounded-full -z-0" />
              <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-gold rounded-full -z-0" />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-sans font-black text-navy mb-8 tracking-tighter">A Experiência CA Beauty</h2>
              <p className="text-lg text-navy/70 font-light mb-12 leading-relaxed">
                Mais do que um procedimento, oferecemos um momento de revitalização e harmonia. Cada detalhe foi pensado para sua exclusividade.
              </p>

              <div className="space-y-8">
                {[
                  { title: "Atendimento Personalizado", desc: "Consultoria de visagismo para resultados únicos.", icon: Heart },
                  { title: "Biossegurança Rigorosa", desc: "Protocolos hospitalares de esterilização e higiene.", icon: ShieldCheck },
                  { title: "Saúde Natural", desc: "Produtos que preservam a integridade dos seus fios e unhas.", icon: Sparkles },
                  { title: "Técnicas Avançadas", desc: "Atualização constante com as tendências mundiais.", icon: Clock },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center relative bg-rose-gold/5 rounded-2xl">
                      <item.icon size={28} className="text-rose-gold relative z-10" />
                    </div>
                    <div>
                      <h4 className="text-xl font-sans font-bold text-navy mb-1 tracking-tight">{item.title}</h4>
                      <p className="text-sm text-navy/60">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="quem-somos" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-soft-pink/30 rounded-full blur-3xl" />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group relative">
                  <img 
                    src="https://pbs.twimg.com/media/HEcP0Y2XIAAELqt?format=jpg&name=large" 
                    alt="Camile - Sócia CA Beauty Clinic" 
                    className="w-full h-full object-cover scale-[1.15] object-center group-hover:scale-[1.2] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <p className="font-sans font-bold text-navy">Camile</p>
                  <p className="text-xs text-rose-gold uppercase tracking-widest">Lash Designer & Design de Sobrancelhas</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4 mt-12"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group relative">
                  <img 
                    src="https://pbs.twimg.com/media/HEcP0ZVaEAAotvG?format=jpg&name=large" 
                    alt="Jamily - Sócia CA Beauty Clinic" 
                    className="w-full h-full object-cover scale-[1.15] object-center group-hover:scale-[1.2] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <p className="font-sans font-bold text-navy">Jamily</p>
                  <p className="text-xs text-rose-gold uppercase tracking-widest">Nail Designer</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-rose-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Nossa História</span>
              <h2 className="text-4xl md:text-5xl font-sans font-black text-navy mb-8 tracking-tighter">Quem Somos</h2>
              <div className="space-y-6 text-navy/80 font-light leading-relaxed text-sm md:text-base">
                <p>
                  Na <span className="font-bold text-navy">CA Beauty Clinic</span>, acreditamos que a beleza é a expressão mais autêntica da confiança e da superação. Nossa história é tecida com a coragem de duas irmãs, Camile e Jamily, que, movidas por um sonho compartilhado, decidiram romper com ciclos tradicionais para construir um legado de paixão, técnica e dedicação.
                </p>
                <p>
                  A jornada da clínica começou com a ousadia de Camile. Determinada a trilhar um caminho diferente do histórico familiar em restaurantes, ela encontrou no universo da extensão de cílios a sua verdadeira vocação. O início foi marcado pela resiliência: entre cursos online e atendimentos em um quarto improvisado, Camile enfrentou o barulho e o desconforto doméstico com uma única certeza: a de que seu talento transformaria olhares. Com apenas uma poltrona, um carrinho e uma coragem inabalável, ela deu o passo decisivo para abrir o seu primeiro estúdio próprio.
                </p>
                <p>
                  Inspirada pelo brilho no olhar e pela garra da irmã, Jamily também decidiu transformar sua trajetória. Após experiências desafiadoras como babá e recepcionista, ela mergulhou no mundo das unhas. Investindo cada centavo de suas economias em formação e aperfeiçoamento, Jamily consolidou sua expertise como Nail Designer. Mesmo conciliando trabalhos extras para manter o sonho vivo, ela nunca deixou de acreditar que a excelência técnica seria a base do seu sucesso.
                </p>
                <p>
                  Juntas, as irmãs transformaram o medo de empreender em um motor de crescimento. Da primeira sala comercial à expansão para um bairro com maior visibilidade, cada etapa foi conquistada com as próprias mãos, literalmente. Sem orçamento para grandes obras, Camile e Jamily pesquisaram tutorais, aprenderam técnicas de reforma e, em pouco mais de uma semana, deram vida ao novo lar da CA Beauty Clinic.
                </p>
                <p>
                  Hoje, a <span className="font-bold text-navy">CA Beauty Clinic</span> é muito mais do que um centro de estética; é um refúgio onde a técnica apurada encontra o cuidado humanizado. É o resultado de uma história de superação de duas mulheres que não temem desafios e buscam constantemente a perfeição em cada detalhe. Nosso propósito é realçar a beleza única de cada cliente, oferecendo serviços de cílios e unhas que elevam a autoestima e inspiram confiança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-sans font-black mb-4 tracking-tighter">Vocês na CA Beauty Clinic</h2>
            <div className="w-24 h-1 bg-rose-gold mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Ana Araújo", 
                text: "As meninas são ótimas! Atendimento incrível e de muita qualidade, fiz as unhas do meu casamento lá e fui super bem atendida!",
                img: "https://lh3.googleusercontent.com/a-/ALV-UjXKeRExock_NVhRQxgJK6GJWJg8IuZVrZvdJonoeKv4tV4AsTFl=w90-h90-p-rp-mo-br100"
              },
              { 
                name: "Letícia Mendes", 
                text: "O trabalho feito é impressionante. A atenção aos detalhes e a forma com que é realizada cada aplicação são incríveis. Realmente consegue realçar a beleza de cada cliente. Admiro muito o profissionalismo e dedicação.",
                img: "https://lh3.googleusercontent.com/a-/ALV-UjUQ365IHESGV0BInnZ_11PMACEZhHooadoX-NuUpJSFzua1ht0c3A=w90-h90-p-rp-mo-br100"
              },
              { 
                name: "Bruna Roberta", 
                text: "Trabalho impecável das meninas, cada dia mais encantada 💖\nAmbiente aconchegante, capuccino maravilhoso (sou viciada rs), excelentes profissionais.",
                img: "https://lh3.googleusercontent.com/a-/ALV-UjUQzxSET9o-dSeOxVXGXvf2T7ema05skyzZ223VA2nQAzV8IEez6w=w90-h90-p-rp-mo-br100"
              },
            ].map((testi, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-sm flex flex-col h-full"
              >
                <div className="flex gap-1 text-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <div className="flex-grow">
                  <p className="text-base md:text-lg font-light italic mb-8 leading-relaxed text-white/80">"{testi.text}"</p>
                </div>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                  <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center font-bold text-sm overflow-hidden border-2 border-white/20 shrink-0">
                    {testi.img ? (
                      <img src={testi.img} alt={testi.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      testi.name[0]
                    )}
                  </div>
                  <span className="font-display tracking-wider text-sm md:text-base">{testi.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="localizacao" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 flex flex-col md:flex-row gap-12 md:gap-16 items-center bg-light-gray/20">
            <div className="flex-1 w-full">
              <h2 className="text-3xl md:text-5xl font-sans font-black text-navy mb-6 md:mb-8 tracking-tighter">Onde nos encontrar</h2>
              <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                <div className="flex items-start gap-4">
                  <MapPin className="text-rose-gold mt-1" />
                  <div>
                    <p className="text-navy font-medium">Endereço</p>
                    <p className="text-navy/60">Avenida Guarapiranga, 92 - Parque Guarapiranga, São Paulo</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-rose-gold mt-1" />
                  <div>
                    <p className="text-navy font-medium">Horário de Atendimento</p>
                    <p className="text-navy/60">Segunda a Sábado: 09h às 19h</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="#catalogo"
                  className="bg-rose-gold text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-rose-gold/90 transition-all flex items-center justify-center gap-3 sm:col-span-2"
                >
                  Agendar Agora
                </a>
                <a 
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navy text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-navy/90 transition-all flex items-center justify-center gap-3"
                >
                  Google Maps <ChevronRight size={18} />
                </a>
                <a 
                  href={WAZE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#33CCFF] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#33CCFF]/90 transition-all flex items-center justify-center gap-3"
                >
                  Waze <ChevronRight size={18} />
                </a>
              </div>
            </div>
            <a 
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-700 relative group"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.343849184511!2d-46.73651642466649!3d-23.66913787872412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5353ffd3fbc9%3A0x6d71a620053ce62f!2sCA%20BEAUTY%20CLINIC!5e0!3m2!1spt-BR!2sbr!4v1710882000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0, pointerEvents: 'none' }} 
                allowFullScreen={true} 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-transparent z-10" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-20 text-white/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div className="text-center md:text-left">
              <a href="#home" className="inline-block mb-8 group">
                <img 
                  src={LOGO_URL} 
                  alt="CA Beauty Clinic Logo" 
                  className="h-20 md:h-24 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 rounded-2xl shadow-lg border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </a>
              <p className="text-sm leading-relaxed max-w-xs">
                Excelência em cílios, unhas e estética avançada. Transformando olhares e elevando a autoestima com técnica e paixão.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Navegação</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#home" className="hover:text-rose-gold transition-colors">Início</a></li>
                <li><a href="#servicos" className="hover:text-rose-gold transition-colors">Especialidades</a></li>
                <li><a href="#quem-somos" className="hover:text-rose-gold transition-colors">Quem Somos</a></li>
                <li><a href="#localizacao" className="hover:text-rose-gold transition-colors">Localização</a></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contato</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-gold/10 flex items-center justify-center">
                    <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-rose-gold transition-colors">
                    (11) 97971-5304
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-gold/10 flex items-center justify-center text-rose-gold">
                    <Instagram size={16} />
                  </div>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-rose-gold transition-colors">
                    @cabeautyclinic_
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-[10px] uppercase tracking-[0.2em]">
            <p>© 2026 <span className="text-white font-bold">CA Beauty Clinic</span>. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="#catalogo" 
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 bg-white p-2.5 md:p-3 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group border border-light-gray"
      >
        <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-8 h-8 md:w-12 md:h-12 object-contain" referrerPolicy="no-referrer" />
        <span className="hidden md:block absolute right-full mr-4 bg-white text-navy px-4 py-2 rounded-xl text-sm font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ver Catálogo e Agendar
        </span>
      </a>

      {/* Fixed Mobile Booking Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-[60] md:hidden bg-gradient-to-t from-white via-white to-transparent">
        <a 
          href="#catalogo"
          className="w-full bg-rose-gold text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 border border-rose-gold/20"
        >
          Agendar Minha Experiência
          <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
        </a>
      </div>
    </div>
  );
}
