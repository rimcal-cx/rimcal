import React from "react";
import { Link } from "react-router-dom";

const Signup =()=>{

    return(

        <div className="h-screen grid grid-cols-3 gap-4 content-center ">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
        <div className="w-screen ml-2">
        <Link to="/calender" className=" h-3 border-2 rounded p-3 hover:bg-indigo-200 font-bold"> Go to Calender</Link>
<img className="cursor-pointer" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLGHodcnHTl9yyqNE3G0vtrzyT1fJ5e3jYW32nz7haZ6trcDwjZuKsTsLtNPBnxLa4Cg&usqp=CAU" alt="" />
        </div>
        </div>
    )
}

export default Signup
