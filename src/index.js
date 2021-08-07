import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
// added 3 imports
import {Provider } from 'react-redux'
import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const pizzaCart = (state = {totalCost: 0, cartItems: []}, action) => {
    switch (action.type) {
        // case of add a pizza to cart
        case 'ADD_PIZZA' :
            return {
                totalCost: state.totalCost + Number(action.payload.price), 
                cartItems: [...state.cartItems, action.payload]
            };
        case 'REMOVE_PIZZA' : 
            const matchPizza = pizza => pizza.id !== action.payload.id;
            const updatedCart = state.cartItems.filter(matchPizza);
            return {
                totalCost: state.totalCost - Number(action.payload.price), 
                cartItems: updatedCart
            };
        case 'ORDER_SUBMITTED' :
            return {
                totalCost: 0, 
                cartItems: []
            }
    }
    return state;
}

const customerDetails = (state = {}, action) => {
    if (action.type === 'SUBMIT_CUSTOMER'){
        return action.payload;
    } else if (action.type === 'ORDER_SUBMITTED'){
        return {};
    }
    return state;
}

const reduxStore = createStore(
    combineReducers({
        customerDetails, pizzaCart
    }),
    applyMiddleware(logger)
);

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));
