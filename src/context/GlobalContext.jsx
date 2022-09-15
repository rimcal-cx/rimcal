import  { createContext, useEffect } from "react";
import axios from 'axios'

const GlobalContext = createContext({
    monthIndex:0,
    setMonthIndex:(index)=>{},
    smallCalendarMonth:0,
    setsmallMonthCalendar:(index)=>{},
    clickDay:0,
    setclickDay:(day)=>{},
    showEventModal:0,
    setshowEventModal:()=>{},
    DispatchCalEvents:({type,payload})=>{},
    saveEvents:[],
    selectedEvent:null,
    setselectedEvent:()=>{console.log("HELLO-GLOBAL");},
    token:{},
    setToken:()=>{}
})

/*const loadEvents = async () => {
    const result = (await axios.get('calendar'))
    console.log(result)
}

useEffect(() => {
    console.log('hiii')
    loadEvents()
})*/

export default GlobalContext
