import React, { useState, useEffect } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

        const { name, email, message } = formData;

        if (!name || !email || !message) {
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        const form = e.target;
        const formDataToSubmit = new FormData(form);

        fetch(`https://formsubmit.co/${import.meta.env.VITE_CONTACT_EMAIL}`, {
            method: 'POST',
            body: formDataToSubmit,
        })
            .then(() => {
                setStatus('success');
                setFormData({ name: '', email: '', company: '', message: '' });
                setTimeout(() => setStatus(''), 3000);
            })
            .catch(() => {
                setStatus('error');
                setTimeout(() => setStatus(''), 3000);
            });
    };

    return (
        <>
            <SEO 
              title="Contact Cruxx Solutions - Get a Quote for Aerial Services"
              description="Contact Cruxx Solutions for aerial solutions, drone services, and UAV system inquiries."
              keywords="contact drone service, aerial solutions quote, UAV inquiry"
              url="https://cruxxsolutions.com/contact"
            />

            <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-6">
                            Get in Touch
                        </h1>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg">
                                        Email Us
                                    </h3>
                                    <p className="text-gray-400">
                                        {import.meta.env.VITE_CONTACT_EMAIL}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg">
                                        Call Us
                                    </h3>
                                    <p className="text-gray-400">
                                        +91 9028135933
                                    </p>
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

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Name"
                                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email"
                                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white"
                            />

                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Company"
                                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white"
                            />

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Message"
                                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-white"
                            />

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-primary hover:bg-sky-600 text-white font-bold py-4 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-70"
                            >
                                <span>
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </span>
                                {status !== 'sending' && <Send className="h-5 w-5" />}
                            </button>

                            {status === 'success' && (
                                <p className="text-green-500 text-center">
                                    Message sent successfully!
                                </p>
                            )}

                            {status === 'error' && (
                                <p className="text-red-500 text-center">
                                    Something went wrong. Please try again.
                                </p>
                            )}

                        </form>
                    </motion.div>

                </div>
            </div>
        </>
    );
};

export default Contact;