const db = require('../config/db.config.js');
const User = db.User;

//create user
exports.createUser = (req, res) => {
    let user = {};
    try{
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        //save to MySQL db
        User.create(user, {
            attributes: [
                'id',
                'username',
                'email',
                'password'
            ]
        }).then(result=>{
            res.status(200).json(result);
        });
    }catch(error){
        res.status(500).json({
            message: "Fail",
            error: error.message
        });
    }
}