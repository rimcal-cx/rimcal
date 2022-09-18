import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

function Day({day,rowIdx}) {

    const[dayEvents,setDayevents] = useState([])
    const{
        setclickDay,
        setShowEventModal,
        saveEvents,
        setSelectedEvent,
        eventList,
        eventCssClass,
      }=useContext(GlobalContext)


    useEffect(()=>{
        const events = eventList?.filter(evt=>dayjs(evt.start_date).format("DD-MM-YY") === day.format("DD-MM-YY"))
        setDayevents(events)
    },[eventList, saveEvents, day])

    const currentDaystyle=()=>{
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")?"bg-blue-600 text-white rounded-full":""
    }

  return (
    <div className='border border-grey-200 flex flex-col hover:bg-sky-200 font-bold cursor-pointer' onClick={()=>{
            setclickDay(day)
            setShowEventModal(true)
        }}>
        {/* {day.format()} */}
        <header className='flex flex-col item-center'>
            {
                rowIdx === 0 && <p className='text-sm mt-1'>{day.format("ddd").toUpperCase()}</p>
            }

            <p className={`text-sm p-1 my-1 text-center ${currentDaystyle()}`}>{day.format("DD")}</p>
        </header>

        <div className='flex-1 cursor-pointer text-white' >

        {dayEvents?.map((evt,idx)=>(
            <div className={`${eventCssClass[evt?.event_label ?? Object.keys(eventCssClass)[0]]} p-1 mr-3 ${['lime', 'green'].includes(evt?.event_label ?? Object.keys(eventCssClass)[0]) ? 'text-gray-700' : 'text-gray-100'} text-sm rounded mb-1 truncate`}
            key={idx}
            onClick={()=>{console.log(evt);setSelectedEvent(evt);setShowEventModal(true)}}
            >
                {evt.summary}
            </div>

        ))}
        </div>

    </div>
  )
}

export default Day
