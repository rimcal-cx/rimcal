import  { createContext, useEffect } from "react";

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
    setToken:()=>{},
    db_data:[],
    setDbdata:()=>{},
    userModal:false,
    visbisltyUser:()=>{},
    selctedUsers:[],
    golbalSlectedUsers:()=>{},

})

export default GlobalContext
