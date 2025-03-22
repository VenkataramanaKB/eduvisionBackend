const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateProjects = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const systemPrompt = `Generate 5 programming projects based on the following prompt: "${prompt}".
        For each project, provide:
        1. Title
        2. Description
        3. Tech Stack (as array)
        4. Difficulty Level (Beginner/Intermediate/Advanced)
        5. Roadmap (5 steps with difficulty level for each step)
        
        Return the response in this exact JSON format:
        [
          {
            "title": "Project Name",
            "description": "Project Description",
            "techStack": ["Tech1", "Tech2"],
            "difficultyLevel": "Beginner",
            "roadmap": [
              {"step": "Step 1", "difficulty": "Beginner"},
              {"step": "Step 2", "difficulty": "Beginner"},
              {"step": "Step 3", "difficulty": "Intermediate"},
              {"step": "Step 4", "difficulty": "Intermediate"},
              {"step": "Step 5", "difficulty": "Advanced"}
            ]
          }
        ]`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();
         
        
        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Raw text that failed to parse:', text);
            throw new Error('Failed to parse Gemini response as JSON');
        }
    } catch (error) {
        
        throw error;
    }
};

module.exports = { generateProjects }; 