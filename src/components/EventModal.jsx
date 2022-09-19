import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { TiTick } from "react-icons/ti"
import titleIcon from '../assets/images/tag.png'
import { toast } from 'react-toastify';
import { loadEvents, loadUsers, getTimezonesList, eventSent, eventDelete } from '../utilities/util'
import Select from 'react-select';
import ToastBody from './ToastBody'
import { IoColorPalette } from 'react-icons/io5'
import dayjs from 'dayjs';


function EventModal() {
    const {
        setShowEventModal,
        clickDay,
        DispatchCalEvents,
        selectedEvent,
        setSelectedEvent,
        setEventList,
        monthIndex,
        setPopupToggle,
        setPopupContent,
        setPopupFooter,
        labelCssClasses,
        eventCssClass,
        paletteCssClass,
    } = useContext(GlobalContext)

    const [title,setTitle] = useState(selectedEvent && selectedEvent?.summary ? selectedEvent.summary : "")
    const [description,setDescription] = useState(selectedEvent && selectedEvent?.description ? selectedEvent.description: "")
    const [endTime,setEndTime] = useState(selectedEvent && selectedEvent?.end_time? dayjs(selectedEvent.end_datetime).format("HH:mm").toString() : "")
    const [startTime,setStartTime] = useState(selectedEvent && selectedEvent?.start_time ? dayjs(selectedEvent.start_datetime).format("HH:mm").toString() : "")
    const [timezone,setTimezone] = useState(selectedEvent && selectedEvent?.timezone ? {name: selectedEvent.timezone, label: selectedEvent.timezone} : undefined)
    const [reminder,setReminder] = useState(selectedEvent && (selectedEvent?.remind_before_in_mins === 10) ? true : false)
    const [label,setLabel] = useState(selectedEvent && (selectedEvent?.event_label) ? selectedEvent.event_label : labelCssClasses[0])
    const [toggleCss,setToggleCss] = useState(selectedEvent && (selectedEvent?.remind_before_in_mins === 10) ? 'translate-x-5' :  'translate-x-0')
    const [dropdownLoading,setDropdownLoading] = useState(true)
    const[userList, setUserList] = useState([])
    const[selectedUsers, setSelectedUsers] = useState(selectedEvent ? [...selectedEvent.attendees] : [])

    const[timezones, setTimezones] = useState([])
    const[toggleMenu, setToggleMenu] = useState(false)

    useEffect(() => {
        // get timezone list
        const timezoneList = getTimezonesList()
        setTimezones(timezoneList)

        // get user(attendees) list
        loadUsers().then((users) => {
            setUserList([...users])
            setDropdownLoading(false)
        }).catch((e) => {
            console.log(e)
            toast.error(<ToastBody title="Error" body="Unable to fetch User Lists. Try again later." type="error" />)
        })
    }, [])

    const ValidateField=(obj)=>{
        for (const key in obj) {
            const element = obj[key];
            if (!element && !['remind_before_in_mins', 'calendar_id'].includes(key)) {
                toast.error(<ToastBody
                    title={'Error'}
                    body={`Please fill the details ${key.toLocaleLowerCase()}!`}
                    type={'error'}
                />);

                return false
            }
        }

        return true
    }



    const HandleSubmit = async ()=>{

        const calendarEvent = {
            summary: title,
            description: description,
            location: timezone.name.split('/')[1],
            startTime:startTime,
            endTime:endTime,
            start_datetime: `${(selectedEvent && selectedEvent?.start_datetime ? dayjs(selectedEvent.start_datetime).format("YYYY-MM-DD").toString() : clickDay.format("YYYY-MM-DD").toString())}T${startTime}:00`,
            end_datetime: `${(selectedEvent && selectedEvent?.end_datetime ? dayjs(selectedEvent.end_datetime).format("YYYY-MM-DD").toString() : clickDay.format("YYYY-MM-DD").toString())}T${endTime}:00`,
            timezone: timezone.name,
            attendees: selectedUsers,
            remind_before_in_mins: reminder ? 10 : 0,
            event_label: label,
        }

        if (!ValidateField(calendarEvent)) {
            return
        }

        const dates = {
            start_date: dayjs().month(monthIndex).date(1).format('YYYY-MM-DD').toString(),
            end_date: dayjs().month(monthIndex + 1).date(1).subtract(1, 'day').format('YYYY-MM-DD').toString()
        }

        if (selectedEvent) {
            if (selectedEvent.attendees.length === 0) {
                toast.error(<ToastBody
                    title={'Error'}
                    body={'Please add the attendees.'}
                    type={'error'}
                />);
                return
            }
            try {
                calendarEvent.calendar_id = selectedEvent.calendar_id
                const popupFooter = {
                    confirm: {
                        confirmText: 'OK',
                        customCss: "bg-white text-gray-900 hover:bg-gray-300",
                        onConfirm: async () => {
                            setSelectedEvent(null)
                            setShowEventModal(false)
                            await eventSent(calendarEvent)

                            try {
                                const { events } = await loadEvents(dates)
                                setEventList([...events])
                                toast.success(<ToastBody
                                    title={'Success'}
                                    body={'Event updated successfully!'}
                                    type={'success'}
                                />);
                            } catch (e) {
                                toast.error(<ToastBody
                                    title="Error"
                                    body="Unable to fetch event lists! Try again later."
                                    type="error"
                                    />)
                                return
                            }
                        }
                    },
                }
                setPopupFooter(popupFooter)
                setPopupContent('Do you want to update this event ?')
                setPopupToggle((prevToggle) => !prevToggle)
            } catch (e) {
                toast.error(<ToastBody
                    title={'Error'}
                    body={'Failed to update an event! Try again later.'}
                    type={'error'}
                />);
                return
            }
        } else {
            if (selectedUsers.length === 0) {
                toast.error(<ToastBody
                    title={'Error'}
                    body={'Please add the attendees.'}
                    type={'error'}
                />);
                return
            }

            try {
                const popupFooter = {
                    confirm: {
                        confirmText: 'OK',
                        customCss: "bg-white text-gray-900 hover:bg-gray-300",
                        onConfirm: async () => {
                            setSelectedEvent(null)
                            setShowEventModal(false)
                            await eventSent(calendarEvent)

                            try {
                                const { events } = await loadEvents(dates)
                                setEventList([...events])
                                toast.success(<ToastBody
                                    title={'Success'}
                                    body={'Event created successfully!'}
                                    type={'success'}
                                />);
                            } catch (e) {
                                toast.error(<ToastBody
                                    title="Error"
                                    body="Unable to fetch event lists! Try again later."
                                    type="error"
                                    />)
                                return
                            }
                        }
                    },
                }
                setPopupFooter(popupFooter)
                setPopupContent('Do you want to create this event ?')
                setPopupToggle((prevToggle) => !prevToggle)
            } catch (e) {
                toast.error(<ToastBody
                    title={'Error'}
                    body={'Failed to create an existing event! Try again later.'}
                    type={'error'}
                />);
                return
            }
        }
    }

    const deleteEvent = async (event) => {
        try {
            await eventDelete(event)
        } catch (e) {
            toast.error(<ToastBody
                title={'Error'}
                body={'Failed to delete an event! Try again later.'}
                type={'error'}
            />);
            return
        }

        try {
            const dates = {
                start_date: dayjs().month(monthIndex).date(1).format('YYYY-MM-DD').toString(),
                end_date: dayjs().month(monthIndex + 1).date(1).subtract(1, 'day').format('YYYY-MM-DD').toString()
            }
            const { events } = await loadEvents(dates)
            setEventList([...events])
            toast.success(<ToastBody
                title={'Success'}
                body={'Event Deleted successfully!'}
                type={'success'}
            />);
        } catch (e) {
            toast.error(<ToastBody
                title="Error"
                body="Unable to fetch event lists! Try again later."
                type="error"
                />)
            return
        }

        DispatchCalEvents({type:"delete", payload:event})
        setShowEventModal(false)
        setSelectedEvent(null)
    }

    const handleEventDelete = (event)=>{
        const popupFooter = {
            confirm: {
                confirmText: 'OK',
                customCss: "bg-white text-gray-900 hover:bg-gray-300",
                onConfirm: () => {
                    deleteEvent(event)
                }
            },
        }
        setPopupFooter(popupFooter)
        setPopupContent('Deleting this event will remove it from your schedule. Do you still want to proceed ?')
        setPopupToggle((prevToggle) => !prevToggle)
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


  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <div className='bg-white rounded-lg shadow-2xl w-4/12 h-5/6'>
            <header className='bg-gray-100 px-4 py-2 flex justify-between'>
            <div className='flex justify-between'>
                    <button onClick={()=>{setShowEventModal(false);setSelectedEvent(null)}} className='mr-2'>
                        <span className='material-icons-outline text-gray-100'>
                            <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" alt="Close Modal"  className='w-7 h-7'/>
                        </span>
                    </button>
                    <p className='text-xl text-gray-900 mt-1'> {`${selectedEvent ? 'Edit' : 'Create'}`} Event</p>
                </div>
                {
                    selectedEvent &&
                    <button onClick={()=>{handleEventDelete(selectedEvent)}}>
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
                        <IoColorPalette className={`w-8 h-8 ${paletteCssClass[label]}`}/>
                    </p>
                    <div className='col-span-8 w-9/12 justify-self-end self-center'>
                        <div className='flex justify-evenly'>
                        {
                            labelCssClasses.map((lbl,i)=>(
                                <span key={i}
                                onClick={()=>{setLabel(lbl)}}
                                className={`${eventCssClass[label] === eventCssClass[lbl] ? 'border-black border-2' : '' } ${eventCssClass[lbl]} w-7 h-7 rounded flex items-center justify-center cursor-pointer mx-1 hover:rounded-l hover:border-2 hover:border-black`}
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
                        menuIsOpen={toggleMenu}
                        closeMenuOnSelect={false}
                        onMenuOpen={() => {  setToggleMenu(true)}}
                        onMenuClose={() => { setToggleMenu(false)} }
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
