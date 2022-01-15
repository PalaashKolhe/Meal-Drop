const { registerUser, updateUser } = require("../controllers/UserController");

const userRouter = require("express").Router();

userRouter.post("/createUser", registerUser);
userRouter.post("/updateUser", updateUser);

module.exports = userRouter;