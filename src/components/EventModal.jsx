import React, { useCallback, useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { TiTick } from "react-icons/ti"
import axios from 'axios'
import titleIcon from '../assets/images/tag.png'
import { toast } from 'react-toastify';
import { loadEvents, loadUsers, getTimezonesList } from '../utilities/util'
import Select from 'react-select';
import ToastBody from './ToastBody'
import { IoColorPalette } from 'react-icons/io5'


function EventModal() {
    const {
        setshowEventModal,
        clickDay,
        selctedUsers,
        golbalSlectedUsers,
        DispatchCalEvents,
        selectedEvent,
        setselectedEvent,
        setEventList,
        eventList,
    } = useContext(GlobalContext)

    const [title,setTitle] = useState(selectedEvent?selectedEvent.title:"")
    const [description,setDescription] =useState(selectedEvent?selectedEvent.description:"")
    const [endTime,setEndTime] =useState(selectedEvent?selectedEvent.end_time:"")
    const [startTime,setStartTime] =useState(selectedEvent?selectedEvent.start_time:"")
    const [timezone,setTimezone] =useState(selectedEvent?selectedEvent.timezone:"")
    const [reminder,setReminder] =useState(selectedEvent?selectedEvent.reminder:false)
    const labelCssClasses = ["lime", "red", "green", "gray", "blue", "purple"]
    const paletteCssClasses = {lime : "text-lime-500", red: "text-red-500", green: "text-green-500",gray: "text-gray-500", blue: "text-blue-500", purple: "text-purple-500"}
    const [label,setLabel] = useState(labelCssClasses[0])
    const [toggleCss,setToggleCss]= useState('translate-x-0')
    const [dropdownLoading,setDropdownLoading]= useState(true)
    const[userList, setUserList] = useState([])
    const[selectedUsers, setSelectedUsers] = useState([])
    const[timezones, setTimezones] = useState([])
    const[keepMenuOpen, setkeepMenuOpen] = useState(false)

    const DeletedUser = useCallback((i)=>{
        selectedEvent.attendees.splice(i,1)
        console.log(selectedEvent.attendees);
        setselectedEvent(selectedEvent)
        console.log(selectedEvent);
    }, [])

    useEffect(() => {
        const timezoneList = getTimezonesList()
        setTimezones(timezoneList)
    }, [])

    useEffect(() => {
        loadUsers().then((users) => {
            setUserList(users)
            setDropdownLoading(false)
        }).catch((e) => {
            console.log(e)
            toast.error(<ToastBody title="Error" body="Unable to fetch User Lists. Try again later." type="error" />)
        })
    }, [dropdownLoading])

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
        <div className='bg-white rounded-lg shadow-2xl w-4/12 h-5/6'>
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
            <div className='h-5/6 overflow-auto'>
                <div className='grid grid-cols-10 items-end gap-y-4 pr-3'>
                    <span className='col-span-2 material-icons-outline text-gray-100 place-self-center'>
                        <img src={titleIcon} alt="title icon"  className='w-9 h-9'/>
                    </span>
                    <input type="text" name="title" placeholder='Add Title' className='col-span-8 border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={title} onChange={(e)=>setTitle(e.target.value)}/>

                    <span className='col-span-2 material-icons-outline text-gray-100 place-self-center'>
                        <img src="https://w7.pngwing.com/pngs/405/546/png-transparent-job-description-computer-icons-employment-business-handbook-miscellaneous-text-service-thumbnail.png" alt="description"  className='w-7 h-7'/>
                    </span>
                    <textarea type="text" name="description" placeholder='Description' className='col-span-8 border-0 pt-3 text-gray-600 font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

                    <span className='col-span-2 material-icons-outline text-gray-100 p-3 place-self-center'>
                        <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678120-calendar-clock-512.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>

                    <p className='col-span-8 font-medium text-lg py-3'>{clickDay.format("dddd, MMMM, DD")}</p>

                    <span className='col-span-2 material-icons-outline text-gray-100 place-self-center'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZOiUxzAlBLD8olJjdSvxccaH6hMHE5QGZA&usqp=CAU" alt="Close Modal"  className='w-7 h-7'/>
                    </span>

                    <input type="time" name="title" placeholder='Start Time' className='col-span-8 border-0 text-gray-600 text-xl pb-2 font-semibold w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>

                    <span className='col-span-2 material-icons-outline text-gray-100 place-self-center'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Out_of_date_clock_icon.svg/1024px-Out_of_date_clock_icon.svg.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>
                    <input type="time" name="title" placeholder='End Time' className='col-span-8 border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' min={startTime} value={endTime} onChange={(e)=>setEndTime(e.target.value)}/>


                    <span className='col-span-2 material-icons-outline text-gray-100 place-self-center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/1455/1455306.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>

                    <div className='col-span-8 mx-auto items-center w-full pr-2'>
                        <Select
                            options={timezones}
                            onChange={setTimezone}
                            placeholder="Select Timezone"
                            value={timezone}
                            isSearchable={true}
                            isClearable={true}
                        />
                    </div>
                    <div className='col-span-2 mx-auto place-self-center'>
                        <button type="button" className={`bg-${reminder?'purple-500':'gray-500 '} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`} role="switch" aria-checked="false" aria-labelledby="annual-billing-label" onClick={toggle}>
                            <span aria-hidden="true" className={`${toggleCss} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                        </button>
                    </div>
                    <span className="col-span-8 text-right mr-2 mb-1" id="annual-billing-label">
                        <span className="text-md font-normal text-gray-900">Remind (Default:10 Mins Before)</span>
                    </span>

                    <p className='col-span-2 text-md font-medium text-gray-900 self-center justify-self-center'>
                        <IoColorPalette className={`w-8 h-8 ${paletteCssClasses[label]}`}/>
                    </p>
                    <div className='col-span-8 w-9/12 justify-self-end self-center'>
                        <div className='flex justify-evenly'>
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
                </div>

                <div className=' mx-auto my-5 h-fit items-center w-11/12'>
                    <Select
                        options={userList}
                        onChange={setSelectedUsers}
                        placeholder="Select Attendees"
                        value={selectedUsers}
                        isSearchable={true}
                        isMulti
                        isLoading={dropdownLoading}
                        getOptionLabel={(option) => option.name }
                        getOptionValue={(option) => option.id }
                        menuIsOpen={keepMenuOpen}
                        closeMenuOnSelect={false}
                        onMenuOpen={() => {  setkeepMenuOpen(true)}}
                        onMenuClose={() => { setkeepMenuOpen(false)} }
                        menuPlacement={'top'}
                    />
                </div>
            </div>
            <footer className='w-100 border-t bg-gray-100'>
                <div className='flex justify-end p-1 mr-2'>
                    <button  onClick={HandleSubmit} className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white font-bold">
                    {`${selectedEvent ? 'Update' : 'Save'}`} Event
                    </button>
                </div>
            </footer>
        </div>

    </div>
  )
}

export default EventModal
