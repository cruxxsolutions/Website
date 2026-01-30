import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden bg-darker">
            {/* Background Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/60 to-transparent z-10"></div>
                {/* Placeholder for Video/Image */}
                <img
                    src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop"
                    alt="Drone Background"
                    className="w-full h-full object-cover opacity-50"
                />
            </div>

            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                   {/* <h2 className="text-primary font-medium tracking-widest uppercase mb-4">Future of Aerial Technology</h2> */}
                    <h1 className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight whitespace-nowrap">
                        Critical Thinking <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Reliable Engineering</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Providing advanced drone solutions for enterprise, industrial, and creative applications with unmatched reliability.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-sky-600 transition flex items-center justify-center group">
                            Get a Quote
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/services" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition">
                            Explore Services
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
