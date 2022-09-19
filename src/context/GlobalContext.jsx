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
    setSelectedEvent:()=>{},
    token:{},
    setToken:()=>{},
    eventList:[],
    setEventList:()=>{},
    popupToggle: false,
    setPopupToggle: (toggle) => {},
    syncToggle: false,
    setSyncToggle: (toggle) => {},
    popupFooter:'Footer',
    setPopupFooter: (component) => {},
    popupHeader: "Header",
    setPopupHeader: (component) => {},
    popupContent: "Content",
    setPopupContent: (component) => {},
    labelCssClasses: [],
    paletteCssClass: {},
    eventCssClass: {},


})

export default GlobalContext
