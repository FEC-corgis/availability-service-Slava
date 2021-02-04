import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import Month from './Month'

var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyId: 20,
      reservations: [],
      matrices: [],
      checkIn: null,
      checkOut: null
    };
    this.selectCheckIn = this.selectCheckIn.bind(this);
    this.selectCheckOut = this.selectCheckOut.bind(this);
  }

  selectCheckIn(year, month, date, matrixIndex, rowIndex, dayIndex) {
    let newMatrices = [...this.state.matrices];
    newMatrices[matrixIndex][rowIndex][dayIndex] = {...newMatrices[matrixIndex][rowIndex][dayIndex], active: true}

    this.setState({
      checkIn: dayjs().year(year).month(month).date(date).format('YYYY-MM-DD'),
      matrices: newMatrices
    }, ()=> {console.log('checkin setstate', this.state)})
  }

  selectCheckOut(year, month, date, matrixIndex, rowIndex, dayIndex) {
    let newMatrices = [...this.state.matrices];
    newMatrices[matrixIndex][rowIndex][dayIndex] = {...newMatrices[matrixIndex][rowIndex][dayIndex], active: true}

    this.setState({
      checkOut: dayjs().year(year).month(month).date(date).format('YYYY-MM-DD'),
      matrices: newMatrices
    }, ()=> {console.log('checkin setstate', this.state)})
  }


  componentDidMount() {
    console.log('hey WINDOW LOCATION', window.location.pathname.split().pop())
    //add back in availability query param
    let propertyId = window.location.pathname.split().pop();
    axios.get(`/availability/${propertyId}`)
      .then((resp)=> {
        this.setState({
          reservations: resp.data
        })
      })
      .then(()=>{
        this.createMonths();
      })
  }

  createMonths(){
    let start = this.state.reservations[0]['checkIn'];
    let firstDayOfMonth = dayjs(start).date(1).day();
    let currentMonth = dayjs(start).month();
    let daysInCurrentMonth = dayjs(start).daysInMonth();

    let currentCheckIn;
    let currentCheckOut;
    let resCount = 0;
    let updateReservations = (reservationIndex)=> {
      currentCheckIn = dayjs(this.state.reservations[reservationIndex]['checkIn']);
      currentCheckOut = dayjs(this.state.reservations[reservationIndex]['checkOut']);
    }
    updateReservations(resCount);

    let dayCount = 1;
    let months = [];
    let DateObj = class {
      constructor(dateCount, disabled, checkOutOnly, active) {
        this.date = dateCount,
        this.disabled = disabled,
        this.checkOutOnly = checkOutOnly
        this.active = active
      }
    }

    //12 month matrices
    for (let i = 0; i < 12; i++) {
      let month = [];

      //row per month
      for (let j = 0; j < 7; j++) {
        let week = [];

        //date cell
        for (let k = 0; k < 7; k++) {

          //cells before 1st of the month
          if (j === 0 && k < firstDayOfMonth) {
            week.push(new DateObj(null, true));
          }

          //cells after days of the month
          else if (dayCount > daysInCurrentMonth) {
            dayCount = 1;
            daysInCurrentMonth = dayjs(start).month(++currentMonth).daysInMonth();
            firstDayOfMonth = dayjs(start).month(currentMonth).date(1).day();
            k = 7;
            j = 6;
          }

          //days of the month
          else {

            //check if current date is between current reservation and increment res
            //if daycount is between current reservation, disabled = true
            let disabled;
            let checkOutOnly;

            let currentDate = dayjs().month(currentMonth).date(dayCount).startOf('d');

            if (currentDate.isSameOrAfter(currentCheckIn) && currentDate.isSameOrBefore(currentCheckOut)) {
              disabled = true;
              if (currentDate.isSame(currentCheckOut)) {
                updateReservations(++resCount);
              }
            }

            //check if day before checkIn
            if (currentDate.isSame(currentCheckIn.subtract(1, 'day'))) {
              checkOutOnly = true;
            }

            //create a push date cell
            let dateObj = new DateObj(dayCount, disabled, checkOutOnly, null);
            week.push(dateObj);
            dayCount++;
          }
        }
        if (week.length > 0) {
          month.push(week)
        }
      }
      months.push(month)
    }

    this.setState({
      matrices: months
    }, ()=>{
      // console.log('MATRICES SET', this.state)
    });
  }

  render () {
    let monthToday = dayjs().month();

    return (
      <div>
            <p>{`Checkin: ${this.state.checkIn}, checkout: ${this.state.checkOut}`}</p>
        {this.state.matrices[0] && this.state.matrices.map(
          (month, index) => {
            return <Month
              checkIn={this.state.checkIn}
              checkOut={this.state.checkOut}
              key={index}
              matrix={month}
              matrixIndex={index}
              month={dayjs().add(index, 'months').month()}
              selectCheckIn={this.selectCheckIn}
              selectCheckOut={this.selectCheckOut}
              year={dayjs().month(monthToday+index).year()}
            />
          }
          )}
      </div>
    )
  }
}

export default App;