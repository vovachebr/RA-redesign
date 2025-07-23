import { useState } from 'react'
import './App.css'
import { Order } from './Order'
import { OrderList } from './OrderList'
import { Counter, LoggedCounter } from './Counter';

function App() {

  return (<>
    <OrderList />
    <Order id={1}/>
    <Order id={2}/>
  </>)

  // const [value, setValue] = useState(0);


  // return (
  //   <LoggedCounter
  //     value={value}
  //     addOne={() => setValue(value => value + 1)}
  //     decOne={() => setValue(value => value - 1)}
  //   />
  // );
}

export default App
