const express = require('express')
const app = express();
const db = require('../database/index');
var bodyParser = require('body-parser')

app.listen(3001);
app.use(express.static('public'));
app.use(bodyParser.json());