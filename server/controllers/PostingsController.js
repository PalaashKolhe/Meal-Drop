// Mongo Imports
const mongoFoodPostings = require("../models/Postings");

const createPosting = async (req, res) => {
  var postingInfo = req.body;
  if (!postingInfo || !postingInfo.pickupTimeBegin || !postingInfo.pickupTimeEnd || !postingInfo.fromRestaurantAddress) {
    console.log("Error: Input body empty or all fields not entered");
    return res.status(400).send("Input body empty or all fields not entered");
  }

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

const getPostings = async (req, res) => {
  var allPostings = await mongoFoodPostings.find();
  return res.status(200).json(allPostings);
}

module.exports = { createPosting, getPostings };

