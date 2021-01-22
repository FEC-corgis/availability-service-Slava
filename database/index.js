const { Sequelize, DataTypes } = require('sequelize');
const schema = require('./seed.js');
const dotenv = require('dotenv').config({ path: '../vars'});
const sequelize = new Sequelize('availability', {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'mysql'
})


//Verify connection
const auth = async ()=> {
  try {
    await sequelize.authenticate();
    console.log('SUCCESS: Database connected');
  } catch (error) {
  console.log(`ERROR: Can't connect to database: ${error}`)
  }
}

auth();
