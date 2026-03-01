import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import mobileHero from '../assets/hero (1).png';
import desktopHero from '../assets/hero.png';

const Hero = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="relative min-h-screen sm:h-screen flex items-center justify-center overflow-hidden bg-darker pt-16 sm:pt-0">
            {/* Background Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/60 to-transparent z-10"></div>
                {/* Responsive Background Image */}
                <img
                    src={isMobile ? mobileHero : desktopHero}
                    alt="Drone Background"
                    className="w-full h-full object-cover opacity-50"
                    loading="lazy"
                />
            </div>

            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                   {/* <h2 className="text-primary font-medium tracking-widest uppercase mb-4">Future of Aerial Technology</h2> */}
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Critical Thinking <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Reliable Engineering</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
                        Providing advanced aerial solutions for enterprise, industrial, and creative applications with unmatched reliability.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
                        <Link to="/contact" className="px-5 sm:px-8 py-2.5 sm:py-4 bg-primary text-white font-bold text-sm sm:text-base rounded-full hover:bg-sky-600 transition flex items-center justify-center group w-full sm:w-auto">
                            Get a Quote
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/services" className="px-5 sm:px-8 py-2.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm sm:text-base rounded-full hover:bg-white/20 transition w-full sm:w-auto">
                            Explore Services
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
