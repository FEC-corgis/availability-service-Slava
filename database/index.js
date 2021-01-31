require('dotenv').config({path: '../.env'});
const { Sequelize, DataTypes } = require('sequelize');
<<<<<<< HEAD
const sequelize = new Sequelize('availability', process.env.DB_USER, process.env.DB_PASS, {
=======
const sequelize = new Sequelize('availability', 'root', 'sqlcraft', {
>>>>>>> startCalendar
  host: 'localhost',
  dialect: 'mysql',
  query: {raw: true}
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

<<<<<<< HEAD
module.exports = {sequelize};
=======
// sequelize.sync({ force: true })

//Data models
const Reservation = sequelize.define('Reservation', {
  propertyId: { type: DataTypes.INTEGER},
  checkIn: { type: DataTypes.DATEONLY },
  checkOut: { type: DataTypes.DATEONLY }
}, {
  timestamps: false
});

const Price = sequelize.define('Price', {
  propertyId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  weekDay: { type: DataTypes.INTEGER },
  weekEnd: { type: DataTypes.INTEGER },
  occupancyTax: { type: DataTypes.DECIMAL(10, 2) }
}, {
  timestamps: false
});

const Selection = sequelize.define('Selection', {
  guests: { type: DataTypes.INTEGER },
  checkIn: { type: DataTypes.DATEONLY },
  checkOut: { type: DataTypes.DATEONLY }
}, {
  timestamps: false
})

module.exports = {Reservation, Price, Selection}
>>>>>>> startCalendar
