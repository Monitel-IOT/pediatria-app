const User = require('../api/v1/models/user.model');
const { getUserByEmail, updateUser, createNewUser } = require('../api/v1/services/user.service');
const firebaseAdmin = require('../config/firebase');

async function authenticate(req, res, next) {
  try {
    const firebaseToken = req.headers.authorization?.split(' ')[1];

    let firebaseUser;
    if (firebaseToken) {
      firebaseUser = await firebaseAdmin.auth.verifyIdToken(firebaseToken);
    }

    if (!firebaseUser) {
      // Unauthorized
      res.sendStatus(401);
    }

    // const usersCollection = req.app.locals.db.collection('user');

    // get user by firebase id
    let user = await User.findOne({
      firebaseId: firebaseUser.user_id,
    });

    if (!user) {
      // get user by email
      const userByEmail = await getUserByEmail(firebaseUser.email);

      if (!userByEmail) {
        // create new user
        user = await createNewUser({
          email: firebaseUser.email,
          firebaseId: firebaseUser.user_id,
        });
      }
      // update firebase id
      user = await updateUser(userByEmail.id, { firebaseId: firebaseUser.user_id });

      // Unauthorized
      // res.sendStatus(401);
    }

    req.user = user;

    next();
  } catch (err) {
    // Unauthorized
    res.sendStatus(401);
  }
}

module.exports = authenticate;
