import React from 'react';

const About = () => {
    const teamMembers = [
        {
            name: 'Jagmeet Singh Wade',
            role: 'Co-Founder & CEO',
            branch: '',
        },
        {
            name: 'Ryan Cruise Dsouza',
            role: 'Co-Founder & MD',
            branch: '',
        },
        {
            name: 'Ojas Akole',
            role: 'CTO',
            branch: '',
        },
        {
            name: 'Diven Idnani',
            role: 'UAV Systems Engineer',
            branch: '',
        },
        {
            name: 'Durva Borhade',
            role: 'COO',
            branch: '',
        },
        {
            name: 'Vedant Bajaj',
            role: 'CDO',
            branch: '',
        },
        {
            name: 'Nikhil Redkar',
            role: 'Software Engineer',
            branch: '',
        }
    ];

    return (
        <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Us</h1>
                
                 <h2 className="text-2xl font-bold text-white mb-2">
                    Vision
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                    We envision ourselves as a leader in aerial services, recognized for tailored expertise
                    that earns deep trust across sectors.
                </p>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Our Approach
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                    <div>To design and deliver innovative, reliable, and safe engineering solutions that address the </div>
                    <div className="text-blue">crux</div>
                    <div>of real-world problems with precision and foresight.</div>
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                    Through operational excellence, sustainability, and accountability, we exist to serve our customers with care, integrity, and deep responsibility. We listen closely to their challenges, stand beside them in solving what truly matters, and deliver reliable and safe solutions they can trust. By focusing on real impact—not just technology—we help our customers build better outcomes for their communities, their environments, and the future they are working toward.
                </p>
                <h2 className="text-2xl font-bold text-white mb-8">
                    Core Values
                </h2>
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg py-12 px-6 mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                                <span className="text-3xl">💡</span>
                            </div>
                            <p className="text-white font-bold text-lg uppercase tracking-wide">Innovation</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                                <span className="text-3xl">⚙️</span>
                            </div>
                            <p className="text-white font-bold text-lg uppercase tracking-wide">Reliability</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <p className="text-white font-bold text-lg uppercase tracking-wide">Integrity</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                                <span className="text-3xl">🌱</span>
                            </div>
                            <p className="text-white font-bold text-lg uppercase tracking-wide">Sustainability</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <p className="text-white font-bold text-lg uppercase tracking-wide">Safety</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                                <span className="text-3xl">🔮</span>
                            </div>
                            <p className="text-white font-bold text-lg uppercase tracking-wide">Foresight</p>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Our Team
                </h2>
                <div className="flex flex-col items-center gap-8 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {teamMembers.slice(0, 6).map((member) => (
                            <div key={member.name} className="bg-darker p-6 rounded-2xl text-center">
                                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-gray-400 mb-2">{member.role}</p>
                                <p className="text-gray-500 text-sm">{member.branch}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="bg-darker p-6 rounded-2xl text-center md:w-1/3">
                            <h3 className="text-xl font-bold text-white mb-2">{teamMembers[6].name}</h3>
                            <p className="text-gray-400 mb-2">{teamMembers[6].role}</p>
                            <p className="text-gray-500 text-sm">{teamMembers[6].branch}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;





