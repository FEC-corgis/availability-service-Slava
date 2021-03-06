import React from 'react'
import styled from 'styled-components'

const Td = styled.td`


  border: 1.5px solid rgb(255, 255, 255);
  border-radius: 100%;
  color: ${props => props.disabled ? '#B0B0B0' : props.checkOutOnly ? '#717171' : '#222222'};
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


const DateCell = ({checkIn, checkOut, checkOutOnly, date, disabled, month, selectCheckIn, selectCheckOut, year}) => {
  let onClickValue;
  if (disabled || checkOutOnly) {
    onClickValue === null;
  } else if (checkIn) {
    onClickValue = e => selectCheckOut(year, month, date);
  } else {
    onClickValue = e => selectCheckIn(year, month, date);
  }
  return (<Td disabled={disabled} checkOutOnly={checkOutOnly} onClick={onClickValue}>{date}</Td>)
}

export default DateCell;