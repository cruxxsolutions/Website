import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import { Loader2 } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const API_BASE = import.meta.env.VITE_API_URL || '';
                const { data } = await axios.get(`${API_BASE}/api/services`);
                
                // Ensure data is an array - handle if API returns wrapped data
                const servicesArray = Array.isArray(data) ? data : (data?.services || []);
                
                if (servicesArray.length > 0) {
                    setServices(servicesArray);
                } else {
                    throw new Error('No services found');
                }
            } catch (error) {
                console.error("Error fetching services:", error);

                // Fallback data
                setServices([
                    { title: 'AgriTech', description: 'NDVI Sensing & Precision Agriculture', icon: 'Sprout', category: 'SMART AGRICULTURE' },
                    { title: 'Smart Infrastructure', description: 'Surveying & 3D Mapping', icon: 'Map', category: 'INFRASTRUCTURE' },
                    { title: 'Aerial Photography', description: 'Photogrammetry & Cinematography', icon: 'Camera', category: 'MEDIA' },
                    { title: 'Custom Solutions', description: 'Tailored UAV Systems for Your Requirements', icon: 'Rocket', category: 'ENGINEERING' },
                    { title: 'Cross-Domain Solutions', description: "Expertise Beyond Boundaries. Let's Talk", icon: 'Activity', category: 'INNOVATION' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <>
            <SEO 
              title="Aerial Services & Solutions - Cruxx Solutions"
              description="Explore Cruxx Solutions' comprehensive aerial services including 3D mapping, NDVI sensing, agricultural drones, aerial photography, and custom UAV systems."
              keywords="aerial services, 3D mapping, NDVI mapping, agricultural drones, aerial photography, UAV systems, drone solutions"
              url="https://cruxxsolutions.com/services"
            />

            <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                        Our Expertise
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Comprehensive aerial solutions tailored to your industry needs.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} service={service} />
                        ))}
                    </div>
                )}

            </div> 
        </>
    );
};

export default Services;