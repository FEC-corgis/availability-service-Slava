import React from 'react';
import DateCell from './DateCell';
import styled from 'styled-components'

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

const Month = ({monthYear, matrix, selectCheckIn}) => (
  <div>
    <H3>
      {`${monthYear}`}
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
                (day, index)=>(<DateCell selectCheckIn={selectCheckIn} key={index} date={day.date} disabled={day.disabled} checkOutOnly={day.checkOutOnly} active={day.active} />)
              )}
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
)

export default Month;