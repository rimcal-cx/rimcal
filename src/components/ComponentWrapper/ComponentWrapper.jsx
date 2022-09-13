
import { useContext } from 'react'
import CalenderHeader from "../CalenderHeader";
import Month from "../Month";
import SideBar from "../SideBar";
import GlobalContext from "../../context/GlobalContext";
import EventModal from '../EventModal';

const ComponentWrapper=({currentMonth})=>{

    const { showEventModal } = useContext(GlobalContext)
    return (
        <div className='h-screen flex flex-col'>
        <CalenderHeader/>
        <div className='flex flex-1'>
        <SideBar/>
        <Month month={currentMonth}/>
        {showEventModal && <EventModal />}
        </div>

    </div>
    )
}
export default ComponentWrapper
