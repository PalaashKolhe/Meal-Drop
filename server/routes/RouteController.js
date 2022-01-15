// Base Import
var mainRouter = require('express').Router();

const userRouter = require("./UserRoutes");

mainRouter.use('/user', userRouter);

module.exports = mainRouter;
