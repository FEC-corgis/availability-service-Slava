import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import dayjs from 'dayjs';
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

  }

  selectCheckIn(checkIn) {
    console.log('hey');
    this.setState({
      checkIn: checkIn
    }, ()=> {console.log('checkin setstate', this.state)})
  }

  componentDidMount() {
    axios.get(`/availability?propertyId=${this.state.propertyId}`)
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
      constructor(dateCount, disabled, checkOutOnly) {
        this.date = dateCount,
        this.disabled = disabled,
        this.checkOutOnly = checkOutOnly
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
            let dateObj = new DateObj(dayCount, disabled, checkOutOnly);
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
    return (
      <div>
        {this.state.matrices[0] && this.state.matrices.map(
          (month, index) => {
            return <Month key={index} selectCheckIn={this.selectCheckIn} matrix={month} monthYear={dayjs().month(index).format('MMMM YYYY')}/>
          }
          )}
      </div>
    )
  }
}

export default App;