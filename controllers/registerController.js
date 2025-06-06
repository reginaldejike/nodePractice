const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: `Username and password are required.` });

  //check for duplicate username in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //Create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(result);
    res.status(201).json({ Success: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ Message: err.message });
  }
};

module.exports = {
  handleNewUser,
};
