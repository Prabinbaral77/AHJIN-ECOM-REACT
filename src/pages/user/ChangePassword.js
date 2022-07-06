import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {EyeIcon,EyeOffIcon} from '@heroicons/react/outline'

function ChangePassword() {

    const [view1, setView1] = useState(false)
    const [view2, setView2] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <main className="h-screen select-none bg-black justify-center flex items-center px-4">
    <section className=" ">
        <header className="bg-red-600 text-gray-100 py-3 px-5">
            <p className="uppercase text-2xl tracking-widest font-semibold text-center font-mono">change your password</p>
        </header>

        <main className="bg-gray-900  relative text-gray-100 h-auto py-4 space-y-6 ">
           <div className="h-48 w-48 ml-16 lg:ml-20 ">
           <img src="https://cdn.pixabay.com/photo/2019/08/30/15/48/lock-4441691__340.png" className='object-cover' alt="" />
           </div>
            <form onSubmit={handleSubmit}  className="flex  flex-col w-3/4 mx-auto space-y-4">
            <label htmlFor="email" className="uppercase text-gray-300 text-sm">enter new password</label>
            <div className="flex items-center w-full  justify-between space-x-2">
            <input className="outline-none py-2 px-2 flex-1 text-gray-100 text-sm bg-gray-500 focus:ring ring-cyan-600" type={!view1?"text":"password"} />
            {!view1 ? (
                <EyeIcon onClick = {()=>setView1(true)} className="text-gray-400 active:scale-75 duration-500 transition-all ease-in-out cursor-pointer h-5 w-5"/>
            ):(
                <EyeOffIcon onClick = {()=>setView1(false)} className="text-gray-400 cursor-pointer h-5 w-5"/>
            )}
            </div>
            <label htmlFor="email" className="uppercase text-gray-300 text-sm">confirm new password</label>
            <div className="flex items-center w-full  justify-between space-x-2">
            <input className="outline-none py-2 px-2 flex-1 text-gray-100 text-sm bg-gray-500 focus:ring ring-cyan-600" type={!view2?"text":"password"} />
            {!view2 ? (
                <EyeIcon onClick = {()=>setView2(true)} className="text-gray-400 active:scale-75 duration-500 transition-all ease-in-out cursor-pointer h-5 w-5"/>
            ):(
                <EyeOffIcon onClick = {()=>setView2(false)} className="text-gray-400 cursor-pointer h-5 w-5"/>
            )}
            </div>
            <button type='submit' className="bg-red-600 py-2 text-center uppercase hover:opacity-80 my-4 w-1/2 mr-auto ">
                send email
            </button>
        </form>

       
        </main>

        <Link to='/' className="text-xs text-gray-100 px-2 mt-5 cursor-pointer hover:text-gray-100 hover:opacity-70">Home</Link>
        

        
    </section>
</main>
  )
}

export default ChangePassword