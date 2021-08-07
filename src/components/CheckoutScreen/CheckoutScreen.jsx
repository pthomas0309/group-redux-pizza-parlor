import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import CheckoutList from '../CheckoutList/CheckoutList';
import "./CheckoutScreen.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

function CheckoutScreen() {


    const dispatch = useDispatch();
    const history = useHistory();

    const customerDetails = useSelector(store => store.customerDetails)
    const pizzaCart = useSelector(store => store.pizzaCart)
    const handleCheckout = () => {
        axios.post('/api/order', {
            customer_name: customerDetails.customer_name,
            street_address: customerDetails.street_address,
            city: customerDetails.city,
            zip: customerDetails.zip,
            type: customerDetails.type,
            total: pizzaCart.totalCost,
            pizzas:  pizzaCart.cartItems
          })
        .then(response => {
       console.log(response)
       dispatch({type:'ORDER_SUBMITTED'})
       history.push('/')
        }).catch(err => {
          console.log(err);
        })
    
    }

    return (
        <div id="checkoutContainer">
            <h1 className="checkoutHeader">Checkout</h1>
            <div id="customerDetails">
            <p>name:{customerDetails.customer_name}</p>
            <p>address:{customerDetails.street_address} {customerDetails.city} {customerDetails.zip}</p>
            <p>type: {customerDetails.type}</p>
            </div>
            <TableContainer >
            <Table className="pizzaTable">
                <TableHead>
                    <TableRow>
                    <TableCell className="tableNameHead">name</TableCell>
                    <TableCell> cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                       <CheckoutList />
                    </TableRow>
                </TableBody>
            </Table>
          </TableContainer> 
            <h1>Total: {pizzaCart.totalCost}</h1>
            <Button variant="contained" color="primary" 
            onClick={handleCheckout}>Checkout</Button>
        </div>
    )
}

export default CheckoutScreen;