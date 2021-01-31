const express = require('express')
const app = express();
var bodyParser = require('body-parser');

const db = require('../database/index');
const models = require('../models')
const { ModuleFilenameHelpers } = require('webpack');

const PORT = 3001;
app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/price', (req, res) => {
  models.getPrice(req.body.propertyId)
    .then((result)=> {
      res.send(result);
    })
    .catch((err)=> {
      console.log('ERROR: Price get request failed: ', err)
    })
})

app.get('/prices', (req, res) => {
  models.getPrices()
    .then((result)=> {
      console.log('PRICES RESULT', result)
      res.send(result);
    })
    .catch((err)=> {
      console.log('ERROR: Prices get request failed: ', err);
    })
})
app.get('/availability', (req, res) => {
  console.log('req params', req.query.propertyId);
  let propertyId = req.query.propertyId;
  console.log(propertyId);
  models.getReservations(propertyId)
    .then((result)=> {
      console.log('RESERVATIONS', result)
      res.send(result);
    })
    .catch((err)=> {throw err})
})

module.exports = {app};