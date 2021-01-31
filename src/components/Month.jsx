import React from 'react';
import DateCell from './DateCell';
import styled from 'styled-components'
import dayjs, { Dayjs } from 'dayjs';

const Th = styled.th`
    color: #717171;
    font-family: sans-serif;
    font-size: 12px;


`
const H3 = styled.h3`
  color: #222222;
  display: inline-block;
  font-family: sans-serif;
  font-size: 16px;
  height: 20px;
  text-align: center;
`

let daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Month = ({checkIn, checkOut, matrix, month, selectCheckIn, selectCheckOut, year}) => (
  <div>
    <H3>
      {`${dayjs().month(month).year(year).format('MMMM YYYY')}`}
    </H3>
    <table cellSpacing='0' cellPadding='0'>
      <thead>
        <tr>
          {daysOfWeek.map((day)=> <Th key={day} className='dateHeading'>{day}</Th>)}
        </tr>
      </thead>
      <tbody>
        {matrix.map(
          (row, index)=> (
            <tr key={index}>
              {row.map(
                (day, index)=>(<DateCell
                  active={day.active}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  checkOutOnly={day.checkOutOnly}
                  date={day.date}
                  disabled={day.disabled}
                  key={index}
                  month={month}
                  selectCheckIn={selectCheckIn}
                  selectCheckOut={selectCheckOut}
                  year={year}
                  />)
              )}
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
)

export default Month;