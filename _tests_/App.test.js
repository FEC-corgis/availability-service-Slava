import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/app';
import Month from '../src/components/month';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs';

describe('Calendar render', ()=>{
  test('should fetch a list of reservations', ()=>{
    const getSpy = jest.spyOn(axios, 'get');
    render(<App />)
    expect(getSpy).toBeCalled();
  })

  test('should render month', ()=> {
    const getSpy = jest.spyOn(axios, 'get');
    render(<App />)
    const firstMonth = screen.queryByTestId('month-test');
    console.log('FIRST MONTHHHH', firstMonth)
    expect(firstMonth).toBeInTheDocument();
  })

})

