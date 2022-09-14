
import { useState,useContext, useEffect } from 'react';
import CalenderHeader from './components/CalenderHeader';
import EventModal from './components/EventModal';
import Month from './components/Month';
import SideBar from './components/SideBar';
import GlobalContext from './context/GlobalContext';
import './assets/main.css';
import { getMonth } from './util';
import axios from 'axios';
import Signup from './components/Signup';
import ComponentWrapper from './components/ComponentWrapper/ComponentWrapper';
import {Route ,Routes} from 'react-router-dom'


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
<Route path='/calender' element={<ComponentWrapper currentMonth={currentMonth}/>}/>
</>
</Routes>
);
}

export default App;
