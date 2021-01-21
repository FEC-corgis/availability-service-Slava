const express = require('express')
const app = express();
const db = require('../database/index');
const models = require('../models')
var bodyParser = require('body-parser');
const { ModuleFilenameHelpers } = require('webpack');


app.listen(3001);
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

})