import axios from 'axios';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';

// import { AiFillCaretRight,AiFillCaretLeft } from "react-icons/ai";
import GlobalContext from '../context/GlobalContext';
import UserModal from './ComponentWrapper/UserModal';
function CalendarHeader() {
  const { logout: authLogout,token } = useAuth()

  const {monthIndex,setMonthIndex,db_data,setDbdata,visbisltyUser,userModal} = useContext(GlobalContext)

  axios.defaults.headers = {
    ...axios.defaults.headers,
    'Authorization': `Bearer ${token.token}`
}

  const loadEvents =async ()=>{
    const result = await (await axios.get('calendar'))
    setDbdata(result.data.data.events)
    return result.data.data.events ;
}

useEffect(()=>{;
    const x= loadEvents().then(result=> setDbdata(result)).catch()
    console.log(db_data);
},[])

  const [start_date, setSyncStartDate] = useState("", "")
  const [end_date, setSyncEndDate] = useState("", "")
  const [showModal, setShowModal] = useState(false);
  const prevChange=()=>{
    setMonthIndex(monthIndex-1)
  }
  const nextChange=()=>{
    setMonthIndex(monthIndex+1)
  }
  const reset=()=>{
    setMonthIndex(monthIndex === dayjs().month()?monthIndex+Math.random():dayjs().month())
  }

  const logOut=async ()=>{
    const {status} =  await axios.post('google/logout')

    if (status === 200) {
        authLogout()
    }

  }

  const sync = async ()=>{
    const payload = {
        start_date: start_date,
        end_date: end_date
    }
    setShowModal(false)
    toast.success("Please wait a moment while processing...", {
        position: toast.POSITION.TOP_LEFT,
        toastId: 'login-id',
        autoClose: 2000,
      });
    const {status} =  await axios.post('calendar/sync', payload)
    if (status === 200) {
        toast.success("Sync Successful!", {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'login-id',
            autoClose: 2000,
          });
    }

  }
  return (
    <header className='px-2 py-4 flex items-center'>

     <img src="logo-name.png" alt="" className='mr-2 w-14 '/>
     <button onClick={reset} className='border rounded py-2 px-4 ml-5'>
      Today
     </button>
     <button className='border rounded py-2 px-4 ml-5' onClick={prevChange}>
      Previous
     </button>
     <button className='border rounded py-2 px-4 ml-5' onClick={nextChange}>
      Next
     </button>
     <h2 className='ml-4 text-xl text-grey-500 font-bold'>
        {dayjs(new Date(dayjs().year(),monthIndex)).format("MMMM YYYY")}
     </h2>
     <button className='border hover:bg-red-200 rounded py-2 px-4 ml-5' onClick={logOut}>
      Logout
     </button>
     <button
        className="border hover:bg-green-200 rounded py-2 px-4 ml-5"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Sync
      </button>
      { showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start text-blue-500 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Sync with Google
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Choose Start Date:
                    </label>
                    <input type="date" onChange = {e => {setSyncStartDate(e.target.value)}} required className="mb-2 shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <div></div>
                    <label className="block text-black text-sm font-bold mb-1">
                      Choose End Date:
                    </label>
                    <input type="date" onChange = {e => {setSyncEndDate(e.target.value)}}  required className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => sync()}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      </header>

  )
}

export default CalendarHeader
