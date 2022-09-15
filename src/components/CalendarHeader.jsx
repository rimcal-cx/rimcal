import axios from 'axios';
import dayjs from 'dayjs';
import React, { useContext } from 'react'
import { useAuth } from '../context/AuthContext'
import GlobalContext from '../context/GlobalContext';

function CalendarHeader() {
  const { logout: authLogout } = useAuth()

  const { monthIndex, setMonthIndex } = useContext(GlobalContext)

  const prevChange=()=>{
    setMonthIndex(monthIndex-1)
  }
  const nextChange=()=>{
    setMonthIndex(monthIndex+1)
  }
  const reset=()=>{
    setMonthIndex(monthIndex === dayjs().month()?monthIndex+Math.random():dayjs().month())
  }

  const logout=async ()=>{
    const {status} =  await axios.post('google/logout')

    if (status === 200) {
        authLogout()
    }

  }
  return (
    <header className='w-full px-2 py-4 flex items-center justify-between'>
        <div className='flex justify-start'>
            <img src="https://assets-global.website-files.com/6141b0efd8e31331808ba8a4/6141eab29483d621180040d1_Logo%20Dark.svg" alt="" className='mr-2 w-14 '/>
            <div className="flex justify-center">
                <button onClick={reset} className='border rounded py-2 px-4 ml-5  hover:bg-gray-100'>
                    Today
                </button>
                <button className='border rounded py-2 px-4 ml-5 hover:bg-gray-100' onClick={prevChange}>
                    Previous
                </button>
                <button className='border rounded py-2 px-4 ml-5 hover:bg-gray-100' onClick={nextChange}>
                    Next
                </button>
            </div>
            <h2 className='ml-4 text-2xl text-grey-500 font-bold mt-1 tracking-widest'>
                {dayjs(new Date(dayjs().year(),monthIndex)).format("MMMM, YYYY")}
            </h2>
        </div>
        <button className='border hover:bg-red-200 rounded py-2 px-4 mr-3' onClick={logout}>
            Logout
        </button>
    </header>
  )
}

export default CalendarHeader
