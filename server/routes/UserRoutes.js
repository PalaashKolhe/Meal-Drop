const { registerUser } = require("../controllers/UserController");

const userRouter = require("express").Router();

userRouter.post("/createUser", registerUser);

module.exports = userRouter;