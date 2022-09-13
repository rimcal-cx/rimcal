
import CalenderHeader from "../CalenderHeader";
import Month from "../Month";
import SideBar from "../SideBar";

const ComponentWrapper=({currentMonth})=>{
    return (
        <div className='h-screen flex flex-col'>
        <CalenderHeader/>
        <div className='flex flex-1'>
        <SideBar/>
        <Month month={currentMonth}/>

        </div>

    </div>
    )
}
export default ComponentWrapper
