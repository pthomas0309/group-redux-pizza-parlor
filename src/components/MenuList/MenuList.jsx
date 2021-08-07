import axios from 'axios';
import { useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import MenuListItem from '../MenuListItem/MenuListItem';
import './MenuList.css';
import Button from '@material-ui/core/Button';

function MenuList() {
    const history = useHistory();
    // state for the menu data from DB, since it only gets used here
    const [pizzaMenu, setPizzaMenu] = useState([])

    // handles click of next button to navigate to customerinfo route
    const handleNext = () => {
        console.log('Clicked Next');
        
        // commented out the push to customerinfo until more testing is done
        history.push('/customerinfo')
    }

    // get menu from DB on load
    useEffect(() => {
        getPizzaMenu();
    }, [])

    // GET pizza menu data from DB
    const getPizzaMenu = () => {
        axios.get('/api/pizza')
            .then(response => {
                setPizzaMenu(response.data)
            })
            .catch(err => {
                alert('Problem getting menu');
                console.log(err);
            })
    }


    // console.log(pizzaMenu);
    
    return (
        <>
            <h2>Choose a pizza</h2>
                <div className="pizza-menu-container">
                {pizzaMenu.map(pizza => {
                return <div key={pizza.id} className="pizza-menu-div">
                            <MenuListItem pizza={pizza}/>
                        </div>
                })}
                </div>
            <Button 
            variant="contained"
            color="primary"
            onClick={handleNext}>Next</Button>
        </>
    )
}

export default MenuList;