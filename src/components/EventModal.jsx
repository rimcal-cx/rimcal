import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { HiPencilAlt } from "react-icons/hi"
import axios from 'axios'

function EventModal() {
    const {setshowEventModal,clickDay,DispatchCalEvents,selectedEvent } = useContext(GlobalContext)
    // const labelsclass = ["bg-lime-500","bg-gray-500","bg-green-500","bg-blue-500","bg-red-500","bg-purple-500"]
    const labelsclass = ["lime", "red", "green", "gray", "blue", "purple"]
    const [summary,setSummary] =useState(selectedEvent?selectedEvent.summary:"")
    const [description,setDescription] =useState(selectedEvent?selectedEvent.description:"")
    const [label,setclicklebel] =useState(labelsclass[0])

    const HandleSubmit = async ()=>{

        /*const calendarEvents={
            title:title,
            desc:desc,
            label:label,
            day:clickDay.valueOf(),
            id: selectedEvent? selectedEvent.id:Date.now()
        }*/

        const calendarEvents = {
            calendar_id: null,
            summary: summary,
            description: description,
            location: 'Kolkata',
            label: label,
            start_datetime: clickDay.format("YYYY-MM-DDTHH:mm:ss").toString(),
            end_datetime: clickDay.format("YYYY-MM-DDTHH:mm:ss").toString(),
            //id: selectedEvent? selectedEvent.id:Date.now()
            timezone: 'Asia/Kolkata',
            all_day: false,
            attendees: ['surajit@rimsys.io'],
            remind_before_in_mins: 10
        }
        //console.log(calendarEvents)

        const result = await (axios.post('calendar/add', {...calendarEvents} ))

        //console.log('---------------------')
        //console.log(result)
        if (selectedEvent) {
            DispatchCalEvents({type:"update",payload:calendarEvents})
        } else {
            DispatchCalEvents({type:"push",payload:calendarEvents})
        }

        // DispatchCalEvents({type:"push",payload:calendarEvents})
        setshowEventModal(false)
    }
    const handleDelte = (event)=>{
        DispatchCalEvents({type:"delete",payload:event})
        setshowEventModal(false)
    }

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <div className='bg-white rounded-lg shadow-2xl w-1/4'>
            <header className='bg-gray-100 px-4 py-2 flex justify-between'>
            {/* <span className='material-icons-outline text-gray-100'>
                    <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" alt="" srcset="" className='w-7 h-7'/>
                </span> */}
                <button onClick={()=>{setshowEventModal(false)}}>
                <span className='material-icons-outline text-gray-100'>
                    <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                </button>
                <button onClick={()=>{handleDelte(selectedEvent)}}>
                <span className='material-icons-outline text-gray-100'>
                    <img src="https://www.freeiconspng.com/thumbs/remove-icon-png/remove-icon-png-26.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                </button>
            </header>
            <div className='p-3'>
                <div className='grid grid-cols-1/5 items-end gap-y-7'>
                    <div></div>
                    <input type="text" name="summary" placeholder='Add Title' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={summary} onChange={(e)=>setSummary(e.target.value)}/>

                    <span className='material-icons-outline text-gray-100'>
                    <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678120-calendar-clock-512.png" alt="Close Modal"  className='w-7 h-7'/>

                </span>
                <p className='font-bold'>{clickDay.format("dddd,MMMM,DD")} </p>

                <span className='material-icons-outline text-gray-100'>

                <img src="https://w7.pngwing.com/pngs/405/546/png-transparent-job-description-computer-icons-employment-business-handbook-miscellaneous-text-service-thumbnail.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                <input type="text" name="description" placeholder='Description' className='border-0 pt-3 text-gray-600 font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                <span className='material-icons-outline text-gray-100'>

                <img src="https://cdn.iconscout.com/icon/free/png-256/bookmark-1754138-1493251.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                <div className='flex gap-x-2'>
                    {
                        labelsclass.map((lbl,i)=>(
                            <span key={i}
                            onClick={()=>{setclicklebel(lbl)}}
                            className={`bg-${lbl}-500 w-7 h-7 rounded flex items-center justify-center cursor-pointer mx-1 hover:p-2 hover:rounded-l hover:ring-2 hover:ring-black`}
                            >
                {
                    label === labelsclass &&  <HiPencilAlt className="w-7 h-7 text-gray-400" />
                }

                </span>
                    ))
                    }
                </div>
                </div>


            </div>
            <footer className='flex w-100 justify-end p-3 mt-5 border-t'>

                <button  onClick={HandleSubmit} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-bold">
                    Save Event

                </button>
            </footer>

        </div>
    </div>
  )
}

export default EventModal
