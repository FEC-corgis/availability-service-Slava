const express = require('express')
const app = express();
var path = require('path');
const { ModuleFilenameHelpers } = require('webpack');
var bodyParser = require('body-parser');
const PORT = 3001;

const db = require('../database/index');
const models = require('../models')
console.log ('PATH JOIN', path.join(__dirname, '../public'));
app.use('/rooms/:id', express.static(path.join(__dirname, '../public')))
// app.use(express.static('public'));
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

//app get /rooms/:propertyId
  //send html file
  // app.get('/rooms/:propertyId', (req, res)=> {
  //   console.log('PROPERTYID', req.params.propertyId)
  //   res.sendFile('../public')
  // })
  // app.get('/rooms/:propertyId', express.static('public'));


app.get('/availability/:propertyId', (req, res) => {
  console.log('req params', req.params.propertyId);
  let propertyId = req.params.propertyId;
  console.log(propertyId);
  models.getReservations(propertyId)
  .then((result)=> {
    console.log('RESERVATIONS', result)
    res.send(result);
  })
  .catch((err)=> {throw err})
})

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
});
module.exports = {app};