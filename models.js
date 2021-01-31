const db = require('./database/index')

let getPrice = async (id) => {
  let price = await db.Price.findAll({
    attributes: [['weekDay', 'price']],
    where: {
      propertyId: id
    },

  });
  return price;
}

let getPrices = async () => {
  let prices = await db.Price.findAll({
    attributes: ['propertyId', ['weekDay', 'price']]
  })
  return prices;
}

let getReservations = async (id) => {
  let reservations = await db.Reservation.findAll({
    attributes: ['checkIn', 'checkOut'],
    where: {
      propertyId: id
    }
  })
  return reservations;
}

module.exports = {getPrice, getPrices, getReservations}