import {useState} from 'react';
import './MenuListItem.css';
import Button from '@material-ui/core/Button';

// source in useDispatch
import {useDispatch} from 'react-redux'

function MenuListItem({pizza}) {

    // state for conditionally rendered button
    const [isAdded, setIsAdded] = useState(false);

    // make use dispatch accessible through 'dispatch'
    const dispatch = useDispatch();

    const addToCart = (event) => {
        // stop page load
        event.preventDefault();

        dispatch({
            type: 'ADD_PIZZA',
            payload: {...pizza, quantity: 1}
        })

        // change state to render the other button
        setIsAdded(!isAdded);
    }

    const removeFromCart = (event) => {
        // stop page load
        event.preventDefault();

        dispatch({
            type: 'REMOVE_PIZZA',
            payload: pizza
        })

        // change state to render the other button
        setIsAdded(!isAdded);
    }
    // console.log(pizza);
    return (
        <>
            <img src={pizza.image_path} alt="image of pizza" className="menu-item-image"/>
            <h2 className="menu-item-name">{pizza.name}</h2>
            <p className="menu-item-description">{pizza.description}</p>
            <h4 className="menu-item-price">{pizza.price}</h4>
            <div className="add-button-div">
                {!isAdded ? 
                <Button 
                    onClick={addToCart}
                    variant="contained"
                    color="primary"
                >Add to cart</Button> :
                <Button 
                    onClick={removeFromCart}
                    variant="contained"
                    color="primary"
                >Remove from cart</Button>}
            </div>

        </>
    )
}

export default MenuListItem;