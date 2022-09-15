import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { getMonth } from '../utilities/util'

function SmallCalendar() {
    const [currentmonthIndex, setcurrentMonthIndex] = useState(dayjs().month())
    const [currentmonth, setcurrentMonth] = useState(getMonth())

    const { monthIndex,setsmallMonthCalendar,clickDay,setclickDay } = useContext(GlobalContext)

    const prevMonth = () => {
        setcurrentMonthIndex(currentmonthIndex - 1)
    }

    const nextMonth = () => {
        setcurrentMonthIndex(currentmonthIndex + 1)
    }
    const cssDayclass=(day)=>{

        const format = 'DD-MM-YY'
        const nowDay=dayjs().format(format)
        const currday = day.format(format)
        const MyclickDay=clickDay && clickDay.format(format)

        if (nowDay === currday) {
            return 'bg-blue-500 rounded text-white'
        }else if(currday === MyclickDay){
            return "bg-blue-100 rounded text-blue-600 font-bold ";
        }else{

            return ""
        }
    }

    useEffect(() => {
        setcurrentMonthIndex(monthIndex)
    }, [monthIndex])
    useEffect(() => {
        setcurrentMonth(getMonth(currentmonthIndex))
    }, [currentmonthIndex])
    return (
        <div className='mt-9'>

            <header className='flex justify-between'>

                <p className='text-grey-500 font-bold'>
                    {
                        dayjs(new Date(dayjs().year(), currentmonthIndex)).format("MMM YYYY")
                    }
                </p>
                <button onClick={prevMonth}>
                    <span className='border p-2 material-icons-outlined cursor-pointer text-grey-600 mx-2'>
                        Prev
                    </span>
                </button>
                <button onClick={nextMonth}>
                    <span className='border p-2 material-icons-outlined cursor-pointer text-grey-600 mx-2'>
                        Next
                    </span>
                </button>
            </header>
            <div className='grid grid-cols-7 grid-rows-6'>
                {currentmonth[0].map((day, index) => (
                    <span key={index} className='text-sm py-1 text-center mt-2'>
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {
                    currentmonth.map((row, index) => (
                        <React.Fragment key={index}>
                            {
                                row.map((day, idx) => (
                                    <button key={idx} onClick={()=>{setsmallMonthCalendar(currentmonthIndex);setclickDay(day)}} className={`py-1 w-full ${cssDayclass(day)}`}>
                                        <span className='text-sm'>
                                            {day.format('D')}
                                        </span>
                                    </button>
                                ))
                            }

                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default SmallCalendar
