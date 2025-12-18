const express = require('express');
const router = express.Router();
const utilisateurController = require('../controller/utilisateurController');

router.post('/connexion', utilisateurController.Login);
router.post('/inscription', utilisateurController.Register);

module.exports = router;