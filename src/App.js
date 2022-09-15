
import { useState,useContext, useEffect } from 'react';
import GlobalContext from './context/GlobalContext';
import './assets/main.css';
import { getMonth } from './utilities/util';
import Signup from './components/Signup';
import ComponentWrapper from './components/ComponentWrapper/ComponentWrapper';
import {Route ,Routes} from 'react-router-dom'
import { ProtectedRoute } from "./components/ComponentWrapper/ProtectedRoute";


function App() {
const [currentMonth ,setCurrentMonth] = useState(getMonth())
const { monthIndex } = useContext(GlobalContext)
useEffect(()=>{
setCurrentMonth(getMonth(monthIndex))
},[monthIndex])
return (
<Routes>
<>
<Route path='/' element={<Signup/>} exact/>
<Route path='/calendar' element={
     <ProtectedRoute>
        <ComponentWrapper currentMonth={currentMonth}/>
   </ProtectedRoute>
}/>
</>
</Routes>
);
}

export default App;
