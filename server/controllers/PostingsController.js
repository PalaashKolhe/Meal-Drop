// Mongo Imports
const mongoFoodPostings = require("../models/Postings");

const createPosting = async (req, res) => {
  var postingInfo = req.body;
  if (!postingInfo || !postingInfo.pickupTimeBegin || !postingInfo.pickupTimeEnd || !postingInfo.fromRestaurantAddress) {
    console.log("Error: Input body empty or all fields not entered");
    return res.status(400).send("Input body empty or all fields not entered");
  }

  postingInfo.fromRestaurantName = req.user.name;
  var newPosting = new mongoFoodPostings(postingInfo);

  await newPosting.save(function (err, document) {
    if (err) {
      console.log("Error: Mongo Create Posting Failed: ", err.message);
      res.status(400).send("Mongo Create Posting Failed");
    } else {
      console.log("Mongo Posting successfully created");
      res.status(200).send("Mongo Posting successfully created");
    }
  });
}

// will add later
const editPosting = async (req, res) => {

}

const getOnePost = async (req, res) => {
    const { _id } = req.body;
    var onePost = await mongoFoodPostings.findById(_id);
    res.status(200).json(onePost);
}

const deleteOnePost = async (req, res) => {
  const { _id } = req.body;
  await mongoFoodPostings.findByIdAndDelete(_id);
  res.sendStatus(204);
}

const getPostings = async (req, res) => {
  var allPostings = await mongoFoodPostings.find();
  return res.status(200).json(allPostings);
}

module.exports = { createPosting, getPostings, getOnePost, deleteOnePost };

