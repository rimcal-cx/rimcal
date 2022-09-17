import  { createContext } from "react";

const GlobalContext = createContext({
    monthIndex:0,
    setMonthIndex:(index)=>{},
    smallCalendarMonth:0,
    setsmallMonthCalendar:(index)=>{},
    clickDay:0,
    setclickDay:(day)=>{},
    showEventModal:0,
    setShowEventModal:()=>{},
    DispatchCalEvents:({type,payload})=>{},
    saveEvents:[],
    selectedEvent:null,
    setSelectedEvent:()=>{console.log("HELLO-GLOBAL");},
    token:{},
    setToken:()=>{},
    eventList:[],
    setEventList:()=>{},
    userModal:false,
    visbisltyUser:()=>{},
    selctedUsers:[],
    golbalSlectedUsers:()=>{},

})

export default GlobalContext
