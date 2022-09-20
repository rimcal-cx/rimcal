import dayjs from 'dayjs';
import React, { useContext, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import { logout as logoutUser, syncCalendar, loadEvents } from '../utilities/util'
import ToastBody from './ToastBody'
import logo from '../assets/images/logo-name.png'

import GlobalContext from '../context/GlobalContext';
function CalendarHeader() {
  const { logout: authLogout, user } = useAuth()

  const {
    monthIndex,
    setMonthIndex,
    setPopupContent,
    setPopupToggle,
    popupToggle,
    setPopupFooter,
    setEventList,
    setSyncToggle,
     } = useContext(GlobalContext)

  useEffect(() => {
    const dates = {
        start_date: dayjs().month(monthIndex).date(1).format('YYYY-MM-DD').toString(),
        end_date: dayjs().month(monthIndex + 1).date(1).subtract(1, 'day').format('YYYY-MM-DD').toString()
    }
    sync(dates)
  }, [])

  const prevChange = async () => {
    const dates = {
        start_date: dayjs().month(monthIndex - 1).date(1).format('YYYY-MM-DD').toString(),
        end_date: dayjs().month(monthIndex).date(1).subtract(1, 'day').format('YYYY-MM-DD').toString()
    }
    setMonthIndex(monthIndex - 1)
    setEventList([])
    await sync(dates)
  }

  const nextChange = async () => {
    const dates = {
        start_date: dayjs().set('month', (monthIndex + 1)).set('date', 1).format('YYYY-MM-DD').toString(),
        end_date: dayjs().set('month', (monthIndex + 2)).set('date', 1).subtract(1, 'day').format('YYYY-MM-DD').toString()
    }
    setMonthIndex(monthIndex + 1)
    setEventList([])
    await sync(dates)
  }

  const reset = async () => {
    const isSame = monthIndex === dayjs().month()
    const month =  isSame ? monthIndex : dayjs().month()
    setMonthIndex(month)
    if (!isSame) {
        setEventList([])
        const dates = {
            start_date: dayjs().set('month', (month - 1)).set('date', 1).format('YYYY-MM-DD').toString(),
            end_date: dayjs().set('month', (month)).set('date', 1).subtract(1, 'day').format('YYYY-MM-DD').toString()
        }
        await sync(dates)
    }
  }

  const logout = async ()=>{
    const popupFooter = {
        confirm: {
            confirmText: 'OK',
            customCss: "bg-white text-gray-900 hover:bg-gray-300",
            onConfirm: async () => {
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
        },
    }
    setPopupFooter(popupFooter)
    setPopupContent('Do you want to logout ?')
    setPopupToggle(!popupToggle)

  }

  const syncAndUpdateEvents = async (dates) => {
    await syncCalendar(dates)
    const {events} = await loadEvents(dates)
    setEventList(events)
    setPopupToggle((prevToggle) => !prevToggle)
    setSyncToggle((prevToggle) => !prevToggle)
  }

  const sync = async (dates) => {
    setSyncToggle((prevToggle) => !prevToggle)
    setPopupToggle((prevToggle) => !prevToggle)

    toast.promise(
        syncAndUpdateEvents(dates),
        {
          pending: {
            render(){
              return "Syncing in progress..."
            },
            icon: true,
          },
          error: {
            render({data}){
              // When the promise reject, data will contains the error
              setPopupToggle((prevToggle) => !prevToggle)
              setSyncToggle((prevToggle) => !prevToggle)
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
    <header className='w-full px-2 py-4 flex items-center justify-between'>
        <div className='w-6/12 flex justify-start'>
            <img src={logo} alt="" className='mr-2 w-14 '/>
            <div className="flex justify-center">
                <button className='border rounded py-2 px-4 ml-5 hover:bg-gray-100' onClick={prevChange}>
                    Previous
                </button>
                <button onClick={reset} className='border rounded py-2 px-4 ml-5  hover:bg-gray-100'>
                    Today
                </button>
                <button className='border rounded py-2 px-4 ml-5 hover:bg-gray-100' onClick={nextChange}>
                    Next
                </button>
            </div>
            <h2 className='ml-4 text-2xl text-grey-500 font-bold mt-1 tracking-widest'>
                {dayjs(new Date(dayjs().year(),monthIndex)).format("MMMM, YYYY")}
            </h2>
            {/* <button
                className="border hover:bg-gray-100 rounded py-2 px-4 ml-5"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Sync Calendar
            </button> */}
        </div>
        <div className='w-6/12 flex justify-end'>
            <div className='w-5/12 flex justify-around'>
                <div className='w-full'>
                    { user ? (<p className='p-2'>{ user.name }, </p>) : (<p className='skeleton rounded-lg w-10/12 mr-2 p-2'>&nbsp;</p>)}
                </div>
                <button className='border hover:bg-gray-100 rounded py-2 px-4 mr-3' onClick={logout}>
                    Logout
                </button>
            </div>
        </div>


{/*  { showModal && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl"> */}
              {/*content*/}
              {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> */}
                {/*header*/}
                {/* <div className="flex items-start text-blue-500 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Sync with Google
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div> */}
                {/*body*/}
                {/* <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Choose Start Date:
                    </label>
                    <input type="date" required className="mb-2 shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <div></div>
                    <label className="block text-black text-sm font-bold mb-1">
                      Choose End Date:
                    </label>
                    <input type="date"  required className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div> */}
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"

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
        )} */}
      </header>

  )
}

export default CalendarHeader
