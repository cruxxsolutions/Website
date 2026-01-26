import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import { Loader2 } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // In a real scenario, use env var for API URL
                const { data } = await axios.get('http://localhost:5000/api/services');
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
                // Fallback data if backend isn't ready/connected
                setServices([
                    { title: 'Aerial Photography', description: 'High-res imaging', icon: 'Camera', category: 'Media' },
                    { title: 'Mapping', description: '3D Mapping', icon: 'Map', category: 'Construction' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Expertise</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Comprehensive drone solutions tailored to your industry needs.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Services;
