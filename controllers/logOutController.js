const User = require('../model/User');

const handleLogout = async (req, res) => {
  //on client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No Content
  const refreshToken = cookies.jwt;

  //Is refresh token in DB
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }
  //Delete the refreshToken in the Db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - only serve on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
