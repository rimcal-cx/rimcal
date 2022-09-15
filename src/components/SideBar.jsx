import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'

function SideBar() {
  return (
    <aside className='border p-5 w-64'>
      <CreateEventButton/>
      <SmallCalendar/>
    </aside>
  )
}

export default SideBar
