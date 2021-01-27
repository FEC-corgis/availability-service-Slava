import React from 'react'
import styled from 'styled-components'

const Td = styled.td`

  background-color: ${props => props.active ? '#222222': "#FFFFFF"};
  border: 1.5px solid rgb(255, 255, 255);
  border-radius: 100%;
  color: ${props => props.disabled ? '#B0B0B0' : props.checkOutOnly ? '#717171' : props.active ? '#FFFFFF' : '#222222'};
  font-family: sans-serif;
  font-size: 14px;
  font-weight: ${props => props.disabled ? 300 : 600 };
  height: 52px;
  justify-content: center;
  margin: 0px 1px;
  text-align: center;
  text-decoration: ${props => props.disabled ? 'line-through' : 'none'};
  width: 52px;
  &:hover {
    cursor: ${props => props.disabled || props.checkOutOnly ? 'default' : 'pointer'};
    border-color: ${props => props.disabled ? 'white' : props.checkOutOnly ? '#DDDDDD' : '#222222'};
    };

`;


const DateCell = ({matrixIndex, rowIndex, dayIndex, active, checkIn, checkOut, checkOutOnly, date, disabled, month, selectCheckIn, selectCheckOut, year}) => {
  let onClickValue;
  if (disabled || checkOutOnly) {
    onClickValue === null;
  } else if (checkIn) {
    onClickValue = (e) => {
      console.log('active', active)
      return selectCheckOut(year, month, date, matrixIndex, rowIndex, dayIndex);
    }
  } else {
    console.log('active', active)
    onClickValue = e => selectCheckIn(year, month, date, matrixIndex, rowIndex, dayIndex);
  }
  return (<Td active={active} disabled={disabled} checkOutOnly={checkOutOnly} onClick={onClickValue}>{date}</Td>)

}

export default DateCell;