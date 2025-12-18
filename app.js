const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const cors = require('cors');

// Importer les routes
const animalRoutes = require('./route/animalRoute');
const utilisateurRoutes = require('./route/utilisateurRoute');
const vaccinRoutes = require('./route/vaccinRoute');

// Middleware
app.use(cors());   
app.use(helmet());
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'Bienvenue sur l\'API des animaux' 
    });
});
app.use('/api/animaux', animalRoutes);
app.use('/api/auth', utilisateurRoutes);
app.use('/api/vaccins', vaccinRoutes);

// Gestion erreurs globale
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur serveur' });
});


app.listen(port, () => {
    console.log(`voir sur http://localhost:${port}`);
});