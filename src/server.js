const express = require('express');
const bodyParser = require("body-parser");
const {Sequelize, DataTypes} = require("sequelize");

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
  port:DB_PORT
});

const UserModel = userSchema(sequelize, DataTypes);


app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/service/players', async(req, res) => {
  try{
    const players = await UserModel.findAll({where:{privilege:'PLAYER'}});
    res.status(200).json({players});
  }catch(e){
    res.status(500).json({message:e.message});
  }


});
app.put('/service/player', (req, res) => {
  console.log('service/player');
  res.json({ express: "add player" })
});
app.delete('/service/player', (req, res) => {
  console.log('service/player');
  res.json({ express: "delete player" })
});
app.get('/service/profile', (req, res) => {
  console.log('service/profile');
  res.json({ express: "player profile" })
});
app.post('/service/profile', (req, res) => {
  console.log('service/profile');
  res.json({ express: "player profile" })
});
app.post('/service/login', (req, res) => {
  console.log('service/login');
  res.json({ express: "login" })
});
//added to test and see client/server interaction:
app.post('/service/news', (req, res) => {
  console.log(req.body.newstitle);
  res.json({ express: "news" })
});


(async()=>{
  try{
    const sequelizeStatus = await sequelize.sync();
 console.log("your server is up and running");
app.listen(port, () => console.log(`Listening on port ${port}`));
  }catch(e){
    console.log(e,'Database issue.');
  }
})();
