import React from 'react';
import urbanplanning from '../assets/urban-planning.webp';
const Projects = () => {
    const projects = [
        {
            title: "Urban Mapping Initiative",
            client: "Metropolis City Council",
            description: "Comprehensive 3D mapping of the downtown district for urban planning and development.",
            image: urbanplanning
        },
        {
            title: "Pipeline Inspection",
            client: "Energy Corp",
            description: "150km autonomous pipeline inspection to detect leaks and structural integrity issues.",
            image: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=1974&auto=format&fit=crop"
        },
        {
            title: "Agricultural Yield Analysis",
            client: "Green Valley Farms",
            description: "Multispectral imaging to analyze crop health and optimize irrigation patterns.",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop"
        }
    ];

    return (
        <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Projects</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    See how our drone solutions are making an impact across various industries.
                </p>
            </div>

            <div className="flex flex-col gap-12">
                {projects.map((project, index) => (
                    <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-full md:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 text-left">
                            <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                            <h4 className="text-secondary font-medium mb-4 uppercase text-sm tracking-wider">{project.client}</h4>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                {project.description}
                            </p>
                            <button className="text-primary hover:text-white transition font-medium">View Case Study &rarr;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
