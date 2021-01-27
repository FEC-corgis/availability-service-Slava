require('dotenv').config({path: '../.env'});
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('availability', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
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

module.exports = {sequelize};
