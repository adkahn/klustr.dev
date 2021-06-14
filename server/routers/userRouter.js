const express = require('express');
const router = express.Router();

// Add middleware here
const userController = require ('../controllers/userController');

router.post('/create',
  // userController.bcryptEmail,
  userController.bcryptPassword,
  userController.addNewUser,
  (req, res) => {
    res.status(200).send('Successfully added new user');
})

router.post('/login',
  // userController.bcryptEmail,
  userController.loginCheck,
  (req, res) => {
    res.status(200).send('Successfully signed in')
  }
)

router.post('/verify',
  userController.verifyAdmin,
  (req, res) => {
    const { isAdmin } = res.locals;
    res.status(200).json(isAdmin);
  }
)

module.exports = router;