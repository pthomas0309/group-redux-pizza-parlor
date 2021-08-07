import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function AdminPage() {

    const [orderHistory, setOrderHistory] = useState([])


    // get menu from DB on load
    useEffect(() => {
        getOrderHistory();
        console.log('Navigated to Admin');
    }, [])

    // GET pizza menu data from DB
    const getOrderHistory = () => {
        axios.get('/api/order')
            .then(response => {
                setOrderHistory(response.data)
            })
            .catch(err => {
                alert('Problem getting menu');
                console.log(err);
            })
    }

    console.log(orderHistory);

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      
      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      
        const classes = useStyles();
      
        return (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Order Placed</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistory.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell align="right">{order.customer_name}</TableCell>
                    <TableCell align="right">{order.time}</TableCell>
                    <TableCell align="right">{order.type}</TableCell>
                    <TableCell align="right">{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }


export default AdminPage;