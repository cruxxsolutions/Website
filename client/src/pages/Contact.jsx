import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        const { name, email, company, message } = formData;
        if (!name || !email || !message) {
            setStatus('error');
            return;
        }

        const subject = `Contact Form Submission from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\n${message}`;

        const mailto = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open user's mail client
        window.location.href = mailto;

        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    return (
        <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-400 mb-10">
                        Have a project in mind? Let's discuss how our aerial solutions can help you achieve your goals.
                    </p>

                    <div className="space-y-8">
                        
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Email Us</h3>
                                <p className="text-gray-400">contact@cruxx.com</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Call Us</h3>
                                <p className="text-gray-400">+91 9028135933</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-dark p-8 rounded-2xl border border-gray-800"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                placeholder="Company Ltd."
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-primary hover:bg-sky-600 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-70"
                        >
                            <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                            {!status && <Send className="h-5 w-5" />}
                        </button>

                        {status === 'success' && (
                            <p className="text-green-500 text-center">Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p className="text-red-500 text-center">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
