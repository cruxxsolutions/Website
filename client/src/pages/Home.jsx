import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import droneImage from '../assets/Drone-Training-Spray-Drone-1200x600.jpg';

const Home = () => {
    return (
        <>
            <Hero />

            {/* About Section Preview */}
            <section className="py-20 bg-darker">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Redefining Aerial Intelligence</h2>
                            <p className="text-gray-400 mb-6 text-lg">
                                At Cruxx Solutions, we leverage cutting-edge drone technology to provide actionable insights and automated solutions across industries. From construction to agriculture, our fleet is ready to deploy.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {['Advanced Thermal Imaging', 'LiDAR Mapping Precision', 'Autonomous Patrol Fleets'].map((item, index) => (
                                    <li key={index} className="flex items-center text-gray-300">
                                        <CheckCircle2 className="h-5 w-5 text-secondary mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/about" className="text-primary font-semibold hover:text-sky-400 transition">Learn More About Us &rarr;</Link>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-2xl"></div>
                            <img
                                src={droneImage}
                                alt="Drone in action"
                                className="relative rounded-2xl shadow-2xl border border-gray-800"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary/10 border-y border-primary/20">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to elevate your operations?</h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Contact us today to discuss how our drone solutions can save you time, money, and reduce risk.
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
