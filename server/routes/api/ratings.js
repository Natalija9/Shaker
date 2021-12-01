const express = require('express');
const ratingsController = require('../../contollers/ratings');

const router = express.Router();

router.get('/', ratingsController.listAllRatings);
router.get('/:id', ratingsController.getRating);

router.post('/', ratingsController.addNewRating);

module.exports = router;
