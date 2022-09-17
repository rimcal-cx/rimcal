import React, { useEffect, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

function savedEventReducer(state,{type,payload}){

    switch (type) {
      case 'push':
      return[...state,payload];
      case "update":
        return state.map(evt=>evt.id === payload.id?payload:evt)
      case "delete":
        console.log(state);
        return state.filter((evt)=>evt.id!==payload.id)
      default:
        throw new Error()
    }

}

const initEvents=()=>{
   const storageEvents=localStorage.getItem("savedEvents")
   const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []

   return parsedEvents
}

function ContextWrapper(props) {
    const [monthIndex,setMonthIndex] =useState(dayjs().month())
    const [smallCalendarMonth,setsmallMonthCalendar] =useState(null)
    const [clickDay,setclickDay] =useState(dayjs())
    const [showEventModal,setShowEventModal] =useState(false)
    const [selectedEvent,setSelectedEvent] =useState(null)
    const [saveEvents,DispatchCalEvents] =useReducer(savedEventReducer,[],initEvents)
    const [eventList, setEventList] = useState([])
    useEffect(()=>{
      localStorage.setItem("savedEvents",JSON.stringify(saveEvents))

    },[saveEvents,selectedEvent])

    useEffect(()=>{
      if (smallCalendarMonth!=null) {
        setMonthIndex(smallCalendarMonth)
      }
    },[smallCalendarMonth])
  return (

    <GlobalContext.Provider value={
        {
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setsmallMonthCalendar,
            setclickDay,
            clickDay,
            showEventModal,
            setShowEventModal,
            DispatchCalEvents,
            saveEvents,
            setSelectedEvent,
            selectedEvent,
            eventList,
            setEventList,
        }
    }>
        {props.children}
    </GlobalContext.Provider>

  )
}

export default ContextWrapper
