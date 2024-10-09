const express = require('express');
const connectDatabase = require('./config/databaseConfig');
const userAuthRoutes = require('./routes/userAuthRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDatabase();

app.use(express.json());
app.use('/api/auth', userAuthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

