import React from 'react';
import { Rocket, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-darker border-t border-gray-800 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Rocket className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold text-white">CRUXX</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Pioneering the future of aerial solutions with precision, innovation, and reliability.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary transition">Aerial Photography</a></li>
                            <li><a href="#" className="hover:text-primary transition">Mapping & Surveying</a></li>
                            <li><a href="#" className="hover:text-primary transition">Industrial Inspection</a></li>
                            <li><a href="#" className="hover:text-primary transition">Security & Surveillance</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>123 Drone Valley, Tech City</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+91 9028135933</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>contact@cruxx.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition"><Linkedin className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition"><Facebook className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Cruxx Solutions. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
