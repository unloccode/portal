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

module.exports = db;