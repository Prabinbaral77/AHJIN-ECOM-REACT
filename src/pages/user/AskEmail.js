import React from 'react'
import { Link } from 'react-router-dom'

function AskEmail() {

    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <main className="h-screen bg-black justify-center flex items-center px-4">
            <section className="   py-3 ">
                <header className="bg-red-600 text-gray-100 py-3 px-5">
                    <p className="uppercase text-2xl tracking-wider font-semibold text-center">forgot your password?</p>
                </header>

                <main className="bg-gray-900  relative text-gray-100 h-96 py-4 space-y-6 ">
                    <p className="text-gray-400 w-3/4 mx-auto text-sm">Don't worry! Just fill in your email and we will help you to reset your password.</p>
                    <form onSubmit = {handleSubmit} className="flex  flex-col space-y-2 w-3/4 mx-auto">
                    <label htmlFor="email" className="uppercase text-gray-300 text-sm">email address</label>
                    <input className="outline-none py-2 px-2 text-gray-100 text-sm bg-gray-500 focus:ring ring-cyan-600" type="email" />
                    <button type='submit' className="bg-red-600 py-2 text-center uppercase hover:opacity-80 my-4 w-1/2 mr-auto ">
                        send email
                    </button>
                </form>

                <footer className="bg-gray-700 h-12 absolute bottom-0 flex items-center w-full  px-4 ">
                        <Link to='/login' className="text-xs text-gray-100 uppercase cursor-pointer hover:opacity-70 hover:text-gray-100">back to login</Link>
                </footer>
                </main>

                <Link to='/register' className="text-xs text-gray-100 px-2 my-5 cursor-pointer hover:text-gray-100 hover:opacity-70">Don't have an account? Sign up</Link>

                
            </section>
    </main>
  )
}

export default AskEmail