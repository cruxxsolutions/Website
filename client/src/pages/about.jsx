import React from 'react';
import SEO from '../components/SEO';

const About = () => {
    const teamMembers = [
        { name: 'Jagmeet Singh Wade', role: 'Co-Founder & CEO', branch: '' },
        { name: 'Ryan Cruise Dsouza', role: 'Co-Founder & MD', branch: '' },
        { name: 'Ojas Akole', role: 'CTO', branch: '' },
        { name: 'Diven Idnani', role: 'UAV Systems Engineer', branch: '' },
        { name: 'Durva Borhade', role: 'COO', branch: '' },
        { name: 'Vedant Bajaj', role: 'CDO', branch: '' },
        { name: 'Nikhil Redkar', role: 'Software Engineer', branch: '' }
    ];

    return (
        <>
            <SEO 
              title="About Cruxx Solutions - Leaders in Aerial Technology"
              description="Learn about Cruxx Solutions, our vision for aerial innovation, and our expert team."
              keywords="about Cruxx Solutions, aerial technology company, drone innovation"
              url="https://cruxxsolutions.com/about"
            />

            <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        About Us
                    </h1>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        Vision
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-justify">
                        We envision ourselves as a leader in aerial services, recognized for tailored expertise
                        that earns deep trust across sectors.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-2">
                        Our Approach
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-3xl mx-auto text-justify">
                        To design and deliver innovative, reliable, and safe engineering solutions that address 
                        the <span className="text-primary">crux</span> of real-world problems with precision and foresight.
                    </p>

                    <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-justify">
                        Through operational excellence, sustainability, and accountability, we exist to serve our customers
                        with care, integrity, and responsibility.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-8">
                        Core Values
                    </h2>

                    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg py-8 px-6 mb-12">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                { icon: "💡", label: "Innovation" },
                                { icon: "⚙️", label: "Reliability" },
                                { icon: "🤝", label: "Integrity" },
                                { icon: "🌱", label: "Sustainability" },
                                { icon: "🛡️", label: "Safety" },
                                { icon: "🔮", label: "Foresight" },
                            ].map((value) => (
                                <div key={value.label} className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                                        <span className="text-3xl">{value.icon}</span>
                                    </div>
                                    <p className="text-white font-bold uppercase tracking-wide">
                                        {value.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                        Our Team
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="bg-darker p-6 rounded-2xl text-center"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-gray-400 mb-1">
                                    {member.role}
                                </p>
                                {member.branch && (
                                    <p className="text-gray-500 text-sm">
                                        {member.branch}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default About;