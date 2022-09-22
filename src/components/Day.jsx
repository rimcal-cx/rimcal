import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import axios from 'axios'

function Day({day,rowIdx}) {

    const[dayEvents,setDayevents] = useState([])
    const{
        setclickDay,
        setshowEventModal,
        saveEvents,
        selectedEvent,
        setselectedEvent,
        db_data
      }=useContext(GlobalContext)


    useEffect(()=>{
        const events = db_data.filter(evt=>dayjs(evt.start_date).format("DD-MM-YY")===day.format("DD-MM-YY"))
        setDayevents(events)
    },[db_data,saveEvents,day])

    const currentDaystyle=()=>{
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")?"bg-blue-600 text-white rounded-full":""
    }

  return (
    <div className='border border-grey-200 flex flex-col hover:bg-sky-200 font-bold cursor-pointer' onClick={()=>{
            setclickDay(day)
            setshowEventModal(true)
        }}>
        {/* {day.format()} */}
        <header className='flex flex-col item-center'>
            {
                rowIdx === 0 && <p className='text-sm mt-1'>{day.format("ddd").toUpperCase()}</p>
            }

            <p className={`text-sm p-1 my-1 text-center ${currentDaystyle()}`}>{day.format("DD")}</p>
        </header>

        <div className='flex-1 cursor-pointer text-white' >

        {dayEvents.map((evt,idx)=>(
            <div className={`bg-lime-500 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            key={idx}
            onClick={()=>{setselectedEvent(evt);setshowEventModal(true)}}
            >
                {evt.summary}
            </div>

        ))}
        </div>

    </div>
  )
}

export default Day
