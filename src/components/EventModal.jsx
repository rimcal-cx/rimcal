import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { HiPencilAlt } from "react-icons/hi";

function EventModal() {
    const {setshowEventModal,clickDay,DispatchCalEvents,selectedEvent,setselectedEvent} = useContext(GlobalContext)
    // const labelsclass = ["bg-lime-500","bg-gray-500","bg-green-500","bg-blue-500","bg-red-500","bg-purple-500"]
    const labelsclass = ["lime", "red", "green", "gray", "blue", "purple"]
    const [title,settitle] =useState(selectedEvent?selectedEvent.title:"")
    const [desc,setdesc] =useState(selectedEvent?selectedEvent.desc:"")
    const [location,setlocation] =useState(selectedEvent?selectedEvent.location:"")
    const [endtime,setEndtime] =useState(selectedEvent?selectedEvent.endtime:"")
    const [starttime,setstarttime] =useState(selectedEvent?selectedEvent.starttime:"")
    const [timezone,setTimezone] =useState(selectedEvent?selectedEvent.starttime:"")
    const [reminder,setreminder] =useState(selectedEvent?selectedEvent.reminder:false)
    const [dynocss,setdynocss]= useState(0)
    const [label,setclicklebel] =useState(labelsclass[0])

    const HandleSubmit = ()=>{

        const CalendarEvents={
            title:title,
            desc:desc,
            label:label,
            location:location,
            day:clickDay.valueOf(),
            reminder:reminder,
            endtime:endtime,
            dynocss:dynocss,
            timezone:timezone,
            id: selectedEvent? selectedEvent.id:Date.now()

        }

        if (selectedEvent) {
            DispatchCalEvents({type:"update",payload:CalendarEvents})
        }else{
            DispatchCalEvents({type:"push",payload:CalendarEvents})
        }

        setselectedEvent(null)
        // DispatchCalEvents({type:"push",payload:calenderEvents})
        // DispatchCalEvents({type:"push",payload:CalendarEvents})
        setshowEventModal(false)
    }
    const handleDelte = (event)=>{
        DispatchCalEvents({type:"delete",payload:event})
        setshowEventModal(false)
        setselectedEvent(null)
    }

    const toggle =()=>{

        if(!reminder){
            setdynocss(5)
            setreminder(true)
        }else{
            setdynocss(0)
            setreminder(false)
        }
    }

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <div className='bg-white rounded-lg shadow-2xl w-1/4 h-3/4 '>
            <header className='bg-gray-100 px-4 py-2 flex justify-between'>
            {/* <span className='material-icons-outline text-gray-100'>
                    <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" alt="" srcset="" className='w-7 h-7'/>
                </span> */}
                <button onClick={()=>{setshowEventModal(false);setselectedEvent(null)}}>
                <span className='material-icons-outline text-gray-100'>
                    <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                </button>
                {selectedEvent &&
                <button onClick={()=>{handleDelte(selectedEvent)}}>
                <span className='material-icons-outline text-gray-100'>
                    <img src="https://www.freeiconspng.com/thumbs/remove-icon-png/remove-icon-png-26.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                </button>}
            </header>
            <div className='p-3 h-3/4 overflow-auto'>
                <div className='grid grid-cols-1/5 items-end gap-y-7'>
                    <div></div>
                    <input type="text" name="title" placeholder='Add Summary' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={title} onChange={(e)=>settitle(e.target.value)}/>


                <span className='material-icons-outline text-gray-100'>

                <img src="https://w7.pngwing.com/pngs/405/546/png-transparent-job-description-computer-icons-employment-business-handbook-miscellaneous-text-service-thumbnail.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                <textarea type="text" name="description" placeholder='Description' className='border-0 pt-3 text-gray-600 font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={desc} onChange={(e)=>setdesc(e.target.value)}></textarea>

                <span className='material-icons-outline text-gray-100'>

                    <img src="https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                    <input type="text" name="title" placeholder='Add location' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={location} onChange={(e)=>setlocation(e.target.value)}/>


                    <span className='material-icons-outline text-gray-100'>
                    <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678120-calendar-clock-512.png" alt="Close Modal"  className='w-7 h-7'/>

                </span>
                <p className='font-medium'>{clickDay.format("dddd, MMMM, DD")}</p>
                    <span className='material-icons-outline text-gray-100'>

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZOiUxzAlBLD8olJjdSvxccaH6hMHE5QGZA&usqp=CAU" alt="Close Modal"  className='w-7 h-7'/>
                    </span>
                    <input type="time" name="title" placeholder='Start Time' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={starttime} onChange={(e)=>setstarttime(e.target.value)}/>
                    <span className='material-icons-outline text-gray-100'>

                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Out_of_date_clock_icon.svg/1024px-Out_of_date_clock_icon.svg.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>
                    <input type="time" name="title" placeholder='End Time' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={endtime} onChange={(e)=>setEndtime(e.target.value)}/>
                    <span className='material-icons-outline text-gray-100'>

                    <img src="https://cdn-icons-png.flaticon.com/512/1455/1455306.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>
                    <select type="time" name="title" placeholder='End Time' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={timezone} onChange={(e)=>setTimezone(e.target.value)}>
                    <option>Select Timezone</option>
                    <option>Asia/Kolkata</option>
                    <option>Z-A</option>
                    </select>
                    <span className='material-icons-outline text-gray-100'>

                    <img src="https://img.favpng.com/25/22/25/remarketing-how-you-remind-me-behavioral-retargeting-facebook-messenger-png-favpng-MZJpSj9YwP3H6Gb8Js7T26DRj.jpg" alt="Close Modal"  className='w-7 h-7'/>
                    </span>

<div class="flex items-center">
  <button type="button" class={`bg-${reminder?'purple-500':'gray-500 '} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`} role="switch" aria-checked="false" aria-labelledby="annual-billing-label" onClick={toggle}>

    <span aria-hidden="true" class={`translate-x-${dynocss} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
  </button>
  <span class="ml-3" id="annual-billing-label">
    <span class="text-sm font-normal text-gray-900">Remind (Default:10 Mins Before)</span>
  </span>
</div>



                {/* <span className='material-icons-outline text-gray-100'>

                <img src="https://cdn.iconscout.com/icon/free/png-256/bookmark-1754138-1493251.png" alt="Close Modal"  className='w-7 h-7'/>
                </span> */}
                {/* <div className='flex gap-x-2'>
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
                </div> */}
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
