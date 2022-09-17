import dayjs from 'dayjs';
import React, { useContext, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import { logout as logoutUser, syncCalendar } from '../utilities/util'
import ToastBody from './ToastBody'

import GlobalContext from '../context/GlobalContext';
function CalendarHeader() {
  const { logout: authLogout } = useAuth()

  const { monthIndex, setMonthIndex } = useContext(GlobalContext)
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

  const logout = async ()=>{
    try {
        const {status} =  await logoutUser()
        if (status === 200) {
            authLogout()
            toast.success(
                <ToastBody
                    title="Success"
                    body="Logout Successfully!"
                    type="success"
                />
            );
        }
    } catch (e) {
        toast.error(<ToastBody title="Error" body="Logout Failed." type="error" />)
    }

  }

  const sync = async ()=>{
    const dates = {
        start_date: start_date,
        end_date: end_date
    }
    setShowModal(false)

    toast.promise(
        syncCalendar(dates),
        {
          pending: {
            render(){
              return "Syncing in progress..."
            },
            icon: true,
          },
          success: {
            render({data}){
                return (<ToastBody
                            title="Success"
                            body="Syncing Completed Successfully!"
                            type="success"
                        />);
            },
            // other options
          },
          error: {
            render({data}){
              // When the promise reject, data will contains the error
              return (<ToastBody
                        title="Error"
                        body="Syncing Failed."
                        type="error"
                    />);
            }
          }
        }
    )
  }
  return (
    <header className='px-2 py-4 flex items-center justify-between'>
        <div className='flex justify-start'>
            <img src="logo-name.png" alt="" className='mr-2 w-14 '/>
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
            <button
                className="border hover:bg-green-200 rounded py-2 px-4 ml-5"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Sync
            </button>
        </div>
        <button className='border hover:bg-red-200 rounded py-2 px-4 mr-3' onClick={logout}>
            Logout
        </button>



      { showModal && (
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
      )}
      </header>

  )
}

export default CalendarHeader
