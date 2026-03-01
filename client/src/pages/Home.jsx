import React from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import droneImage from '../assets/Drone-Training-Spray-Drone-1200x600.jpg';

const Home = () => {
    return (
        <>
            <SEO 
              title="Cruxx Solutions - Advanced Aerial Solutions & Drone Services"
              description="Cruxx Solutions provides cutting-edge aerial technology services including 3D mapping, NDVI sensing, agricultural drones, and aerial photography for enterprise and industrial applications."
              keywords="drone services, aerial solutions, UAV systems, 3D mapping, NDVI mapping, agricultural drones, aerial technology"
              url="https://cruxxsolutions.com"
            />
            <Hero />

            {/* About Section Preview */}
            <section className="py-20 bg-darker">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Redefining Aerial Solutions</h2>
                            <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg">
                                At Cruxx Solutions, we leverage cutting-edge aerial technology to provide actionable insights and automated solutions across industries. If you have a problem, we’ll offer a solution.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {['3D Mapping', 'NDVI Mapping', 'Agricultural Drones'].map((item, index) => (
                                    <li key={index} className="flex items-center text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-secondary mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/about" className="text-primary font-semibold hover:text-sky-400 transition">Learn More About Us &rarr;</Link>
                        </div>
                        <div className="relative w-full h-auto">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-2xl"></div>
                            <img
                                src={droneImage}
                                alt="Drone in action providing aerial solutions"
                                loading="lazy"
                                width="600"
                                height="300"
                                className="relative rounded-2xl shadow-2xl border border-gray-800 w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-20 bg-primary/10 border-y border-primary/20">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to elevate your operations?</h2>
                    <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">
                        Contact us today to discuss how our aerial solutions can save you time, money, and reduce risk.
                    </p>
                    <Link to="/contact" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-sky-600 transition inline-block">
                        Start a Project
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;
