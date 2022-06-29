import { Fade } from "react-reveal";
import React from "react";
import ProductCard from "./ProductCard";

function Products() {
  // const [products, setProducts] = useState(null)
  // useEffect(() => {
  //   setProducts(shuffle(results))
  // }, [])

  return (
    <Fade bottom>
      <main className="bg-[#1E293B] lg:max-w-6xl max-w-full  mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-x-2 gap-y-4 lg:gap-y-6 lg:gap-x-8 lg:px-4 px-2 py-7">
        <ProductCard
        // key={product.id}
        // id={product.id}
        // name={product.name}
        // price_m={product?.price_m}
        // price_a={product?.price_a}
        // discount={product.discount}
        // rating={product.rating}
        // img={product.image}
        />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </main>
    </Fade>
  );
}

export default Products;
