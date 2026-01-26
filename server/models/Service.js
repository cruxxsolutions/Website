const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // Name of the icon (e.g., from Lucide)
    category: { type: String, required: true }, // e.g., 'Aerial', 'Industrial', 'Agri'
    imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
