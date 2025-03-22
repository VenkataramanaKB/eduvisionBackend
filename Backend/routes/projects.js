const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { generateProjects } = require('../utils/gemini');

// Generate project recommendations
router.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        
        const projects = await generateProjects(prompt);
        res.json(projects);
    } catch (error) {
        console.error('Route Error:', error);
        res.status(500).json({ 
            error: 'Error generating projects',
            details: error.message 
        });
    }
});

// Save a project
router.post('/save', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error saving project' });
    }
});

// Get all saved projects
router.get('/saved', async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching saved projects' });
    }
});

// Get roadmaps (title and roadmap only)
router.get('/roadmap', async (req, res) => {
    try {
        const projects = await Project.find()
            .select('title roadmap')
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching project roadmaps' });
    }
});

module.exports = router; 