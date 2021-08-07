import { useSelector } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';


function CheckoutList () {
    const pizzaCart = useSelector(store => store.pizzaCart)
    return(
        <>
        <TableCell>
           { pizzaCart.cartItems.map( (pizza, i) => {
               return <p h3 key={i} >{pizza.name}</p>
           })}
        </TableCell>

        <TableCell>
           { pizzaCart.cartItems.map( (price, i) => {
               return <p key={i}>{price.price}</p>
           })}
        </TableCell>
        </>
    )
}


export default CheckoutList


