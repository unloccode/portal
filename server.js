const express = require('express');
const app = express();

var bodyParser = require('body-parser');

global.__basedir = __dirname;

const db = require('./config/db.config.js');

const User = db.User;

let router = require('./router/router.js');

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

//create server
const server = app.listen(8080, function(){
    let host = server.address().address
    let port = server.address().port
    console.log("App listening at http://%s:%s", host, port);
});

//init some data
//write data to db
db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and Resync with { force: true }');
    User.sync().then(()=>{
        const users = [
            {
                username: 'alafsasa',
                email: 'alafsasa@gmail.com',
                password: 'password'
            }
        ]
        for(let i=0; i<users.length; i++){
            User.create(users[i]);
        }
    })
})