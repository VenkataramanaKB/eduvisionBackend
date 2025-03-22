const express = require('express');
const router = express.Router();
const Community = require('../models/Community.js');
const Project = require('../models/Project.js');

router.post('/create-community', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const community = new Community({ name, description });
        await community.save();
        res.status(201).json({ success: true, community });
    } catch (error) {
        res.status(500).json({ details: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { communityId, projectId } = req.body;
        
        if (!communityId || !projectId) {
            return res.status(400).json({ error: 'Community ID and Project ID are required' });
        }

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ error: 'Community not found' });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (!community.projects.includes(projectId)) {
            community.projects.push(projectId);
            await community.save();
        }

        res.status(200).json({ success: true, message: 'Project added to community successfully', community });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
