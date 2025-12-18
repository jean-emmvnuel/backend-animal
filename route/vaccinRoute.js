const express = require('express');
const router = express.Router();
const vaccinController = require('../controller/vaccinController');

// Routes pour les vaccins
router.post('/', vaccinController.addVaccin);
router.get('/', vaccinController.getAllVaccins);
router.get('/:espece', vaccinController.getVaccinByEspece);

module.exports = router;