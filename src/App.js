
import { useState,useContext, useEffect } from 'react';
import CalenderHeader from './components/CalenderHeader';
import EventModal from './components/EventModal';
import Month from './components/Month';
import SideBar from './components/SideBar';
import GlobalContext from './context/GlobalContext';
import './assets/main.css';
import { getMonth } from './util';
import axios from 'axios';

function App() {
  // console.table(getMonth());
  // return
  const [currentMonth ,setCurrentMonth] = useState(getMonth())
  const {monthIndex,showEventModal} = useContext(GlobalContext)
  useEffect(()=>{
 setCurrentMonth(getMonth(monthIndex))
  axios.get('google/redirect')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
  },[monthIndex])
  return (
    <>
    {showEventModal && <EventModal/>}
    <div className='h-screen flex flex-col'>
      <CalenderHeader/>
      <div className='flex flex-1'>
        <SideBar/>
        <Month month={currentMonth}/>

      </div>

    </div>
    </>
  );
}

export default App;
