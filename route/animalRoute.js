const express = require('express');
const router = express.Router();
const animalController = require('../controller/animalController');
const auth = require("../middleware/authMiddleware")

router.get('/', auth, animalController.getAllAnimals);
router.post('/', auth, animalController.addAnimal);
router.put('/:id', auth, animalController.updateAnimalById);
router.delete('/:id', auth, animalController.deleteAnimalById);
router.get("/user",auth, animalController.getAnimalsByUserId)

module.exports = router;