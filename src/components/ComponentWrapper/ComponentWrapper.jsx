
import { useContext, useEffect } from 'react'
import CalendarHeader from "../CalendarHeader";
import Month from "../Month";
import SideBar from "../SideBar";
import GlobalContext from "../../context/GlobalContext";
import EventModal from '../EventModal';
import { toast } from 'react-toastify'
import ToastBody from '../ToastBody'
import { loadEvents } from '../../utilities/util';
import { PopupModal } from '../PopupModal';

const ComponentWrapper=({currentMonth})=>{

    const {
        showEventModal,
        setEventList,
        popupToggle,
        setPopupToggle,
        popupHeader,
        popupFooter,
        popupContent,
    } = useContext(GlobalContext)

    useEffect(() => {
        loadEvents().then(({events}) => {
            setEventList(events)
        }).catch((e) => {
            console.log(e)
            toast.error(<ToastBody title="Error" body="Unable to fetch Event Lists. Try again later." type="error" />)
        })
    }, [])

    return (
        <div className='h-screen flex flex-col'>
        <CalendarHeader/>
        <div className='flex flex-1'>
        <SideBar/>
        <Month month={currentMonth}/>
        {showEventModal && <EventModal />}
        {<PopupModal
            popupToggle={popupToggle}
            setPopupToggle={setPopupToggle}
            header={popupHeader}
            footer={popupFooter}
            content={popupContent}
            />}
        </div>

    </div>
    )
}
export default ComponentWrapper
