const express = require('express');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projects');
const communityRoutes = require('./routes/community');
const dashboardRoutes = require('./routes/dashboard');
const cors = require('cors');
require('dotenv').config();

const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.use('/api/projects', projectRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 