import React from "react";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

function NewProducts({ products }) {
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     const getNewProducts = async () => {
  //       const res = await axios.get("http://0.0.0.0:8000/api/products/");
  //       setProducts(res.data);
  //     };
  //     getNewProducts();
  //   }, []);

  return (
    <main className="lg:px-6 px-4 flex flex-col space-y-6 pb-10 bg-[#1E293B]">
      <h1 className="font-bold text-cyan-500 text-2xl  max-w-fit border-b border-cyan-500">
        New Products
      </h1>
      <Fade right>
        <div className="lg:h-64 h-60  py-2 flex  overflow-scroll space-x-3 scrollbar-hide">
          {products.slice(0, 15).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <section
                
                className="h-full w-60  cursor-pointer shrink-0"
              >
                <img
                  src={product?.image}
                  className="h-full w-full object-cover"
                />
              </section>
            </Link>
          ))}
        </div>
      </Fade>
    </main>
  );
}

export default NewProducts;
