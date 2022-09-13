import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { HiPencilAlt } from "react-icons/hi";

function EventModal() {
    const {setshowEventModal,clickDay,DispatchCalEvents,selectedEvent } = useContext(GlobalContext)
    // const labelsclass = ["bg-lime-500","bg-gray-500","bg-green-500","bg-blue-500","bg-red-500","bg-purple-500"]
    const labelsclass = ["lime", "red", "green", "gray", "blue", "purple"]
    const [title,settitle] =useState(selectedEvent?selectedEvent.title:"")
    const [desc,setdesc] =useState(selectedEvent?selectedEvent.desc:"")
    const [label,setclicklebel] =useState(labelsclass[0])
    const [activeHover,setActiveHover] =useState(undefined)

    const HandleSubmit = ()=>{

        const calenderEvents={
            title:title,
            desc:desc,
            label:label,
            day:clickDay.valueOf(),
            id: selectedEvent? selectedEvent.id:Date.now()

        }

        if (selectedEvent) {
            DispatchCalEvents({type:"update",payload:calenderEvents})
        }else{
            DispatchCalEvents({type:"push",payload:calenderEvents})
        }

        // DispatchCalEvents({type:"push",payload:calenderEvents})
        setshowEventModal(false)
    }
    const handleDelte = (event)=>{
        DispatchCalEvents({type:"delete",payload:event})
        setshowEventModal(false)
    }

    const setHoverLabel = (i) => {
        setActiveHover(i)
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
                    <input type="text" name="title" placeholder='Add Title' className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={title} onChange={(e)=>settitle(e.target.value)}/>

                    <span className='material-icons-outline text-gray-100'>
                    <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678120-calendar-clock-512.png" alt="Close Modal"  className='w-7 h-7'/>

                </span>
                <p className='font-bold'>{clickDay.format("dddd,MMMM,DD")}</p>

                <span className='material-icons-outline text-gray-100'>
                {/* https://w7.pngwing.com/pngs/321/444/png-transparent-education-organization-foundation-pedagogy-description-icon-angle-user-interface-design-text.png */}
                <img src="https://w7.pngwing.com/pngs/405/546/png-transparent-job-description-computer-icons-employment-business-handbook-miscellaneous-text-service-thumbnail.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                <input type="text" name="description" placeholder='Description' className='border-0 pt-3 text-gray-600 font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus-border-blue-500' value={desc} onChange={(e)=>setdesc(e.target.value)}/>
                <span className='material-icons-outline text-gray-100'>
                {/* https://w7.pngwing.com/pngs/321/444/png-transparent-education-organization-foundation-pedagogy-description-icon-angle-user-interface-design-text.png */}
                <img src="https://cdn.iconscout.com/icon/free/png-256/bookmark-1754138-1493251.png" alt="Close Modal"  className='w-7 h-7'/>
                </span>
                <div className='flex gap-x-2'>
                    {
                        labelsclass.map((lbl,i)=>(
                            <span key={i}
                            onClick={()=>{setclicklebel(lbl)}}
                            onMouseOver={() => setHoverLabel(i)}
                            className={`bg-${lbl}-500 w-7 h-7 rounded flex items-center justify-center cursor-pointer mx-1 ${activeHover === i ? 'p-2 rounded-l ring-2 ring-black' : null}`}
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
