'use strict'

module.exports = {
  get: () => {
    return Promise.resolve({
      data: [
        {checkIn: "2021-01-08", checkOut: "2021-01-10"},
        {checkIn: "2021-01-17", checkOut: "2021-01-18"},
        {checkIn: "2021-01-26", checkOut: "2021-01-28"},
        {checkIn: "2021-01-30", checkOut: "2021-01-31"}
      ]
    });
  }
};