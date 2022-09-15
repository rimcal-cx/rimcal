
import { useState,useContext, useEffect } from 'react';
import GlobalContext from './context/GlobalContext';
import './assets/main.css';
import { getMonth } from './utilities/util';
import axios from 'axios';
import Signup from './components/Signup';
import ComponentWrapper from './components/ComponentWrapper/ComponentWrapper';
import {Route ,Routes} from 'react-router-dom'
import { ProtectedRoute } from "./components/ComponentWrapper/ProtectedRoute";


function App() {
  // console.table(getMonth());
  // return
const [currentMonth ,setCurrentMonth] = useState(getMonth())
const {monthIndex,showEventModal} = useContext(GlobalContext)
useEffect(()=>{
setCurrentMonth(getMonth(monthIndex))
// axios.get('google/redirect')
// .then(function (response) {
//     // handle success
//     console.log(response);
// })
// .catch(function (error) {
//     // handle error
//     console.log(error);
// });
},[monthIndex])
return (
<Routes>
<>
<Route path='/' element={<Signup/>} exact/>
<Route path='/calender' element={
     <ProtectedRoute>
        <ComponentWrapper currentMonth={currentMonth}/>
   </ProtectedRoute>
}/>
</>
</Routes>
);
}

export default App;
