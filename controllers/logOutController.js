const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  //on client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No Content
  const refreshToken = cookies.jwt;

  //Is refresh token in DB
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }
  //Delete the refreshToken in the Db
  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: '' };
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(userDB.users)
  );
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - only serve on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
