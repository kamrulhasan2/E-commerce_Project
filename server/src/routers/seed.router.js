const seedController = require('../controller/seed.coltroller');
const seedRouter = require('express').Router();

seedRouter.get('/user',seedController);

module.exports = seedRouter;