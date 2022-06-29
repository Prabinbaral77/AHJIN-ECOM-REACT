import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewProducts from "../components/NewProducts";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

function App() {
  return (
    <div>
      <Navbar />
      <Slider />
      <NewProducts />
      <FeaturedProducts />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
