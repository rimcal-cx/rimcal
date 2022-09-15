
import { useContext, useEffect } from 'react'
import CalendarHeader from "../CalendarHeader";
import Month from "../Month";
import SideBar from "../SideBar";
import GlobalContext from "../../context/GlobalContext";
import EventModal from '../EventModal';
import axios from 'axios';

const ComponentWrapper=({currentMonth})=>{

    const { showEventModal,setDbdata,db_data } = useContext(GlobalContext)
    const loadEvents =async ()=>{
        const result = (await axios.get('calendar'))
        setDbdata(result.data.data.events)

    }

    useEffect(()=>{

    },[db_data])
    useEffect(() => {
        loadEvents()
    }, [])

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
