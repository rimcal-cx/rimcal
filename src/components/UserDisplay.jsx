import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";



 function UserDisplay({ logout }) {
    const { user } = useAuth()

    useEffect(() => {}, [user])

    return (
        <div className='w-5/12 flex justify-around'>
            <div className='w-full'>
                { user ? (<p className='p-2'>{ user.name }, </p>) : (<p className='skeleton rounded-lg w-10/12 mr-2 p-2'>&nbsp;</p>)}
            </div>
            <button className='border hover:bg-gray-100 rounded py-2 px-4 mr-3' onClick={logout}>
                Logout
            </button>
        </div>
    );

 }

 export default UserDisplay
