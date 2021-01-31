import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/app';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios'

describe('Calendar render', ()=>{
  test('should fetch a list of reservations', ()=>{
    const getSpy = jest.spyOn(axios, 'get');
    render(<App />)
    expect(getSpy).toBeCalled();
  })
})

