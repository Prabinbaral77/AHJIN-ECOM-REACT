import "./App.css";
import Categories from "./component/Categories";
import FeaturedProducts from "./component/FeaturedProducts";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import NewProducts from "./component/NewProducts";
import Newsletter from "./component/Newsletter";
import Products from "./component/Products";
import Slider from "./component/Slider";

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
