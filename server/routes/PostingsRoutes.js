const { createPosting } = require("../controllers/PostingsController");

const postingRouter = require("express").Router();

postingRouter.post("/create", createPosting);
// userRouter.post("/edit", updateUser);

module.exports = postingRouter;