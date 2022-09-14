import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalender from './SmallCalender'

function SideBar() {
  return (
    <aside className='border p-5 w-64'>
      <CreateEventButton/>
      <SmallCalender/>
    </aside>
  )
}

export default SideBar