const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cruxx_db');

const importData = async () => {
    try {
        await Service.deleteMany();
        await User.deleteMany();

        const services = [
            {
                title: 'Aerial Photography',
                description: 'High-resolution 4K aerial imaging for real estate, events, and marketing.',
                icon: 'Camera',
                category: 'Media',
            },
            {
                title: 'Industrial Inspection',
                description: 'Safe and efficient inspection of towers, pipelines, and bridges using drones.',
                icon: 'Activity',
                category: 'Industrial',
            },
            {
                title: 'Agricultural Monitoring',
                description: 'Crop health analysis and field monitoring to optimize yield.',
                icon: 'Sprout',
                category: 'Agriculture',
            },
            {
                title: 'Mapping & Surveying',
                description: 'Precise 3D mapping and topographic surveys for construction and land management.',
                icon: 'Map',
                category: 'Construction',
            },
            {
                title: 'Security & Surveillance',
                description: '24/7 aerial surveillance for perimeter security and crowd control.',
                icon: 'Shield',
                category: 'Security',
            },
        ];

        await Service.insertMany(services);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
