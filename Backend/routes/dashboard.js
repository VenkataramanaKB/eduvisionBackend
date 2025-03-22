const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');

async function getRepoInfo(username) {
    try {
        const url = `https://api.github.com/users/${username}/repos`;
        const response = await axios.get(url);
        const repos = response.data;

        const numRepos = repos.length;
        const languages = new Set(repos.map(repo => repo.language).filter(lang => lang));

        return {
            username: username,
            total_repos: numRepos,
            languages_used: Array.from(languages)
        };
    } catch (error) {
        return { error: 'Failed to fetch GitHub repo info' };
    }
}

router.get('/dashboard', async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }
        
        const user = await User.findById(userId).populate('projects');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        let leetcodeStats = {};
        if (user.leetcode) {
            try {
                const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${user.leetcode}`);
                leetcodeStats = response.data;
            } catch (error) {
                leetcodeStats = { error: 'Failed to fetch LeetCode stats' };
            }
        }
        
        let githubStats = {};
        if (user.github) {
            githubStats = await getRepoInfo(user.github);
        }
        
        res.status(200).json({ user, leetcodeStats, githubStats });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
