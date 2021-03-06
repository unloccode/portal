const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());
//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//simple route
app.get("/", (req, res)=>{
    res.json({message: "Luemens"});
});

//routes
require('./router/auth.routes')(app);
require('./router/user.routes')(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});

//body-parser helps to parse the request and create the req.body object

//init some data
const db = require("./config/db.config");
const Role = db.Role;

db.sequelize.sync({force: true}).then(()=>{
    console.log('Drop and Resync Database');
    inits();
});

function inits(){
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "moderator"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}