import  { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router";

import '../CustomerForm/CustomerForm.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function CustomerForm() {
    const total = useSelector(store => store.pizzaCart.totalCost)
    const history = useHistory();

    let[customerToAdd, setCustomerToAdd] = useState({
        customer_name: '',
        street_address: '',
        city: '',
        zip: '',
        type: 'Delivery',
        total: total
    });


    //five handle change of inputs functions
    const handleNameChange = (event) => {
        setCustomerToAdd({
            ...customerToAdd,
            customer_name:event.target.value,
        });
    }

    const handleStreetChange = (event) => {
        setCustomerToAdd({
            ...customerToAdd,
            street_address:event.target.value,
        });
    }

    const handleCityChange = (event) => {
        setCustomerToAdd({
            ...customerToAdd,
            city:event.target.value,
        });
    }

    const handleZipChange = (event) => {
        setCustomerToAdd({
            ...customerToAdd,
            zip:event.target.value,
        });
    }

    const handleTypeChange = (event) => {
        setCustomerToAdd({
            ...customerToAdd,
            type:event.target.value,
        });
    }


    const dispatch = useDispatch();

    //add customer info to reducer from page
    const addCustomer = (event) => {

        event.preventDefault();
        console.log(customerToAdd)

        dispatch({
            type: 'SUBMIT_CUSTOMER',
            payload: customerToAdd
        })

        console.log(customerToAdd)

        setCustomerToAdd({
            customer_name: '',
        street_address: '',
        city: '',
        zip: '',
        type: 'Delivery',
        total: total
        })

        history.push('/checkout')
    }

    return (
        <>
        <h2>Customer Info</h2>
        <form onSubmit ={addCustomer}>
            <div className="customer-form-control">
                <TextField onChange={handleNameChange}
                required 
                label="Name"
                type='text' 
                placeholder="name" 
                variant="outlined"/>

                <TextField onChange={handleStreetChange}
                required 
                label="Address"
                type='text' 
                helperText="Must be a valid address"
                placeholder="Street Address" 
                variant="outlined"/>

                <TextField onChange={handleCityChange} 
                required
                label="City"
                type='text' 
                placeholder="City"
                variant="outlined" />

                <TextField onChange={handleZipChange} 
                required
                label="Zip Code"
                type="number" 
                placeholder="Zip" 
                variant="outlined"/>
            </div>
            <div className="customer-form-control">
                <h4>Order Type</h4>
                <RadioGroup row aria-label="Pick-up or Delivery" onChange={handleTypeChange}>
                    <FormControlLabel value="Pick-Up" control={<Radio />} label="Pick-Up" />
                    <FormControlLabel value="Delivery" control={<Radio />} label="Delivery" />
                </RadioGroup>
            </div>

            <Button onClick={addCustomer} variant="contained" color="primary">
                Next
            </Button>
        </form>
        </>
    )
}

export default CustomerForm;