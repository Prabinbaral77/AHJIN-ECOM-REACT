import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("E");

  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [imageUrl, setimageUrl] = useState("");
  const [imageUrl2, setimageUrl2] = useState("");
  const [imageUrl3, setimageUrl3] = useState("");
  const [checked, setChecked] = useState(false);
  const [featured, setFeatured] = useState(false);

  const [d_cat, setd_cat] = useState("");
  const [clothesUniqueFeatures, setclothesUniqueFeatures] = useState({
    available_colors: [],
    available_sizes: [],
    count: 2,
  });
  const [uniqueFeatures, setuniqueFeatures] = useState({
    RAM: 0,
    SSD: 0,
    count: 0,
    color: [],
    priceAdd: 0,
  });
  const [uniqueFeatures2, setuniqueFeatures2] = useState({
    RAM: 0,
    SSD: 0,
    count: 0,
    color: [],
    priceAdd: 0,
  });
  const [uniqueFeatureArray, setuniqueFeatureArray] = useState([]);

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
  const handleChange2 = (e) => {
    if (e.target.name !== "color") {
      setuniqueFeatures2({
        ...uniqueFeatures2,
        [e.target.name]: e.target.value,
      });
    } else {
      setuniqueFeatures2({
        ...uniqueFeatures2,
        [e.target.name]: e.target.value.split(","),
      });
    }
  };

  // Perform localStorage action
  const item = JSON.parse(localStorage.getItem("userDetails"));
  const access_token = item?.access_token;
  const handleClick = async () => {
    const toastId = toast.loading("Uploading Images");
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ahjin-ecommerce");
      data.append("cloud_name", "sankalpa-sys");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/sankalpa-sys/image/upload`,
        data
      );
      setimageUrl(res.data.url);
    }
    if (image2) {
      const data = new FormData();
      data.append("file", image2);
      data.append("upload_preset", "ahjin-ecommerce");
      data.append("cloud_name", "sankalpa-sys");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/sankalpa-sys/image/upload`,
        data
      );
      setimageUrl2(res.data.url);
    }
    if (image3) {
      const data = new FormData();
      data.append("file", image3);
      data.append("upload_preset", "ahjin-ecommerce");
      data.append("cloud_name", "sankalpa-sys");
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/sankalpa-sys/image/upload`,
        data
      );
      setimageUrl3(res.data.url);
    }
    toast.success("Images uploaded", { id: toastId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === "E") {
      uniqueFeatureArray.push(uniqueFeatures);
      if (checked) {
        uniqueFeatureArray.push(uniqueFeatures2);
      }
    } else if (category === "C") {
      uniqueFeatureArray.push(clothesUniqueFeatures);
    }
    console.log(uniqueFeatureArray);

    try {
      const res = await axios.post(
        "http://0.0.0.0:8000/api/products/",
        {
          name: title,
          description: description,
          price_m: price,
          cat: category,
          discount: discount,
          unique_feature: uniqueFeatureArray,
          d_cat: d_cat,
          image: imageUrl,
          image2: imageUrl2,
          image3: imageUrl3,
          featured: featured,
        },
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      toast.success("Product added Successfully.");
      console.log(res.data);
      setuniqueFeatureArray([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClothesUniqueChange = (e) => {
    setclothesUniqueFeatures({
      ...clothesUniqueFeatures,
      [e.target.name]: e.target.value.split(","),
    });
  };

  return (
    <main className="lg:col-span-10 col-span-12 w-full flex items-center justify-center lg:pt-20  max-h-screen overflow-scroll">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="lg:w-[65%] w-[90%] mx-auto bg-gray-900  rounded-md flex flex-col space-y-8 p-8 shadow-lg shadow-cyan-400/40"
      >
        <div className="flex items-center  justify-between space-x-2 px-2">
          <div className="flex  space-x-2 items-center justify-around">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              className="file:bg-purple-500 lg:w-1/3 w-1/2 text-xs file:py-1.5 file:rounded-full file:border-none file:cursor-pointer file:text-white text-white"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              className="file:bg-blue-500 text-xs lg:w-1/3 w-1/2 file:py-1.5 file:rounded-full file:border-none file:cursor-pointer file:text-white text-white"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              className="file:bg-teal-500 text-xs lg:w-1/3 w-1/2 file:py-1.5 file:rounded-full file:border-none file:cursor-pointer file:text-white text-white"
            />
          </div>
          <button
            onClick={handleClick}
            className="bg-red-600 w-1/4 hover:bg-red-700 transotion-all duration-300 active:scale-90 ease-in text-xs px-4 h-10 text-gray-100 rounded-full"
          >
            Add Images
          </button>
        </div>
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
          className="rounded-sm text-sm bg-gray-700 outline-none text-gray-100 px-2 py-1 border border-cyan-600"
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
          <select
            className="form-inputs"
            name=""
            id=""
            onChange={(e) => setd_cat(e.target.value)}
          >
            <option className="cursor-not-allowed">Select Item </option>
            <option value="laptop">Laptop</option>
            <option value="smartphone">SmartPhone</option>
            <option value="camera">Camera</option>
          </select>
        )}
        {category === "C" && (
          <select
            className="form-inputs"
            name=""
            id=""
            onChange={(e) => setd_cat(e.target.value)}
          >
            <option className="cursor-not-allowed">Select Item </option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
          </select>
        )}
        {d_cat === "laptop" && (
          <div
            className={`flex ${
              category !== "E" && "hidden"
            } items-center  space-x-2`}
          >
            <input
              type="number"
              min={1}
              className="form-inputs w-1/4"
              placeholder="RAM"
              name="RAM"
              id="RAM"
              onChange={handleChange}
            />
            <input
              type="number"
              min={1}
              className="form-inputs  w-1/4 appearance-none"
              placeholder="SSD"
              name="SSD"
              id="SSD"
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-inputs  w-1/4"
              placeholder="gray,gold,.."
              name="color"
              id="color"
              onChange={handleChange}
            />

            <input
              type="number"
              min={1}
              className="form-inputs  w-1/4"
              placeholder="count"
              name="count"
              id="count"
              onChange={handleChange}
            />
          </div>
        )}

        {/* //todo: yedi checked xa vane show this */}

        {checked && (
          <div
            className={`flex ${
              category !== "E" && "hidden"
            } items-center  space-x-2`}
          >
            <input
              type="text"
              min={1}
              className="form-inputs w-1/5"
              placeholder="RAM"
              name="RAM"
              id="RAM"
              onChange={handleChange2}
            />
            <input
              type="text"
              min={1}
              className="form-inputs  w-1/5"
              placeholder="SSD"
              name="SSD"
              id="SSD"
              onChange={handleChange2}
            />
            <input
              type="text"
              className="form-inputs  w-1/5"
              placeholder="gray,gold,.."
              name="color"
              id="color"
              onChange={handleChange2}
            />

            <input
              type="number"
              min={1}
              className="form-inputs  w-1/5"
              placeholder="count"
              name="count"
              id="count"
              onChange={handleChange2}
            />
            <input
              type="number"
              min={0}
              className="form-inputs  w-1/5"
              placeholder="Price Add"
              name="priceAdd"
              id="priceAdd"
              onChange={handleChange2}
            />
          </div>
        )}

        {/* //!checkbox */}

        <div className="flex items-center text-xs space-x-2 text-gray-100">
          <input
            onClick={() => setChecked(!checked)}
            type="checkbox"
            className="cursor-pointer"
          />
          <p>Is there an upgrade?</p>
        </div>

        {category === "C" && (
          <div className="flex  space-x-2">
            <input
              type="text"
              name="available_sizes"
              onChange={handleClothesUniqueChange}
              className="form-inputs w-1/2"
              placeholder="s,m,..."
            />
            <input
              type="text"
              onChange={handleClothesUniqueChange}
              className="form-inputs w-1/2"
              name="available_colors"
              placeholder="red,yellow,..."
            />
          </div>
        )}
        <div className="flex items-center space-x-3">
          <input
            type="number"
            min={1}
            className="form-inputs w-1/2"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            min={0}
            className="form-inputs w-1/2"
            placeholder="discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="flex items-center text-xs space-x-2 text-gray-100">
          <input
            onClick={() => setFeatured(!featured)}
            type="checkbox"
            className="cursor-pointer"
          />
          <p>Is this to be featured?</p>
        </div>
        <button
          className="max-w-fit bg-cyan-600 text-white rounded-lg py-2 px-8 hover:bg-cyan-700 transition-all"
          type="submit"
        >
          Add
        </button>
        <img src={imageUrl} alt="" />
      </form>
    </main>
  );
}

export default AddProduct;
