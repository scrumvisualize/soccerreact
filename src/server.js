const express = require('express');
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const userSchema = require('./server/models/user');
const cors = require("cors");

const port = 8000;
const DB_NAME = 'soccerreact';
const DB_PORT = 3306;
const DB_USERNAME = 'admin';
const DB_PASSWORD = 'C@rnagieMe11on';
const DB_HOST = 'localhost';
const DB_DIALECT = 'mysql';
const DB_POOL = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};

const app = express();

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: DB_POOL,
  port: DB_PORT
});

const UserModel = userSchema(sequelize, DataTypes);


app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This get method is for displaying all registered players in Home screen.It should display all player registered as 
// ADMIN or PLAYER privileges.

app.get('/service/players', async (req, res) => {
  try {
    const players = await UserModel.findAll({ 
      where: {
        privilege: ['ADMIN', 'PLAYER']
      }
    });
    res.status(200).json({ players });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

});

// This method is used to register a player via Register screen. Please look for Register.js
// After registration the screen doesn't reset and need to display a Registration successfull message.

app.put('/service/player', async (req, res, next) => {
  try {
    const addPlayer = await UserModel.create(req.body);
    console.log("Server side log Put working:" + addPlayer);
    return res.json({ addPlayer });
  } catch (err) {
    return next(err);
  }
});


app.delete('/service/player', (req, res) => {
  console.log('service/player');
  res.json({ express: "delete player" })
});

// Function to retrieve the login user's email from localStorage:
function getlocalStorageValue(){
  for (var i = 0; i < localStorage.length; i++) {
    var key   = localStorage.key(i);
    var value = localStorage.getItem(key);
    return value;
   }
}

// This get method is for displaying player data in the Profile screen, now it just displaying data based on hard coded email.
// Need to display the login player data. Please refer axios call from Profile.js 

app.get('/service/profile', async (req, res) => {
  try {
    //const email = getlocalStorageValue();
    const playerProfile = await UserModel.findAll({ where: { email: "ron@cool.com" } });
    res.status(200).json({ playerProfile });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


app.post('/service/profile', (req, res) => {
  console.log('service/profile');
  res.json({ express: "player profile" })
});

// This post method is used to login a player via login screen.Now it will display a message if the login is successfull
// Need to navigate from Login on successfull login.

app.post('/service/login', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const loginData = await UserModel.findAll({ where: { email: userEmail } });
    const password = loginData[0].password;
    const email = loginData[0].email;
    if (password === userPassword && email === userEmail) {
      const privilege = loginData[0].privilege;
      res.status(200).json({ success: true, privilege, email });
    } else {
      res.status(403).json({ fail: "Login Failed !" });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


//Added to test and see client/server interaction from Aboutus screen, ignore this at the moment.
app.post('/service/news', (req, res) => {
  console.log(req.body.newstitle);
  res.json({ express: "news" })
});


(async () => {
  try {
    const sequelizeStatus = await sequelize.sync();
    console.log("your server is up and running");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (e) {
    console.log(e, 'Database issue.');
  }
})();
