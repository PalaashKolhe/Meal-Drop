const { verify } = require("../controllers/authHelper");
const { createPosting, getPostings } = require("../controllers/PostingsController");

const postingRouter = require("express").Router();

postingRouter.post("/create", verify, createPosting);
postingRouter.get("/all", getPostings);

// userRouter.post("/edit", updateUser);

module.exports = postingRouter;