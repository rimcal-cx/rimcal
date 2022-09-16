import axios from "axios"
import { useContext, useEffect, useState } from "react"
import GlobalContext from "../../context/GlobalContext"


const UserModal=()=>{

    const {userModal,visbisltyUser,golbalSlectedUsers} = useContext(GlobalContext)
    const[userList,setUserList] =useState([])
    const[selectedUser,setselectedUser] =useState([])

    console.log(selectedUser)
    const loadusers =async ()=>{
        const result = (await axios.get('users'))
        console.log(result);
        setUserList(result.data.data)

    }
    useEffect(()=>{
        loadusers()
    },[userModal])


    const setUser=(e,users)=>{

        console.log();
        if (e.target.checked) {
            setselectedUser([...selectedUser,users])
        }else{
            setselectedUser(selectedUser.filter(element => element.id !== users.id))
        }

    }

    const adduser=()=>{


        golbalSlectedUsers([...selectedUser])
        visbisltyUser(false)
    }

    return(
        <div className='h-auto w-full fixed left-0 top-0 flex justify-center items-center'>
        <div className='bg-white rounded-lg shadow-2xl w-1/4 h-3/4 '>
            <header className='bg-gray-100 px-4 py-2 flex justify-between'>
                <button onClick={()=>{visbisltyUser(false);setselectedUser([])}}>
                    <span className='material-icons-outline text-gray-100'>
                        <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" alt="Close Modal"  className='w-7 h-7'/>
                    </span>
                    </button>
            </header>
            <div className='p-3 h-3/4 overflow-auto'>
                {
                    userList.map((users)=>
                    <button className='border w-96 hover:bg-gray-200 rounded py-2 px-4 ml-5 text-left' >
                    <input type="checkbox" value={users} onClick={(e)=>{setUser(e,users)}}/> <span className="gap-x-2 mx-4"></span>{' '+users.name}
                   </button>
                    )
                }


            </div>
            <footer className='flex w-100 justify-end p-3 mt-5 border-t'>

                <button  onClick={adduser} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-bold">
                    Add User

                </button>
            </footer>

        </div>
    </div>
    )

}

export default UserModal
