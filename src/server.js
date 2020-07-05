const express = require('express');
const bodyParser = require("body-parser");
var multer  = require('multer')
var path = require('path');
const moment = require('moment');
const { Sequelize, DataTypes } = require("sequelize");
const userSchema = require('./server/models/user');
const newsSchema = require('./server/models/news');
const availabilitySchema = require('./server/models/availability');
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
const Availability = availabilitySchema(sequelize, DataTypes);

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The below define the folder location and storage of file using multer. File will be saved
// with field name, date stamp and extension and then upload variable will have the below information.

app.use(express.static(path.join(__dirname, 'public')));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  }
})

var upload = multer({ storage: storage });

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

app.put('/service/player',  upload.single('photo'), async (req, res, next) => {
  try {
    const regToken = req.body.token;
    const userName = req.body.name;
    const userEmail = req.body.email; //exisiting code
    const userPhone = req.body.phonenumber;
    const userPassword = req.body.password;
    const userPrivilege = req.body.privilege;
    const userPrivilegeUppercase = userPrivilege.toUpperCase();
    const userPosition = req.body.position;
    console.log(req.file);
    const validToken = "SSSL@DSCLMV@LE2020#";
    if( regToken == validToken ) {
    const playerEmail = await UserModel.count({ where: { email: userEmail } });
      if (playerEmail == 0) {
        
        if(req.file){
          var imageOriginalName = req.file.originalname;
          var imageName = req.file.fieldname;
          var imageMime = req.file.mimetype;
          var imagePath = req.file.path;
          var revisedPath = imagePath.replace(/^public\\/, '');  // Regx will remove the word public from file path.
          var imageSize = req.file.size;
      } else {
          var imageName = "noimage.png";
      }    
        //If the email doesn't exists, procced with normal registration here...
        var playerData = {name:userName, email:userEmail, phonenumber:userPhone, password:userPassword, privilege:userPrivilegeUppercase, photo: revisedPath, position: userPosition };
        const addPlayer = await UserModel.create(playerData);
        console.log("Server side PUT method log:" + addPlayer);
        res.status(200).json({ success: true });
      } else {
        return res.status(409).json({ message: "Email address already exists !" });
      }
    } else {
      return res.status(401).json({ message: "Invalid token provided, please contact admin !" });
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

app.put('/service/profile', upload.single('photo'), async (req, res, next) => {

  try {

    const userName = req.body.name;
    const userReqEmail = req.body.email; 
    const userPhone = req.body.phonenumber;
    const userPassword = req.body.password;
    const userPosition = req.body.position;
    console.log(req.file);

    const userEmail = req.query.email;

    var selector = {
      where: { email: userEmail }
    };

    if(req.file){
      var imageOriginalName = req.file.originalname;
      var imageName = req.file.fieldname;
      var imageMime = req.file.mimetype;
      var imagePath = req.file.path;
      var revisedPath = imagePath.replace(/^public\\/, '');  // Regx will remove the word public from file path.
      var imageSize = req.file.size;
  } else {
      var imageName = "noimage.png";
  } 
  var updateData = {name:userName, email:userReqEmail, phonenumber:userPhone, password:userPassword, photo: revisedPath, position: userPosition };

    //Now below cleanData will remove all null/blank values coming in req.body and update field values with data.
    //const updateData = req.body;
    
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
    const photo = loginData[0].photo;
    if (password === userPassword && email === userEmail) {
      const privilege = loginData[0].privilege;
      res.status(200).json({ success: true, privilege, email, photo });
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

//This is to insert daily availability of players from Availability page by all player/users:

app.post('/service/availability', async (req, res) => {

  try {
    const userEmail = req.query.email;
    const dailyStatus =  req.body.dailystatus;
    var playerData = {email:userEmail, dailystatus: dailyStatus};
    const playerDailyStatus = await Availability.create(playerData);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//This is to update daily availability of players from Availability page by players:
app.put('/service/availability', async (req, res) => {

  try {
    const userEmail = req.query.email;
    const dailyStatus =  req.body.dailystatus;
    const data = await UserModel.findAll({ where: { email: userEmail }, attributes: ['id', 'privilege'] });
    const userId = data[0].id;
    const userPrivilege = data[0].privilege;
    const playerEmail = await Availability.count({ where: { email: userEmail } });
    if(playerEmail == 0){
    var createData = {email: userEmail, dailystatus:dailyStatus, user_id: userId};
    const playerDailyStatus = await Availability.create(createData);
    } else {
      var selector = {
        where: { email: userEmail }
      };
    var updateData = {dailystatus:dailyStatus, user_id: userId};
    const playerDailyStatus = await Availability.update(updateData, selector);
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//This is to get availability details of a player from availability table, join query to get photo and position details from user table:
//Same set of data will be used to display player data in teams section:

app.get('/service/availability', async (req, res) => {
  try {
    //var today = moment().format('YYYY-MM-DD HH:mm:ss');
    const dailyStatus = await sequelize.query("SELECT user.id, user.photo, user.position, availability.dailystatus FROM user join availability ON user.id = availability.id WHERE DATE(availability.createdAt) = CURDATE() OR DATE(availability.updatedAt) = CURDATE();", null, { raw: true});
    res.status(200).json({ dailyStatus });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
  
});

(async () => {
  try {
    const sequelizeStatus = await sequelize.sync();
    //sequelize.sync({ force: true })
    console.log("your server is up and running");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (e) {
    console.log(e, 'Database issue.');
  }
})();
