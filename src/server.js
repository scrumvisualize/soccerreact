const express = require('express');
const bodyParser = require("body-parser");
const dbrepository = require("sequelize");
const cors = require("cors");
const port = 8000;
const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/service/players', (req, res) => {
  res.status(200).json({
    players: [
      { image: '/images/person.png', name: 'Dan', position: "Forward" },
      { image: '/images/person.png', name: 'Arun', position: "Defense" },
      { image: '/images/person.png', name: 'Trent', position: "Mid Fielder" },
      { image: '/images/person.png', name: 'Celta', position: "Forward" },
      { image: '/images/person.png', name: 'Eggie', position: "Defense" },
      { image: '/images/person.png', name: 'Rant', position: "Mid Fielder" },
      { image: '/images/person.png', name: 'Ruben', position: "Defense" },
    ]
  })
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


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
