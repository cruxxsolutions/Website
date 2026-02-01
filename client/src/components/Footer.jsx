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
                            Driven by innovation and guided by foresight, building reliable, safe, and sustainable aerial solutions you can trust; today and for the future.
                        </p>
                    </div>

                    

                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+91 9028135933</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>cruxxsolutions@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/invites/contact/?igsh=dtsun0ttss2c&utm_content=10vqxa0p" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition"><Twitter className="h-5 w-5" /></a>
                            <a href="https://www.linkedin.com/company/cruxx-solutions-private-limited/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition"><Linkedin className="h-5 w-5" /></a>
                            
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
