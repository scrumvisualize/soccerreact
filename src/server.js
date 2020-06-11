const express = require('express');
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const userSchema = require('./server/models/user');
const newsSchema = require('./server/models/news');
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
const NewsModel = newsSchema(sequelize, DataTypes);

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This get method is for displaying all players in Home screen. It should display all registered players,
// irrespective of privileges.

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

// This method is used to Register a player via Register screen. Please look for Register.js
// After successfull registration, system will navigate to Login screen.

app.put('/service/player', async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const playerEmail = await UserModel.count({ where: { email: userEmail } });
    if (playerEmail == 0) {
      //If there is no email found, procced with normal registration here...
      const addPlayer = await UserModel.create(req.body);
      console.log("Server side PUT method log:" + addPlayer);
      res.status(200).json({ success: true });
    } else {
      return res.status(409).json({ message: "Email address already exists !" });
    }
  } catch (err) {
    return next(err);
  }
});

// This method is used to delete a player from Home screen by a player with ADMIN privilege:
// On click on Delete icon, a confirmation messge will be displayed and further on press on Yes will delete the player.

app.delete('/service/player', async (req, res) => {
  try {
    const userId = req.body.id;
    console.log("Req" + userId);
    const deletePlayer = await UserModel.destroy({
      where: { id: userId }
    })
    res.status(200).json({ deletePlayer });
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


// Function to retrieve the login user's email from localStorage:
function getlocalStorageValue() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    return value;
  }
}

// This get method is for displaying player data in the Profile screen.
// Profile should display the login player data. Please refer axios call from Profile.js 

app.get('/service/profile', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const playerProfile = await UserModel.findAll({ where: { email: userEmail } });
    res.status(200).json({ playerProfile });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


app.post('/service/profile', (req, res) => {
  console.log('service/profile');
  res.json({ express: "player profile" })
});


// This is a PUT method, used to perform update player Profile. Since email field is unique and field is kept as non editable. 
// All values except id, email and privilege should allow to update.

app.put('/service/profile', async (req, res, next) => {

  try {
    const userEmail = req.query.email;
    var selector = {
      where: { email: userEmail }
    };
    //Now below cleanData will remove all null/blank values coming in req.body and update field values with data.
    const updateData = req.body;
    function cleanData(obj) {
      for (var propName in obj) {
        if (obj[propName] == '' || obj[propName] == undefined || obj[propName] == null) {
          delete obj[propName];
        }
      }
    }
    cleanData(updateData);
    const updatePlayer = await UserModel.update(updateData, selector);
    console.log("Server side update method log:" + updatePlayer);
    res.status(200).json({ success: true });
  } catch (err) {
    return next(err);
  }

});


// This post method is used to login a player via login screen.
// After successfull login it will display Home screen with Players.

app.post('/service/login', async (req, res) => {
  try {

    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const loginData = await UserModel.findAll({ where: { email: userEmail } });
    if (loginData == null || loginData == '') {
      console.log("NULL null:" + loginData);
      res.status(403).json({ fail: "Email id doesn't exist !" });
    }
    const password = loginData[0].password;
    const email = loginData[0].email;
    if (password === userPassword && email === userEmail) {
      const privilege = loginData[0].privilege;
      res.status(200).json({ success: true, privilege, email });
    } else {
      res.status(403).json({ fail: "Incorrect password entered !" });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


//This is to insert News details created from Aboutus page by an Admin user:

app.post('/service/news', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const newDetails = await NewsModel.create({...req.body, email:userEmail});   
    console.log("Server side news post method log:" + newDetails);
    res.status(200).json({ success: true });
  } catch (e){
    res.status(500).json({ message: e.message });
  }
});

//This is to get News details from news table and to display in Aboutus page:
app.get('/service/news', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const newsdetails = await NewsModel.findAll({
       order: [
        [sequelize.literal('createdAt'), 'desc']
        ]
      });
    console.log("Server side news post method log:" + newsdetails);
    res.status(200).json({ newsdetails });
  } catch (e){
    res.status(500).json({ message: e.message });
  }
});

//This is to delete News details from news table from Aboutus page by ADMIN user:

app.delete('/service/news', async (req, res) => {
  try {
    const userId = req.body.id;
    console.log("Req" + userId);
    const deleteNews = await NewsModel.destroy({
      where: { id: userId }
    })
    res.status(200).json({ deleteNews });
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
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
