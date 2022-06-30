import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function Product() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("E");
  const [idToBeUpdated, setidToBeUpdated] = useState("");
  const [availableColors, setavailableColors] = useState([]);
  const [uniqueFeatures, setuniqueFeatures] = useState({
    RAM: 0,
    SSD: 0,
    count: 0,
    color: [],
    priceAdd: 0,
  });
  const [clothesUniqueFeatures, setclothesUniqueFeatures] = useState({
    available_colors: [],
    available_sizes: [],
    count: 2,
  });

  const fetchProducts = async () => {
    axios
      .get("http://0.0.0.0:8000/api/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error.response?.data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const access_token = JSON.parse(
    localStorage.getItem("userDetails")
  ).access_token;

  const handleProductDelete = async (id) => {
    try {
      await axios.delete(`http://0.0.0.0:8000/api/products/${id}`, {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      fetchProducts();
      toast.success("Product Deleted", {
        id: "delete",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name !== "color") {
      setuniqueFeatures({
        ...uniqueFeatures,
        [e.target.name]: e.target.value,
      });
    } else {
      setuniqueFeatures({
        ...uniqueFeatures,
        [e.target.name]: e.target.value.split(","),
      });
    }
  };

  const handleEditClick = (id) => {
    setidToBeUpdated(id);
  };

  return (
    <div className="col-span-10 relative text-sm max-h-screen overflow-scroll scrollbar-hide  ">
      <Toaster />
      <nav className="  text-cyan-500 text-center font-semibold grid grid-cols-12 px-4 bg-gray-800 shadow-md py-4 sticky top-0 z-50">
        <p className=" uppercase col-span-1">SN</p>
        <p className="col-span-2 uppercase">Image</p>
        <p className="col-span-2 uppercase ">Title</p>
        <p className="col-span-2 uppercase">Category</p>
        <p className="col-span-2 uppercase">D_Cat</p>
        <p className="col-span-1 uppercase">Price</p>
        <button className=" uppercase text-gray-100 bg-yellow-600 hover:bg-yellow-700 transition-all  flex-1 w-20 py-1 absolute top-2 right-3 text-xs">
          Add product{" "}
        </button>
      </nav>
      {/* Users */}
      {products.map((product, index) => (
        <div className=" flex flex-col space-y-4 py-4">
          <section className="grid grid-cols-12 place-items-center text-sm text-center text-gray-100 px-4 py-4">
            <p className="col-span-1">{index + 1}</p>
            <p className="col-span-2">
              <img
                src={product.image}
                className="h-28 w-32 object-cover"
                alt=""
              />
            </p>
            <p className="col-span-2">{product.name}</p>
            <p className="col-span-2">
              {product?.cat == "E" && "Electronics"}
              {product?.cat == "C" && "Clothes"}
              {product?.cat == "O" && "Others"}
            </p>
            <p className="col-span-2">{product.d_cat}</p>
            <p className="col-span-1 text-yellow-500">${product?.price_m}</p>
            <button
              onClick={() => handleEditClick(product.id)}
              className="border-b max-w-fit border-green-600 text-green-600 font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleProductDelete(product.id)}
              className="border-b max-w-fit border-red-600 text-red-600 font-semibold"
            >
              Delete
            </button>
          </section>
          <hr className="w-[90%] mx-auto" />
        </div>
      ))}

      {idToBeUpdated && (
        <div className="absolute  top-0 w-full h-screen bg-black/40 py-20">
          <Fade top>
            <form className="h-auto relative  w-3/4 mx-auto flex flex-col space-y-3 p-6 shadow-lg shadow-cyan-400/40  bg-gray-500 rounded-lg">
              <XIcon
                onClick={() => setidToBeUpdated("")}
                className="h-6 w-6 cursor-pointer hover:rotate-180 absolute right-4 top-4 text-gray-100"
              />
              <input
                type="file"
                className="file:bg-purple-500 text-sm file:py-1.5 file:rounded-full file:border-none file:cursor-pointer file:text-white text-white"
              />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="form-inputs"
                placeholder="title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name=""
                id=""
                cols="30"
                rows="5"
                className="rounded-sm text-sm bg-gray-700 outline-none text-gray-100 px-2 py-1"
                placeholder="description"
              ></textarea>

              <select
                className="form-inputs"
                name=""
                id=""
                onChange={(e) => setCategory(e.target.value)}
              >
                <option className="cursor-not-allowed">Select Category</option>
                <option value="E">Electronics</option>
                <option value="C">Clothes</option>
                <option value="O">Others</option>
              </select>
              {category === "E" && (
                <>
                  <input
                    type="text"
                    min={1}
                    className="form-inputs"
                    placeholder="RAM"
                    name="RAM"
                    id="RAM"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    min={1}
                    className="form-inputs"
                    placeholder="SSD"
                    name="SSD"
                    id="SSD"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    min={1}
                    className="form-inputs"
                    placeholder="Color"
                    name="Color"
                    id="Color"
                    onChange={handleChange}
                  />
                </>
              )}
              {category === "C" && (
                <>
                  <input
                    type="text"
                    className="form-inputs"
                    placeholder="s,m,..."
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setavailableColors(e.target.value.split(","))
                    }
                    className="form-inputs"
                    placeholder="red,yellow,..."
                  />
                </>
              )}
              <input
                type="number"
                min={1}
                className="form-inputs"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                min={0}
                className="form-inputs"
                placeholder="discount %"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <button
                className="max-w-fit bg-cyan-500 text-white rounded-lg py-1.5 px-8 hover:bg-cyan-600 transition-all duration-500"
                type="submit"
              >
                Edit
              </button>
            </form>
          </Fade>
        </div>
      )}
    </div>
  );
}

export default Product;
