const { Sequelize, DataTypes } = require('sequelize');
const schema = require('./index.js');
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

//Seeding functions
let weekDayPrice = ()=> {
  return (Math.floor(Math.random()*30)+10)*10;
};

let weekEndPrice = (weekDayPrice)=> {
  return Math.ceil(weekDayPrice*.15/10)*10+weekDayPrice;
}

let occupancyRate = ()=> {
  return parseFloat(Math.random()*.17 + .08).toFixed(2);
}

let randomDates = ()=> {
  let dayCount = 0;
  let stays = [];
  while (dayCount < 365) {
    dayCount += Math.ceil(Math.random()*8);
    let checkIn = getFormattedDate(dayCount);
    dayCount += Math.ceil(Math.random()*8);
    let checkOut = getFormattedDate(dayCount);
    stays.push({checkIn: checkIn, checkOut: checkOut});
  }
  return stays;
}

let getFormattedDate = function(dayNum){
  var date = new Date();
  date.setDate(dayNum);
  let [month, day, year] = date.toLocaleDateString("en-US").split("/");
  if (month < 10) { month = `0${month}` }
  if (day < 10) { day = `0${day}` }
  return `${year}-${month}-${day}`;
}

//Update tables
sequelize.sync({ force: true })
  .then(() => {
    for (let i = 1; i <= 100; i++) {
      let newWeekDayPrice = weekDayPrice();
      let newWeekEndPrice = weekEndPrice(newWeekDayPrice);
      let occupancy = occupancyRate();
      let stays = randomDates();

      Price.create({weekDay: newWeekDayPrice, weekEnd: newWeekEndPrice, occupancyTax: occupancy});

      for ( j = 0; j < stays.length; j++) {
        Reservation.create({propertyId: i, checkIn: stays[j]['checkIn'], checkOut: stays[j]['checkOut']})
      }
    }
    console.log(`Database & tables seeded!`);
  });

module.exports = {Reservation, Price, Selection}