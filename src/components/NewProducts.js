import React from "react";
import { Fade } from "react-reveal";

function NewProducts() {
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //   const getNewProducts = async () => {
    //     const res = await axios.get("http://0.0.0.0:8000/api/products/");
    //     setProducts(res.data);
    //   };
    //   getNewProducts();
    // }, []);

  return (
    <main className="lg:px-6 px-4 flex flex-col space-y-6 pb-10 bg-[#1E293B]">
      <h1 className="font-bold text-cyan-500 text-2xl  max-w-fit border-b border-cyan-500">
        New Products
      </h1>
      <Fade right>
        <div className="h-60  py-2 flex  overflow-scroll space-x-3 lg:space-x-6 scrollbar-hide">
          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1656414896156-bb1339254229?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                layout="fill"
                alt="product"
                objectFit="cover"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1656414896156-bb1339254229?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                layout="fill"
                alt="product"
                objectFit="cover"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1656414896156-bb1339254229?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                layout="fill"
                alt="product"
                objectFit="cover"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1656414896156-bb1339254229?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                layout="fill"
                alt="product"
                objectFit="cover"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1656414896156-bb1339254229?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                layout="fill"
                alt="product"
                objectFit="cover"
              />
            </section>
          </a>

          <a href={`/products/`}>
            <section className="h-full w-[20rem]  relative cursor-pointer shrink-0">
              <img
                src="https://images.unsplash.com/photo-1656414896156-bb1339254229?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                layout="fill"
                alt="product"
                objectFit="cover"
              />
            </section>
          </a>
        </div>
      </Fade>
    </main>
  );
}

export default NewProducts;
