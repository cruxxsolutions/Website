import React from 'react';
import { Camera, Activity, Sprout, Map, Shield, Rocket } from 'lucide-react';

const iconMap = {
    'Camera': Camera,
    'Activity': Activity,
    'Sprout': Sprout,
    'Map': Map,
    'Shield': Shield,
    'default': Rocket
};

const ServiceCard = ({ service }) => {
    const Icon = iconMap[service.icon] || iconMap['default'];

    return (
        <div className="bg-dark p-8 rounded-2xl border border-gray-800 hover:border-primary/50 transition duration-300 group">
            <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition">
                <Icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
                {service.description}
            </p>
            <span className="text-sm text-secondary font-medium tracking-wide uppercase">{service.category}</span>
        </div>
    );
};

export default ServiceCard;
