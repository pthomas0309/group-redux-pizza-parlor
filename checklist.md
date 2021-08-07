- [ ] Pizza Cart!

- [ ] Reducers Needed
    - [x] Pizzas in cart (attatched to '/api/order' on server)  Pesto 
        - [x] named:     pizzaCart
        - [x] Select (dispatch) a pizza 
        - [x] Remove a pizza from cart (state)

        // TO DO: Decide on data model for cart state re. total
        - [x] start at state = {totalPrice: 0, pizzasInCart: []}
        - [x] actions:
            - [x] 'ADD_PIZZA'
                    - [x] payload: the pizza object that was sent 
                    - [x] handle logic for total cost when returning
                        STRETCH: quantity: number chosen    
            - [x] 'REMOVE_PIZZA'
                - [x] Will need filter
                - [x] compare id of item to remove to state of pizzaCart
            - [x] 'ORDER_SUBMITTED'
                - [x] will need to reset state after POST route is done

    - [ ] customer information 
        - [x] named:  customerDetails
        - [x] state = {} 
        - [x] actions: 
            - [x] 'SUBMIT_CUSTOMER'
                - [x] action.payload is a customer object to become state
            - [x] 'ORDER_SUBMITTED'
                - [x] reset state    
        


- [ ] useSelector to get all pizzas when looking to POST order
    - [ ] get from pizza cart


- [ ] Front-end stuff
 !!   ROUTE NAME: '/menu'    !!
    - [x] GET from database: full pizza menu (attatched to '/api/pizza' on server)
        - [x] Display on DOM
            - [x] each menu item as individual div with:
                - [x] pizza pic
                - [x] pizza name && price && description
                - [x] ADD/REMOVE button (rendered conditionally based on if the pizza has been added to the cart)
            

    - [x] Ability to choose a pizza from menu and a quantity?
    - [x] Dispatch to pizzaCart reducer (type: 'ADD_PIZZA')
        - [x] payload should be entire pizza object as well as quantity
        - [x] payload: {
                pizza(info from DB): pizzaFromMenu <-- this is an object
                quanity: number
              }
    
    - [x] Ability to remove pizza from cart
        - [x] payload: the pizza object that was chosen
    - [x] next button
        - [x] navigate to '/customerinfo' route


  !!    ROUTE NAME: '/customerinfo'      !!
    -[x] local states to hold form data
    - [x] Inputs
        - [x] customer_name
        - [x] street_address
        - [x] city
        - [x] zip
        - [x] type
            - [x] radio input
            - [x] pickup or delivery
     
     - [x] Display total
        - [x] useSelector pizzaCart
    - [x] button for form
        - [x] 'SUBMIT_CUSTOMER' action
        - [x] payload: customer object that was pulled from input values, include     total price
    - [x] sends client to '/checkout' route 

- [ ] checkout screen
    - [ ] '/checkout' route
    - [x] customer info
        - [x] from customerDetails reducer
    - [x] table with pizzas ordered
        - [x] from pizzaCart reducer
    - [x] Total
    - [x] checkout button
        - [x] POST request with all data brought in
        - [x] 'ORDER_SUBMITTED' action to all reducers
        - [ ] confirmation dialog
        - [x] navigate to '/menu' route

Components?
    MenuScreen
        /menu as route
        Child components: MenuList -> MenuListItem
    CustomerForm
        /customerinfo route
    CheckoutScreen
        /checkout route



Data Model

Database Name:
pizza_parlor


"pizza" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"description" VARCHAR(1000) NOT NULL,
	"price" NUMERIC (20, 2) NOT NULL,
	"image_path" VARCHAR(1000) NOT NULL
)


"orders" (
	"id" SERIAL PRIMARY KEY,
	"customer_name" VARCHAR (1000) NOT NULL,
	"street_address" VARCHAR(1000) NOT NULL,
	"city" VARCHAR(1000) NOT NULL,
	"zip" VARCHAR(20) NOT NULL,
	"type" VARCHAR(100) NOT NULL, either pickup or delivery
	"total" NUMERIC (20, 2) NOT NULL, 


	"time" TIMESTAMP DEFAULT NOW() NOT NULL
);


**Example JSON Post Data:**

```JSON
{
  "customer_name": "Donatello",
  "street_address": "20 W 34th St",
  "city": "New York",
  "zip": "10001",
  "total": "27.98",
  "type": "Pickup",
  "pizzas": [{
    "id": "1",
    "quantity": "1"
  },{
    "id": "2",
    "quantity": "1"
  }]
}

