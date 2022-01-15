const mongoUsers = require("../models/Users");

const registerUser = async (req, res) => {
  var userInfo = req.body;
  if (!userInfo || !userInfo.name || !userInfo.email || !userInfo.password) {
    console.log("Error: Input body empty or all fields not entered");
    return res.status(400).send("Input body empty or all fields not entered");
  }
  if (userInfo.name.length == 0 || userInfo.email.length == 0 || userInfo.password.length == 0) {
    console.log("Error: Required fields not entered for user creation");
    return res.status(400).send("Required fields not entered");
  }

  var newUser = new mongoUsers(userInfo);

  await newUser.save(function (err, document) {
    if (err) {
      console.log("Error: Mongo Create User Failed: ", err.message);
      res.status(400).send("Mongo Create User Failed");
    } else {
      console.log("Mongo User successfully created");
      res.status(200).send("Mongo User successfully created");
    }
  });
}

const updateUser = async (req, res) => {
  var userInfo = req.body;
  if (!userInfo) {
    console.log("Error: Empty update user request");
    return res.status(400).send("Empty update user request");
  }

  var newUser = new mongoUsers(userInfo);

  await newUser.updateOne({})
}

module.exports.registerUser = registerUser;
