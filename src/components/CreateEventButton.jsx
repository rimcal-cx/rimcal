import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

function CreateEventButton() {
  const { setshowEventModal } = useContext(GlobalContext)
  return (
    <button onClick={()=>{setshowEventModal(true)}} className='border p-2 rounded-full flex item-center shadow-md hover:shadow'>
        <img src="https://cdn-icons-png.flaticon.com/512/1250/1250151.png" alt="event_create" className='w-7 h-7' />
    <span className='pl-3 pr-7'>
    Create Event
    </span>
    </button>
  )
}

export default CreateEventButton