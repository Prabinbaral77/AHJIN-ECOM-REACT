import React from "react";
import { Fade } from "react-reveal";

function FeaturedProducts() {
  //  const featuredProducts = products.filter((p)=>{
  //   return p.featured === true
  //  })

  return (
    <main className="lg:px-6 px-4 flex flex-col space-y-6 pb-10 bg-[#1E293B]">
      <h1 className="font-bold text-cyan-500 text-2xl  max-w-fit border-b border-cyan-500">
        Featured Products
      </h1>
      <Fade left>
        <div className="h-60  py-2 flex  overflow-scroll space-x-3 lg:space-x-6 scrollbar-hide">
          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1551&q=80"
                layout="fill"
                objectFit="cover"
                alt="featured Product"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1551&q=80"
                layout="fill"
                objectFit="cover"
                alt="featured Product"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1551&q=80"
                layout="fill"
                objectFit="cover"
                alt="featured Product"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1551&q=80"
                layout="fill"
                objectFit="cover"
                alt="featured Product"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1551&q=80"
                layout="fill"
                objectFit="cover"
                alt="featured Product"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1551&q=80"
                layout="fill"
                objectFit="cover"
                alt="featured Product"
              />
            </section>
          </a>
        </div>
      </Fade>
    </main>
  );
}

export default FeaturedProducts;
