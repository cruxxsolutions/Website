const express = require('express');
const cors = require('cors');

// Default services data (fallback)
const defaultServices = [
    { 
        title: 'AgriTech', 
        description: 'NDVI Sensing & Precision Agriculture', 
        icon: 'Sprout', 
        category: 'SMART AGRICULTURE' 
    },
    { 
        title: 'Smart Infrastructure', 
        description: 'Surveying & 3D Mapping', 
        icon: 'Map', 
        category: 'INFRASTRUCTURE' 
    },
    { 
        title: 'Aerial Photography', 
        description: 'Photogrammetry & Cinematography', 
        icon: 'Camera', 
        category: 'MEDIA' 
    },
    { 
        title: 'Custom Solutions', 
        description: 'Tailored UAV Systems for Your Requirements', 
        icon: 'Rocket', 
        category: 'ENGINEERING' 
    },
    { 
        title: 'Cross-Domain Solutions', 
        description: 'Expertise Beyond Boundaries. Let\'s Talk', 
        icon: 'Activity', 
        category: 'INNOVATION' 
    }
];

// Get all services
const getServices = async (req, res) => {
    try {
        // Return default services (can be extended to use a database later)
        res.json(defaultServices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export as serverless function
module.exports = async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    await getServices(req, res);
};
