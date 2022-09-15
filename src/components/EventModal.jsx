import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { TiTick } from "react-icons/ti"
import axios from 'axios'
import titleIcon from '../assets/images/tag.png'

function EventModal() {
    const { setshowEventModal, clickDay, DispatchCalEvents, selectedEvent, setselectedEvent, setEventList, eventList} = useContext(GlobalContext)
    const labelCssClasses = ["lime", "red", "green", "gray", "blue", "purple"]
    const [title,setTitle] = useState(selectedEvent?selectedEvent.title:"")
    const [description,setDescription] = useState(selectedEvent?selectedEvent.description:"")
    const [endtime,setEndtime] = useState(selectedEvent?selectedEvent.endtime:"")
    const [starttime,setstarttime] = useState(selectedEvent?selectedEvent.starttime:"")
    const [timezone,setTimezone] = useState(selectedEvent?selectedEvent.starttime:"")
    const [reminder,setreminder] = useState(selectedEvent?selectedEvent.reminder:false)
    const [toggleCss,setToggleCss]= useState('translate-x-0')
    const [label,setLabel] = useState(labelCssClasses[0])

    const HandleSubmit = async ()=>{

        /*const calendarEvents={
            title:title,
            desc:desc,
            label:label,
            location:location,
            day:clickDay.valueOf(),
            reminder:reminder,
            endtime:endtime,
            toggleCss:toggleCss,
            timezone:timezone,
            id: selectedEvent? selectedEvent.id:Date.now()
        }*/

        const calendarEvents = {
            calendar_id: null,
            summary: title,
            description: description,
            location: 'Kolkata',
            label: label,
            start_datetime: clickDay.format("YYYY-MM-DDTHH:mm:ss").toString(),
            end_datetime: clickDay.format("YYYY-MM-DDTHH:mm:ss").toString(),
            timezone: 'Asia/Kolkata',
            all_day: false,
            attendees: [
                {
                    "id": 1,
                    "name": "Sadhukhan",
                    "email": "surajit@rimsys.io"
                },
                {
                    "id": 2,
                    "name": "Tarun",
                    "email": "tarun@rimsys.io"
                }
            ],
            remind_before_in_mins: 10
        }
        //console.log(calendarEvents)

        const result = await (axios.post('calendar/add', {...calendarEvents} ))

        //console.log('---------------------')
        //console.log(result)

        // Save to local storage
        /*if (selectedEvent) {
            DispatchCalEvents({type:"update",payload:calendarEvents})
        } else {
            DispatchCalEvents({type:"push",payload:calendarEvents})
        }*/

        // DispatchCalEvents({type:"push",payload:calendarEvents})
        setselectedEvent(null)
        // DispatchCalEvents({type:"push",payload:calenderEvents})
        // DispatchCalEvents({type:"push",payload:CalendarEvents})
        setshowEventModal(false)

        setEventList([...eventList,result.data.data.event])
    }
    const handleDelte = (event)=>{
        DispatchCalEvents({type:"delete",payload:event})
        setshowEventModal(false)
        setselectedEvent(null)
    }

    const toggle =()=>{
        if(!reminder){
            setToggleCss('translate-x-5')
            setreminder(true)
        }else{
            setToggleCss('translate-x-0')
            setreminder(false)
        }
    }

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <div className='bg-white rounded-lg shadow-2xl w-1/4 h-3/4 '>
            <header className='bg-gray-100 px-4 py-2 flex justify-between'>
                <div className='flex justify-between'>
                    <button onClick={()=>{setshowEventModal(false);setselectedEvent(null)}} className='mr-2'>
                        <span className='material-icons-outline text-gray-100'>
                            <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" alt="Close Modal"  className='w-7 h-7'/>
                        </span>
                    </button>
                    <p className='text-xl text-gray-900 mt-1'> {`${selectedEvent ? 'Edit' : 'Create'}`} Event</p>
                </div>
                {
                    selectedEvent &&
                    <button onClick={()=>{handleDelte(selectedEvent)}}>
                        <span className='material-icons-outline text-gray-100'>
                            <img src="https://www.freeiconspng.com/thumbs/remove-icon-png/remove-icon-png-26.png" alt="trash icon"  className='w-7 h-7'/>
                        </span>
                    </button>
                }
            </header>
            <div className='p-3 h-3/4 overflow-auto'>
                <div className='grid grid-cols-1/5 items-end gap-y-7'>
                    <span className='material-icons-outline text-gray-100 p-1'>
                        <img src={titleIcon} alt="title icon"  className='relative top-3 right-1'/>
                    </span>

                    <input type="text" name="title" placeholder='Add Title' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={title} onChange={(e)=>setTitle(e.target.value)}/>

                    <span className='material-icons-outline text-gray-100 mb-6'>
                        <img src="https://w7.pngwing.com/pngs/405/546/png-transparent-job-description-computer-icons-employment-business-handbook-miscellaneous-text-service-thumbnail.png" alt="description"  className='w-7 h-7'/>
                    </span>

                    <textarea type="text" name="description" placeholder='Description' className='border-0 pt-3 text-gray-600 font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

                    <span className='material-icons-outline text-gray-100'>
                        <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678120-calendar-clock-512.png" alt="start time icon"  className='w-7 h-7'/>
                    </span>

                    <p className='font-medium text-lg'>{clickDay.format("dddd, MMMM, DD")}</p>
                    <span className='material-icons-outline text-gray-100'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZOiUxzAlBLD8olJjdSvxccaH6hMHE5QGZA&usqp=CAU" alt="stop watch icon"  className='w-7 h-7'/>
                    </span>

                    <input type="time" name="title" placeholder='Start Time' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={starttime} onChange={(e)=>setstarttime(e.target.value)}/>
                    <span className='material-icons-outline text-gray-100'>

                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Out_of_date_clock_icon.svg/1024px-Out_of_date_clock_icon.svg.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>
                    <input type="time" name="title" placeholder='End Time' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={endtime} onChange={(e)=>setEndtime(e.target.value)}/>
                    <span className='material-icons-outline text-gray-100'>

                    <img src="https://cdn-icons-png.flaticon.com/512/1455/1455306.png" alt="Close Modal"  className='w-7 h-7 mb-2'/>
                    </span>
                    <select name="timezone" className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={timezone} onChange={(e)=>setTimezone(e.target.value)}>
                    <option value={null}>Select Timezone</option>
                    <option value={'Asia/Kolkata'}>Asia/Kolkata</option>
                    </select>

                </div>
                <div className="flex my-5 justify-between">
                    <button type="button" className={`bg-${reminder?'purple-500':'gray-500 '} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`} role="switch" aria-checked="false" aria-labelledby="annual-billing-label" onClick={toggle}>
                        <span aria-hidden="true" className={`${toggleCss} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                    </button>
                    <span className="ml-3" id="annual-billing-label">
                        <span className="text-md font-normal text-gray-900">Remind (Default:10 Mins Before)</span>
                    </span>
                </div>
                <div className='flex my-5'>
                    {
                        labelCssClasses.map((lbl,i)=>(
                            <span key={i}
                            onClick={()=>{setLabel(lbl)}}
                            className={`${label === lbl ? 'border-black border-2' : '' } bg-${lbl}-500 w-7 h-7 rounded flex items-center justify-center cursor-pointer mx-1 hover:rounded-l hover:border-2 hover:border-black`}
                            >
                                { label === lbl && <TiTick className='w-7 h-7 text-gray-900'/>}
                            </span>
                        ))
                    }
                </div>
            </div>
            <footer className='flex w-100 justify-end p-3 mt-5 border-t'>
                <button  onClick={HandleSubmit} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-bold">
                {`${selectedEvent ? 'Update' : 'Save'}`} Event
                </button>
            </footer>

        </div>
    </div>
  )
}

export default EventModal
