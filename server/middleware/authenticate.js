const User = require('../api/v1/models/user.model');
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

    const user = await User.findOne({
      firebaseId: firebaseUser.user_id,
    });

    if (!user) {
      // Unauthorized
      res.sendStatus(401);
    }

    req.user = user;

    next();
  } catch (err) {
    // Unauthorized
    res.sendStatus(401);
  }
}

module.exports = authenticate;
