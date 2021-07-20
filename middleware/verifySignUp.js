const db = require('../config/db.config.js');
const Roles = db.Roles;
const User = db.User;

checkDuplicateUsernameorEmail = (req, res, next) => {
    //username
    User.findOne({
        where: {username: req.body.username}
    }).then(user=>{
        if(user){
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        //email
        User.findOne({
            where: {email: req.body.email}
        }).then(user=>{
            if(user){
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i =0; i<req.body.roles.length; i++){
            if(!Roles.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameorEmail: checkDuplicateUsernameorEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;