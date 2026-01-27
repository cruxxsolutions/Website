import React from 'react';

const About = () => {
    const teamMembers = [
        {
            name: 'Jagmeet Singh Wade',
            role: 'Co-Founder & CEO',
            branch: 'Final Year B.Tech Mechanical Engineering',
        },
        {
            name: 'Ryan Cruise Dsouza',
            role: 'Co-Founder & MD',
            branch: 'Final Year B.Tech Robotics & Automation Engineering',
        },
        {
            name: 'Ojas Akole',
            role: 'CTO',
            branch: 'Final Year B.Tech Robotics & Automation Engineering',
        },
        {
            name: 'Diven Idnani',
            role: 'UAV Systems Engineer',
            branch: 'Final Year B.Tech Computer Science Engineering',
        },
        {
            name: 'Durva Borhade',
            role: 'COO',
            branch: 'Final Year B.Tech Robotics & Automation Engineering',
        },
        {
            name: 'Vedant Bajaj',
            role: 'CDO',
            branch: 'Final Year B.Tech Robotics & Automation Engineering',
        },
        {
            name: 'Nikhil Redkar',
            role: 'Lead Software Engineer',
            branch: 'Final Year B.Tech Computer Science Engineering',
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
                    To design and deliver innovative, reliable, and safe engineering solutions that address the crux of real-world problems with precision and foresight.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                    Through operational excellence, sustainability, and accountability, we exist to serve our customers with care, integrity, and deep responsibility. We listen closely to their challenges, stand beside them in solving what truly matters, and deliver reliable and safe solutions they can trust. By focusing on real impact—not just technology—we help our customers build better outcomes for their communities, their environments, and the future they are working toward.
                </p>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Core Values
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                    Innovation
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                    Reliability
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                    Integrity
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                    Sustainability
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                    
                    Safety
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                    Foresight
                </p>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Our Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="bg-darker p-6 rounded-2xl text-center">
                            <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                            <p className="text-gray-400 mb-2">{member.role}</p>
                            <p className="text-gray-500 text-sm">{member.branch}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;





