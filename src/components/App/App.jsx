import React from 'react';
import axios from 'axios';
import './App.css';
import MenuList from '../MenuList/MenuList';
import CustomerForm from '../CustomerForm/CustomerForm';
import CheckoutScreen from '../CheckoutScreen/CheckoutScreen';
import {useSelector} from 'react-redux';
import AdminPage from '../AdminPage/AdminPage';

// router imports
import {Route, HashRouter as Router} from 'react-router-dom';

function App() {

  const total = useSelector(store => store.pizzaCart.totalCost)

  const displayTotal = () => {
    if (total > 0){
      return total.toFixed(2)
    } else {
      return 0;
    }
  }

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Prime Pizza</h1>
          <h3>Total: ${displayTotal()}</h3>

        </header>
        {/* Needs a route */}
        <Route path='/' exact>
          <MenuList />
        </Route>
        {/* Needs a route */}
        <Route path='/customerinfo'>
          <CustomerForm />
        </Route>
        {/* Needs a route */}
        <Route path='/checkout'>
          <CheckoutScreen />
        </Route>
        <Route path='/admin'>
          <AdminPage />
        </Route>
      </div>
    </Router>
  );
}

export default App;
