const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    env.database,
    env.username,
    env.password,
    {
        host: env.host,
        dialect: env.dialect,
        operatorAliases: false,
        pool: {
            max: env.pool.max,
            min: env.pool.min,
            acquire: env.pool.acquire,
            idle: env.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//require model
db.User = require('../models/user.models.js')(sequelize, Sequelize);
db.Role = require('../models/role.model.js')(sequelize, Sequelize);

//table relationship
db.Role.belongsToMany(db.User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.User.belongsToMany(db.Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

//relationship between Users and Roles is Many-to-Many
// - One use can have several roles
// - One role can be taken on by many users
//belongsToMany indicate a user can belong to many Roles and vice versa
