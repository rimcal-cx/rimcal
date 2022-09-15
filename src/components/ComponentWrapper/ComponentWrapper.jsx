
import { useContext, useEffect } from 'react'
import CalendarHeader from "../CalendarHeader";
import Month from "../Month";
import SideBar from "../SideBar";
import GlobalContext from "../../context/GlobalContext";
import EventModal from '../EventModal';
import axios from 'axios';

const ComponentWrapper=({currentMonth})=>{

    const { showEventModal,db_data,setDbdata } = useContext(GlobalContext)

    const data =async ()=>{
        const result = await (await axios.get('calendar'))
        console.log(result);
        setDbdata(result)
    }

    useEffect(() => {
        console.log("UJARUL");
      data()
        //setDayevents(events)
    },[])

    return (
        <div className='h-screen flex flex-col'>
        <CalendarHeader/>
        <div className='flex flex-1'>
        <SideBar/>
        <Month month={currentMonth}/>
        {showEventModal && <EventModal />}
        </div>

    </div>
    )
}
export default ComponentWrapper
