import React, {useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {EyeIcon,EyeOffIcon} from '@heroicons/react/outline'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function ChangePassword() {
const navigate = useNavigate()
    const [view1, setView1] = useState(true)
    const [view2, setView2] = useState(true)
    const [new_password1, setnew_password1] = useState("")
    const [new_password2, setnew_password2] = useState("")

    let { id, token } = useParams();

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(new_password1 !== new_password2) {
            return toast.error("passwords must be same")
        }

        try {
            axios.post(`http://localhost:8000/api/user/password-reset-confirm/${id}/${token}/`, {
                uid: id.toString(),
                new_password1: new_password1,
                new_password2: new_password2,
                token: token
            })
            
            navigate('/login')
            toast.success("Password reset successfull")
        } catch (error) {
            console.log(error)
            toast.error("Password reset failed")
        }
    }







  return (
    <main className="h-screen select-none bg-black justify-center flex items-center px-4">
        <Toaster/>
    <section className=" ">
        <header className="bg-purple-600 text-gray-100 py-3 px-5">
            <p className="uppercase text-2xl tracking-widest font-semibold text-center font-mono">change your password</p>
        </header>

        <main className="bg-gray-900  relative text-gray-100 h-auto py-4 space-y-6 ">
           <div className="h-48 w-48 ml-16 lg:ml-20 ">
           <img src="https://cdn.pixabay.com/photo/2019/08/30/15/48/lock-4441691__340.png" className='object-cover' alt="" />
           </div>
            <form onSubmit={handleSubmit}  className="flex  flex-col w-3/4 mx-auto space-y-4">
            <label htmlFor="email" className="uppercase text-gray-300 text-sm">enter new password</label>
            <div className="flex items-center w-full  justify-between space-x-2">
            <input value={new_password1} onChange = {(e)=>setnew_password1(e.target.value)} className="outline-none py-2 px-2 flex-1 text-gray-100 text-sm bg-gray-500 focus:ring ring-cyan-600" type={!view1?"text":"password"} />
            {!view1 ? (
                <EyeIcon onClick = {()=>setView1(true)} className="text-gray-400 active:scale-75 duration-500 transition-all ease-in-out cursor-pointer h-5 w-5"/>
            ):(
                <EyeOffIcon onClick = {()=>setView1(false)} className="text-gray-400 cursor-pointer h-5 w-5"/>
            )}
            </div>
            <label htmlFor="email" className="uppercase text-gray-300 text-sm">confirm new password</label>
            <div className="flex items-center w-full  justify-between space-x-2">
            <input value={new_password2} onChange = {(e)=>setnew_password2(e.target.value)} className="outline-none py-2 px-2 flex-1 text-gray-100 text-sm bg-gray-500 focus:ring ring-cyan-600" type={!view2?"text":"password"} />
            {!view2 ? (
                <EyeIcon onClick = {()=>setView2(true)} className="text-gray-400 active:scale-75 duration-500 transition-all ease-in-out cursor-pointer h-5 w-5"/>
            ):(
                <EyeOffIcon onClick = {()=>setView2(false)} className="text-gray-400 cursor-pointer h-5 w-5"/>
            )}
            </div>
            <button type='submit' className="bg-purple-600 py-2 text-center uppercase hover:opacity-80 my-4 w-1/2 mr-auto ">
               Change
            </button>
        </form>

       
        </main>

        <Link to='/' className="text-xs text-gray-100 px-2 mt-5 cursor-pointer hover:text-gray-100 hover:opacity-70">Home</Link>
        

        
    </section>
</main>
  )
}

export default ChangePassword