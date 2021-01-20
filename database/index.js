const { Sequelize, DataTypes } = require('sequelize');
const schema = require('./seed.js');
const sequelize = new Sequelize('availability', 'root', 'sqlcraft', {
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
