const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const validate = require('../validators/auth.validator');

router.post('/register', validate.register, register);
router.post('/login', validate.login, login);

const User = require('../models/user.model');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/users', authMiddleware, async (req, res, next) => {
    try {
      // Only admin can access user list
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      const users = await User.find({}, 'username email role'); // only fetch selected fields
      res.json(users);
    } catch (err) {
      next(err);
    }
  });
  const { ROLES } = require('../config/constants');

  router.get('/roles', authMiddleware, (req, res) => {
    res.json({ roles: Object.values(ROLES) });
  });
  


module.exports = router;