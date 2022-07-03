import { CheckIcon,ExclamationIcon } from '@heroicons/react/outline'
import React from 'react'
import { Fade } from 'react-reveal'

function Order() {
  return (
    <main className="px-4 lg:col-span-10 col-span-12 lg:py-5 py-20 max-h-[100vh] overflow-scroll text-gray-100 flex flex-col space-y-6 ">
    <h1 className="font-bold text-cyan-50 text-2xl my-2 mx-10">ALL Orders(12)</h1>

    <Fade top>
      <section className=" relative h-auto bg-gray-600 border border-cyan-500 flex items-center flex-col px-5 py-5 space-y-4">
        <div className="flex items-center justify-between   w-full ">
          <div className="flex items-center space-x-4 flex-1 ">
            <div className="h-20 w-20 ">
              <img
                src={
                  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="product"
              />
            </div>
            <p className="text-sm lg:w-80 w-28">
              Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
              GAME
            </p>
            <div className="flex items-center text-sm pl-36">
            <p className="text-gray-300">QTY: &nbsp;</p>
            {1}
          </div>
          </div>
          

          {/* <p className="text-sm text-green-600 font-semibold">
            Delivered
          </p> */}
        </div>
        <div className="flex items-center justify-between  w-full ">
          <div className="flex items-center space-x-4 flex-1 ">
            <div className="h-20 w-20 ">
              <img
                src={
                  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="product"
              />
            </div>
            <p className="text-sm lg:w-80 w-28">
              Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
              GAME
            </p>
            <div className="flex items-center text-sm pl-36">
            <p className="text-gray-300">QTY: &nbsp;</p>
            {1}
          </div>
          </div>
          

         
        </div>
        <article className="absolute right-8 top-20  flex flex-col items-center space-y-6">
          <p className="text-sm text-yellow-500">Price: Rs 12000</p>
        <div className="flex items-center space-x-1 ">
        <p className="text-sm text-green-600 font-semibold">
            Delivered
          </p>
          <CheckIcon className="text-green-600 h-6 w-6"/>
        </div>

        <div className="flex items-center text-xs space-x-3">
          <p className="text-teal-600 cursor-pointer">Edit</p>
          <p className="text-red-600 cursor-pointer">Delete</p>
        </div>
        </article>
      </section>
     

      <section className=" relative h-auto bg-gray-600 border border-cyan-500 flex items-center flex-col px-5 py-5 space-y-4">
        <div className="flex items-center justify-between   w-full ">
          <div className="flex items-center space-x-4 flex-1 ">
            <div className="h-20 w-20 ">
              <img
                src={
                  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="product"
              />
            </div>
            <p className="text-sm lg:w-80 w-28">
              Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
              GAME
            </p>
            <div className="flex items-center text-sm pl-36">
            <p className="text-gray-300">QTY: &nbsp;</p>
            {1}
          </div>
          </div>
          

          {/* <p className="text-sm text-green-600 font-semibold">
            Delivered
          </p> */}
        </div>
        <div className="flex items-center justify-between  w-full ">
          <div className="flex items-center space-x-4 flex-1 ">
            <div className="h-20 w-20 ">
              <img
                src={
                  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="product"
              />
            </div>
            <p className="text-sm lg:w-80 w-28">
              Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
              GAME
            </p>
            <div className="flex items-center text-sm pl-36">
            <p className="text-gray-300">QTY: &nbsp;</p>
            {1}
          </div>
          </div>
          

         
        </div>
        <article className="absolute right-8 top-20  flex flex-col items-center space-y-6">
          <p className="text-sm text-yellow-500">Price: Rs 12000</p>
        <div className="flex items-center space-x-1 ">
        <p className="text-sm text-yellow-600 font-semibold">
            pending
          </p>
          <ExclamationIcon className="text-yellow-600 h-6 w-6"/>
        </div>

        <div className="flex items-center text-xs space-x-3">
          <p className="text-teal-600 cursor-pointer">Edit</p>
          <p className="text-red-600 cursor-pointer">Delete</p>
        </div>
        </article>
      </section>




      <section className=" relative h-auto bg-gray-600 border border-cyan-500 flex items-center flex-col px-5 py-5 space-y-4">
        <div className="flex items-center justify-between   w-full ">
          <div className="flex items-center space-x-4 flex-1 ">
            <div className="h-20 w-20 ">
              <img
                src={
                  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="product"
              />
            </div>
            <p className="text-sm lg:w-80 w-28">
              Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
              GAME
            </p>
            <div className="flex items-center text-sm pl-36">
            <p className="text-gray-300">QTY: &nbsp;</p>
            {1}
          </div>
          </div>
          

          {/* <p className="text-sm text-green-600 font-semibold">
            Delivered
          </p> */}
        </div>
        <div className="flex items-center justify-between  w-full ">
          <div className="flex items-center space-x-4 flex-1 ">
            <div className="h-20 w-20 ">
              <img
                src={
                  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="product"
              />
            </div>
            <p className="text-sm lg:w-80 w-28">
              Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
              GAME
            </p>
            <div className="flex items-center text-sm pl-36">
            <p className="text-gray-300">QTY: &nbsp;</p>
            {1}
          </div>
          </div>
          

         
        </div>
        <article className="absolute right-8 top-20  flex flex-col items-center space-y-6">
          <p className="text-sm text-yellow-500">Price: Rs 12000</p>
        <div className="flex items-center  space-x-1">
        <p className="text-sm text-green-600 font-semibold">
            Delivered
          </p>
          <CheckIcon className="text-green-600 h-6 w-6"/>
        </div>

        <div className="flex items-center text-xs space-x-3">
          <p className="text-teal-600 cursor-pointer">Edit</p>
          <p className="text-red-600 cursor-pointer">Delete</p>
        </div>
        </article>
      </section>
    </Fade>
  </main>
  )
}

export default Order