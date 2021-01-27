const { Sequelize, DataTypes } = require('sequelize');
const index = require('./index');
const sequelize = index.sequelize;

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

      models.Price.create({weekDay: newWeekDayPrice, weekEnd: newWeekEndPrice, occupancyTax: occupancy});

      for ( j = 0; j < stays.length; j++) {
        models.Reservation.create({propertyId: i, checkIn: stays[j]['checkIn'], checkOut: stays[j]['checkOut']})
      }
    }
    console.log(`Database & tables seeded!`);
  });