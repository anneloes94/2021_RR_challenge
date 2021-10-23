import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import UnassignedOrders from './components/UnassignedOrders';
import Driver from './components/Driver';

 
function App() {  
  // States
  const [orders, setOrders] = useState([])
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    axios.get('/orders')
    .then(result => {
      // put orders in state
      setOrders(result.data)
    });
  }, [])
  
  return (
    <div className="App">
      {orders.map(order => <div key={order.id}>{order.description}</div>)}
        {/* <div>
          <UnassignedOrders/>
        </div>
        <div>
          Driver Jane Doe
        </div> */}
        {/* for each driver in drivers state */}
          {/* create driver component with driver_id */}
        {/* <div>
          Driver Harry Potter
        </div> */}
    </div>
  );
}

export default App;
