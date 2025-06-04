"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Verificar qual página está ativa com base no pathname
  const isHomePage = pathname === `/${locale}` || pathname === '/';
  const isAboutPage = pathname.includes('/about');
  const isGamePage = pathname.includes('/game');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile quando mudar de página
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Função para trocar o idioma mantendo o usuário na mesma página
  const switchLanguage = (newLocale: string) => {
    // Extrai o caminho sem o prefixo de locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // Redireciona para o mesmo caminho com o novo locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  // Estilos para os links do menu
  const defaultLinkStyle = "text-gray-700 hover:text-green-600 transition px-3 py-2 rounded-lg hover:bg-green-50";
  const activeLinkStyle = "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm";
  
  // Estilos para os links mobile
  const mobileLinkStyle = "w-full text-left px-4 py-5 text-gray-800 text-lg";
  const mobileActiveLinkStyle = "w-full text-left px-4 py-5 bg-green-50 text-green-700 font-medium text-lg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header with higher z-index to ensure it stays on top */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white'
      }`}>
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link 
            href={`/${locale}`} 
            className="text-xl font-bold text-green-600 hover:text-green-700 transition flex items-center gap-2"
          >
            <span className="text-2xl"></span>
            {t("app.title")}
          </Link>
          
          <div className="flex items-center gap-6">
            {/* Desktop Navigation - hidden on mobile */}
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    href={`/${locale}`}
                    className={isHomePage ? activeLinkStyle : defaultLinkStyle}
                  >
                    {t("navigation.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/about`}
                    className={isAboutPage ? activeLinkStyle : defaultLinkStyle}
                  >
                    {locale === "pt" ? "Sobre" : "About"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/game`}
                    className={isGamePage ? activeLinkStyle : defaultLinkStyle}
                  >
                    {locale === "pt" ? "Jogos" : "Games"}
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Language Switcher */}
            <div className="bg-white shadow-sm rounded-lg flex overflow-hidden border border-gray-200">
              <button
                onClick={() => switchLanguage('pt')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  locale === 'pt' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  locale === 'en' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
            </div>
            
            {/* Mobile Menu Button - only visible on mobile */}
            <button 
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md hover:bg-green-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : 'mb-1.5'}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'mb-1.5'}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] right-0 h-screen w-3/4 max-w-xs z-40 bg-white shadow-lg border-l border-green-100"
          >
            <nav className="py-4">
              <ul className="flex flex-col space-y-3">
                <li className="border-b border-green-100">
                  <Link
                    href={`/${locale}`}
                    className={isHomePage ? mobileActiveLinkStyle : mobileLinkStyle}
                  >
                    {t("navigation.home")}
                  </Link>
                </li>
                <li className="border-b border-green-100">
                  <Link
                    href={`/${locale}/about`}
                    className={isAboutPage ? mobileActiveLinkStyle : mobileLinkStyle}
                  >
                    {locale === "pt" ? "Sobre" : "About"}
                  </Link>
                </li>
                <li className="border-b border-green-100">
                  <Link
                    href={`/${locale}/game`}
                    className={isGamePage ? mobileActiveLinkStyle : mobileLinkStyle}
                  >
                    {locale === "pt" ? "Jogos" : "Games"}
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content with appropriate z-index to stay below header */}
      <main className="container mx-auto py-10 px-4 flex-grow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-white border-t border-green-100 mt-auto relative z-10">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌱</span>
              <span className="text-green-600 font-bold">{t("app.title")}</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm">
                {t("footer.copyright", { year: 2025 })}
              </p>
              <div className="mt-2 flex gap-3 justify-center md:justify-end">
                <span className="text-gray-400 hover:text-green-600 cursor-pointer transition">📱</span>
                <span className="text-gray-400 hover:text-green-600 cursor-pointer transition">📧</span>
                <span className="text-gray-400 hover:text-green-600 cursor-pointer transition">🌐</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}