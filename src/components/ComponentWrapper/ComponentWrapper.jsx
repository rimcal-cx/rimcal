
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
import dayjs from 'dayjs';

const ComponentWrapper=({currentMonth})=>{

    const {
        showEventModal,
        setEventList,
        monthIndex,
        popupToggle,
        syncToggle,
        setPopupToggle,
        popupHeader,
        popupFooter,
        popupContent,
    } = useContext(GlobalContext)

    useEffect(() => {
        const dates = {
            start_date: dayjs().month(monthIndex).date(1).format('YYYY-MM-DD').toString(),
            end_date: dayjs().month(monthIndex + 1).date(1).subtract(1, 'day').format('YYYY-MM-DD').toString()
        }
        loadEvents(dates).then(({events}) => {
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
        {popupToggle && <PopupModal
            popupToggle={popupToggle}
            syncToggle={syncToggle}
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
