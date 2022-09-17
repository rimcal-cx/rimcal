import React, { useCallback, useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { TiTick } from "react-icons/ti"
import axios from 'axios'
import titleIcon from '../assets/images/tag.png'
import UserModal from './ComponentWrapper/UserModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadEvents } from '../utilities/util'
function EventModal() {
    const {
        setshowEventModal,
        clickDay,
        userModal,
        selctedUsers,
        golbalSlectedUsers,
        DispatchCalEvents,
        selectedEvent,
        setselectedEvent,
        setEventList,
        eventList,
        visbisltyUser
    } = useContext(GlobalContext)

    const [title,setTitle] = useState(selectedEvent?selectedEvent.title:"")
    const [description,setDescription] =useState(selectedEvent?selectedEvent.description:"")
    const [endTime,setEndTime] =useState(selectedEvent?selectedEvent.end_time:"")
    const [startTime,setStartTime] =useState(selectedEvent?selectedEvent.start_time:"")
    const [timezone,setTimezone] =useState(selectedEvent?selectedEvent.timezone:"")
    const [reminder,setReminder] =useState(selectedEvent?selectedEvent.reminder:false)
    const labelCssClasses = ["lime", "red", "green", "gray", "blue", "purple"]
    const [label,setLabel] = useState(labelCssClasses[0])
    const [toggleCss,setToggleCss]= useState('translate-x-0')

    const DeletedUser = useCallback((i)=>{
        selectedEvent.attendees.splice(i,1)
        console.log(selectedEvent.attendees);
        setselectedEvent(selectedEvent)
        console.log(selectedEvent);
    }, [])

    const ValidateField=(obj)=>{

        for (const key in obj) {

                const element = obj[key];

                if (!element && key!=='calendar_id' & key!=='all_day') {

                    toast.error('Please fill '+key.toLocaleLowerCase()+'!', {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    return false
                }

        }
    }

    useEffect(()=>{

    },[eventList])



    const HandleSubmit = async ()=>{


        console.log(selectedEvent);
        const calendarEvents = {
            calendar_id: null,
            summary: title,
            description: description,
            location: 'Kolkata',
            startTime:startTime,
            endTime:endTime,
            start_datetime: selectedEvent?selectedEvent.start_datetime:clickDay.format("YYYY-MM-DD").toString()+"T"+startTime+":00",
            end_datetime: selectedEvent?selectedEvent.end_datetime:clickDay.format("YYYY-MM-DD").toString()+"T"+endTime+":00",
            timezone: timezone,
            all_day: false,
            attendees:selectedEvent?(selectedEvent.attendees):selctedUsers,
            remind_before_in_mins: 10
        }



        console.log(selctedUsers)

        // Save to local storage
        if (selectedEvent) {
            ValidateField(calendarEvents)
            if (selectedEvent.attendees.length===0) {
                toast.error('Please select user', {
                    position: toast.POSITION.TOP_RIGHT
                });
                return
            }

            calendarEvents.calendar_id =selectedEvent.calendar_id
            await (axios.post('calendar/add', {...calendarEvents} ))
            const { events } = await loadEvents()
            setEventList([...events])
            toast.success('Event Updated  Succesfully !', {
                position: toast.POSITION.TOP_RIGHT
            });

        } else {
            ValidateField(calendarEvents)
            if (selctedUsers.length===0) {
                toast.error('Please select user', {
                    position: toast.POSITION.TOP_RIGHT
                });
                return
            }

            const { event } = await (await (axios.post('calendar/add', {...calendarEvents} ))).data.data
            setEventList([...eventList, event])
            toast.success('Event Added Succesfully !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        // DispatchCalEvents({type:"push",payload:calendarEvents})
        setselectedEvent(null)
        // DispatchCalEvents({type:"push",payload:calenderEvents})
        // DispatchCalEvents({type:"push",payload:CalendarEvents})
        setshowEventModal(false)
        golbalSlectedUsers([])

    }
    const handleDelte = async(event)=>{

        await (axios.delete(`calendar/${event.calendar_id}`))
        const { events } = await loadEvents()
        setEventList([...events])
        DispatchCalEvents({type:"delete", payload:event})
        setshowEventModal(false)
        setselectedEvent(null)
        toast.success('Event Deleted Succesfully !', {
            position: toast.POSITION.TOP_RIGHT
        });

    }

    const toggle =()=>{
        if(!reminder){
            setToggleCss('translate-x-5')
            setReminder(true)
        }else{
            setToggleCss('translate-x-0')
            setReminder(false)
        }
    }


    useEffect(()=>{

    },[DeletedUser])


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
                            <img src="https://www.freeiconspng.com/thumbs/remove-icon-png/remove-icon-png-26.png" alt="Close Modal"  className='w-7 h-7'/>
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
                        <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678120-calendar-clock-512.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>

                    <p className='font-medium text-lg'>{clickDay.format("dddd, MMMM, DD")}</p>
                    <span className='material-icons-outline text-gray-100'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZOiUxzAlBLD8olJjdSvxccaH6hMHE5QGZA&usqp=CAU" alt="Close Modal"  className='w-7 h-7'/>
                    </span>

                    <input type="time" name="title" placeholder='Start Time' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
                    <span className='material-icons-outline text-gray-100'>

                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Out_of_date_clock_icon.svg/1024px-Out_of_date_clock_icon.svg.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>
                    <input type="time" name="title" placeholder='End Time' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' min={startTime} value={endTime} onChange={(e)=>setEndTime(e.target.value)}/>
                    <span className='material-icons-outline text-gray-100'>

                    <img src="https://cdn-icons-png.flaticon.com/512/1455/1455306.png" alt="Close Modal"  className='w-7 h-7 mb-2'/>
                    </span>
                    <select name="timezone" className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={timezone} onChange={(e)=>setTimezone(e.target.value)}>
                    <option value={null}>Select Timezone</option>
                    <option value={'Asia/Kolkata'}>Asia/Kolkata</option>
                    </select>

                    {userModal &&  <UserModal/>}
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

                <div className=' mt-5 items-center w-96'>
                <button className=' w-96 border hover:bg-red-200 rounded py-2 px-4 ml-5' onClick={()=>visbisltyUser(true)}>
                    Select User
                    </button>
                </div>
                <div>
                <h6 className='mt-2 bg-red-200'>
               &nbsp;&nbsp;Selected Users
                </h6>
                </div>
                {
                   selctedUsers&& selctedUsers.map((user,i)=>
                        <div className=' mt-1 items-center w-96'>
                        <button className=' w-96 border hover:bg-blue-200 rounded py-2 px-4 ml-5' >
                        {user.name}
                        </button>

                        </div>
                    )
                }
                {
                   selectedEvent&& selectedEvent.attendees.map((user,i)=>
                        <div className=' mt-1 items-center w-96'>
                        <button className=' w-96 border hover:bg-blue-200 rounded py-2 px-4 ml-5' >
                        {user.name}
                        <span onClick={()=>DeletedUser(i)} >
                        <img className='h-7 w-7' src="https://toppng.com/uploads/preview/edit-delete-icon-delete-icon-11553444925vxge0bju5o.png" alt=""/>
                        </span>
                        </button>
                        <ToastContainer />
                        </div>
                    )
                }
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
