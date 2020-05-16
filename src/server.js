const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


// create a GET route
app.get('/register', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
