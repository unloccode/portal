let express = require('express');
let router = express.Router();

//require controllers
const users = require('../controller/controller.js');

router.post('/api/user', users.createUser);

module.exports = router;