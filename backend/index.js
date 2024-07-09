const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const memeRoutes = require('./routes/memeRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === `Bearer ${process.env.AUTH_PASSWORD}`) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/api/authenticate', (req, res) => {
  const { password } = req.body;
  if (password === process.env.AUTH_PASSWORD) {
    res.json({ authenticated: true, token: process.env.AUTH_PASSWORD });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.use('/api', authenticate, memeRoutes);

// Changez le port ici si nécessaire
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
