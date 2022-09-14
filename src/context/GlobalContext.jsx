import  { createContext } from "react";

const GlobalContext = createContext({
    monthIndex:0,
    setMonthIndex:(index)=>{},
    smallcalenderMonth:0,
    setsmallMonthCalender:(index)=>{},
    clickDay:0,
    setclickDay:(day)=>{},
    showEventModal:0,
    setshowEventModal:()=>{},
    DispatchCalEvents:({type,payload})=>{},
    saveEvents:[],
    selectedEvent:null,
    setselectedEvent:()=>{ alert("HMMM")}


})
export default GlobalContext