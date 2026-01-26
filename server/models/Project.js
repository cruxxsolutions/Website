const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    client: { type: String },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    completionDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
