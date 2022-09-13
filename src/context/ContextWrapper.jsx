import React, { useEffect, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'
//Integrate API i mean calnder API
function savedEventReducer(state,{type,payload}){

    switch (type) {
      case 'push':
      return[...state,payload];
      case "update":
        return state.map(evt=>evt.id === payload.id?payload:evt)
      case "delete":
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
    const [smallcalenderMonth,setsmallMonthCalender] =useState(null)
    const [clickDay,setclickDay] =useState(dayjs())
    const [showEventModal,setshowEventModal] =useState(false)
    const [selectedEvent,setselectedEvent] =useState(null)
    const [saveEvents,DispatchCalEvents] =useReducer(savedEventReducer,[],initEvents)
    
    useEffect(()=>{

      console.log(saveEvents);
      localStorage.setItem("savedEvents",JSON.stringify(saveEvents))

    },[saveEvents,selectedEvent])
    
    useEffect(()=>{
      if (smallcalenderMonth!=null) {
        setMonthIndex(smallcalenderMonth)
      }
    },[smallcalenderMonth])
  return (

    <GlobalContext.Provider value={{monthIndex,setMonthIndex,smallcalenderMonth,setsmallMonthCalender,setclickDay,clickDay,showEventModal,setshowEventModal,DispatchCalEvents,saveEvents,setselectedEvent,selectedEvent}}>
        {props.children}
    </GlobalContext.Provider>

  )
}

export default ContextWrapper