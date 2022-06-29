import React from 'react'

function User() {
  return (
    <div className='col-span-10 '>
      <nav className=' text-cyan-500 text-center font-semibold grid grid-cols-12 px-4 bg-gray-800 shadow-md py-3 sticky top-0 z-50'>
        <p className='col-span-1 '>SN</p>
        <p className='col-span-3 uppercase'>Username</p>
        <p className='col-span-3 uppercase '>Email</p>
        <p className='col-span-3 uppercase'>Phone</p>
      </nav>

      {/* Users */}

      <div className='max-h-screen overflow-scroll flex flex-col space-y-4 py-4'>
     
      <section className='grid grid-cols-12 text-sm text-center text-gray-100 px-4 py-4'>
            <p className='col-span-1'>1.</p>
            <p className='col-span-3' >sankalpa115</p>
            <p className='col-span-3'>sankalpa115@gmail.com</p>
            <p className='col-span-3'>9816129058</p>
            <button className='border-b max-w-fit border-green-600 text-green-600 font-semibold'>Edit</button>
            <button className='border-b max-w-fit border-red-600 text-red-600 font-semibold'>Delete</button>
      </section>
      <section className='grid grid-cols-12 text-sm text-center text-gray-100 px-4 py-4'>
            <p className='col-span-1'>1.</p>
            <p className='col-span-3' >sankalpa115</p>
            <p className='col-span-3'>sankalpa115@gmail.com</p>
            <p className='col-span-3'>9816129058</p>
            <button className='border-b max-w-fit border-green-600 text-green-600 font-semibold'>Edit</button>
            <button className='border-b max-w-fit border-red-600 text-red-600 font-semibold'>Delete</button>
      </section>
      <section className='grid grid-cols-12 text-sm text-center text-gray-100 px-4 py-4'>
            <p className='col-span-1'>1.</p>
            <p className='col-span-3' >sankalpa115</p>
            <p className='col-span-3'>sankalpa115@gmail.com</p>
            <p className='col-span-3'>9816129058</p>
            <button className='border-b max-w-fit border-green-600 text-green-600 font-semibold'>Edit</button>
            <button className='border-b max-w-fit border-red-600 text-red-600 font-semibold'>Delete</button>
      </section>
      <section className='grid grid-cols-12 text-sm text-center text-gray-100 px-4 py-4'>
            <p className='col-span-1'>1.</p>
            <p className='col-span-3' >sankalpa115</p>
            <p className='col-span-3'>sankalpa115@gmail.com</p>
            <p className='col-span-3'>9816129058</p>
            <button className='border-b max-w-fit border-green-600 text-green-600 font-semibold'>Edit</button>
            <button className='border-b max-w-fit border-red-600 text-red-600 font-semibold'>Delete</button>
      </section>
      <section className='grid grid-cols-12 text-sm text-center text-gray-100 px-4 py-4'>
            <p className='col-span-1'>1.</p>
            <p className='col-span-3' >sankalpa115</p>
            <p className='col-span-3'>sankalpa115@gmail.com</p>
            <p className='col-span-3'>9816129058</p>
            <button className='border-b max-w-fit border-green-600 text-green-600 font-semibold'>Edit</button>
            <button className='border-b max-w-fit border-red-600 text-red-600 font-semibold'>Delete</button>
      </section>
      </div>
      
    </div>
  )
}

export default User