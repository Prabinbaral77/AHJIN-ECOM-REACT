import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [imageUrl2, setimageUrl2] = useState("");
  const [imageUrl3, setimageUrl3] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [d_cat, setd_cat] = useState("");
  const [idToBeUpdated, setidToBeUpdated] = useState("");
  const [availableColors, setavailableColors] = useState(null);
  const [availableSizes, setavailableSizes] = useState(null);
  const [RAM, setRAM] = useState(null);
  const [SSD, setSSD] = useState(null);
  const [priceAdd, setPriceAdd] = useState(0);
  const [count, setCount] = useState(null);
  const [availableColors2, setavailableColors2] = useState(null);

  const [RAM2, setRAM2] = useState(null);
  const [SSD2, setSSD2] = useState(null);
  const [priceAdd2, setPriceAdd2] = useState(null);
  const [count2, setCount2] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [recievedUniqueFeature, setrecievedUniqueFeature] = useState([]);
  const [newObj, setnewObj] = useState({});
  const [newObj2, setnewObj2] = useState({});
  const [clothesNewObj, setclothesNewObj] = useState({});
  const [newArr, setnewArr] = useState([]);

  // const [clothesUniqueFeatures, setclothesUniqueFeatures] = useState({
  //   available_colors: [],
  //   available_sizes: [],
  //   count: "",
  // });
  // const [uniqueFeatures, setuniqueFeatures] = useState({
  //   RAM: 0,
  //   SSD: 0,
  //   count: 0,
  //   color: [],
  //   priceAdd: 0,
  // });
  // const [uniqueFeatures2, setuniqueFeatures2] = useState({
  //   RAM: 0,
  //   SSD: 0,
  //   count: 0,
  //   color: [],
  //   priceAdd: 0,
  // });

  // const handleChange = (e) => {
  //   if (e.target.name !== "color") {
  //     setuniqueFeatures({
  //       ...uniqueFeatures,
  //       [e.target.name]: e.target.value,
  //     });
  //   } else {
  //     setuniqueFeatures({
  //       ...uniqueFeatures,
  //       [e.target.name]: e.target.value.split(","),
  //     });
  //   }
  // };
  // const handleChange2 = (e) => {
  //   if (e.target.name !== "color") {
  //     setuniqueFeatures2({
  //       ...uniqueFeatures2,
  //       [e.target.name]: e.target.value,
  //     });
  //   } else {
  //     setuniqueFeatures2({
  //       ...uniqueFeatures2,
  //       [e.target.name]: e.target.value.split(","),
  //     });
  //   }
  // };

  // const handleClothesUniqueChange = (e) => {
  //   if(e.target.name !== "count"){
  //     setclothesUniqueFeatures({
  //       ...clothesUniqueFeatures,
  //       [e.target.name]: e.target.value.split(","),
  //     });
  //   }else{
  //     setclothesUniqueFeatures({
  //       ...clothesUniqueFeatures,
  //       [e.target.name]: e.target.value
  //     });
  //   }
  // };

  const fetchProducts = async () => {
    axios
      .get("http://localhost:8000/api/products/")
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
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
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

  const handleEditClick = (
    id,
    imageUrl,
    imageUrl2,
    imageUrl3,
    title,
    description,
    category,
    d_cat,
    price,
    discount,
    uniqueFeature,
    featured
  ) => {
    setidToBeUpdated(id);
    setimageUrl(imageUrl);
    setimageUrl2(imageUrl2);
    setimageUrl3(imageUrl3);
    setTitle(title);
    setDescription(description);
    setCategory(category);
    setd_cat(d_cat);
    setrecievedUniqueFeature(uniqueFeature);
    setPrice(price);
    setDiscount(discount);
    setFeatured(featured);
    if (category === "E" && uniqueFeature.length === 1) {
      setRAM(uniqueFeature[0].RAM);
      setSSD(uniqueFeature[0].SSD);
      setavailableColors(uniqueFeature[0].color);
    }

    if (category === "C") {
      setavailableSizes(uniqueFeature[0].available_sizes);
      setavailableColors(uniqueFeature[0].available_colors);
    }

    if (uniqueFeature.length > 1) {
      setRAM(uniqueFeature[0].RAM);
      setSSD(uniqueFeature[0].SSD);
      setavailableColors(uniqueFeature[0].color);
      setRAM2(uniqueFeature[1].RAM);
      setSSD2(uniqueFeature[1].SSD);
      setavailableColors2(uniqueFeature[1].color);
      setCount2(uniqueFeature[1].count);
      setPriceAdd2(uniqueFeature[1].priceAdd);
    }
    setCount(uniqueFeature[0].count);
  };

  const handleImageUpdateClick = async (e) => {
    e.preventDefault();
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

  const handleEditSubmit = async (e) => {
    if (category === "E" && recievedUniqueFeature.length === 1) {
      newArr.push(newObj);
    }
    if (category === "C") {
      newArr.push(clothesNewObj);
    }
    if (recievedUniqueFeature.length === 2) {
      newArr.push(newObj);
      newArr.push(newObj2);
    }
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8000/api/products/${idToBeUpdated}`,
        {
          name: title,
          description: description,
          price_m: price,
          discount: discount,
          featured: featured,
          unique_feature: newArr,
          image: imageUrl,
          image2: imageUrl2,
          image3: imageUrl3,
          cat: category,
        },
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      toast.success("Product updated successfully.");
      fetchProducts();

      if (recievedUniqueFeature.length === 1) {
        newArr.pop();
      } else {
        newArr.pop();
        newArr.pop();
      }
      setidToBeUpdated("");
    } catch (error) {
      console.log(error);
      toast.error("Update unsuccessfull");
    }
  };
  useEffect(() => {
    setnewObj({
      RAM: RAM,
      SSD: SSD,
      color: availableColors,
      count: count,
      priceAdd: priceAdd,
    });
  }, [idToBeUpdated, RAM, SSD, availableColors, count, priceAdd]);

  useEffect(() => {
    setnewObj2({
      RAM: RAM2,
      SSD: SSD2,
      color: availableColors2,
      count: count2,
      priceAdd: priceAdd2,
    });
  }, [idToBeUpdated, RAM2, SSD2, availableColors2, count2, priceAdd2]);

  useEffect(() => {
    setclothesNewObj({
      available_colors: availableColors,
      available_sizes: availableSizes,
      count: count,
    });
  }, [idToBeUpdated, availableSizes, availableColors, count]);

  // console.log(newArr)

  const handleXClick = () => {
    setidToBeUpdated("");
  };

  //  console.log(recievedUniqueFeature);

  // console.log(RAM2, SSD2, availableColors2,count2,priceAdd2);

  // console.log( newObj2)

  return (
    <div className="lg:col-span-10 col-span-12 relative  max-h-screen overflow-scroll scrollbar-hide text-[10px] lg:text-sm  ">
      <Toaster />
      <nav className="  text-cyan-500 text-center font-semibold grid grid-cols-12 px-4 bg-gray-800 shadow-md py-4 sticky top-0 z-50">
        <p className=" uppercase col-span-1">SN</p>
        <p className="lg:col-span-2 col-span-3 uppercase">Image</p>
        <p className="lg:col-span-2 col-span-3 uppercase ">Title</p>
        <p className="col-span-2 uppercase">Category</p>
        <p className="col-span-2 uppercase">D_Cat</p>
        <p className="col-span-1 uppercase">Price</p>
      </nav>
      {/* Users */}
      {products.map((product, index) => (
        <div className=" flex flex-col space-y-4 py-4">
          <section className="grid grid-cols-12 place-items-center  text-center text-gray-100 px-4 py-4">
            <p className="col-span-1">{index + 1}</p>
            <p className="lg:col-span-2 col-span-3">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  className="h-28 w-32 object-cover"
                  alt=""
                />
              </Link>
            </p>
            <p className="lg:col-span-2 col-span-3">{product.name}</p>
            <p className="col-span-2">
              {product?.cat == "E" && "Electronics"}
              {product?.cat == "C" && "Clothes"}
              {product?.cat == "O" && "Others"}
            </p>
            <p className="col-span-2">{product.d_cat}</p>
            <p className="col-span-1 text-yellow-500">RS {product?.price_m}</p>
            <div className="flex space-x-3 pl-8 w-full py-4">
              <button
                onClick={() =>
                  handleEditClick(
                    product.id,
                    product.image,
                    product.image2,
                    product.image3,
                    product.name,
                    product.description,
                    product.cat,
                    product.d_cat,
                    product.price_m,
                    product.discount,
                    product.unique_feature,
                    product.featured
                  )
                }
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
            </div>
          </section>
          <hr className="w-[90%] mx-auto" />
        </div>
      ))}

      {idToBeUpdated && (
        <div className="fixed lg:right-10 lg:top-5 top-10 lg:w-[80.5%] w-full text-sm h-screen bg-black/40 py-20">
          <Fade top>
            <form
              onSubmit={handleEditSubmit}
              className="h-auto relative  w-3/4 mx-auto flex flex-col space-y-3 p-6 shadow-lg shadow-cyan-400/40  bg-gray-500 rounded-lg"
            >
              <XIcon
                onClick={handleXClick}
                className="h-5 w-5 cursor-pointer hover:rotate-180 absolute right-2 top-2 text-gray-100"
              />
              <div className="flex items-center">
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  className="file:bg-purple-500 lg:w-1/3 w-1/2 text-xs file:py-1.5 file:rounded-full file:border-none file:cursor-pointer file:text-white text-white"
                />
                <input
                  onChange={(e) => setImage2(e.target.files[0])}
                  type="file"
                  className="file:bg-purple-500 lg:w-1/3 w-1/2 text-xs file:py-1.5 file:rounded-full file:border-none file:cursor-pointer file:text-white text-white"
                />
                <input
                  onChange={(e) => setImage3(e.target.files[0])}
                  type="file"
                  className="file:bg-purple-500 lg:w-1/3 w-1/2 text-xs file:py-1.5 file:rounded-full file:border-none file:cursor-pointer file:text-white text-white"
                />
                <button
                  onClick={handleImageUpdateClick}
                  className="text-xs text-gray-100 bg-gray-900 py-1"
                >
                  update images
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
                className="rounded-sm text-sm bg-gray-700 outline-none text-gray-100 px-2 py-1"
                placeholder="description"
              ></textarea>

              {category === "E" && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    min={1}
                    className="form-inputs w-1/3"
                    placeholder="RAM"
                    name="RAM"
                    id="RAM"
                    value={RAM}
                    onChange={(e) => setRAM(e.target.value)}
                  />
                  <input
                    type="text"
                    min={1}
                    className="form-inputs w-1/3"
                    placeholder="SSD"
                    onChange={(e) => setSSD(e.target.value)}
                    name="SSD"
                    value={SSD}
                    id="SSD"
                  />

                  <input
                    type="text"
                    min={1}
                    className="form-inputs w-1/3"
                    value={availableColors}
                    name="color"
                    onChange={(e) =>
                      setavailableColors(e.target.value.split(","))
                    }
                    id="Color"
                  />
                  <input
                    type="number"
                    min={0}
                    // placeholder ={ recievedUniqueFeature[0].count}
                    className="form-inputs w-1/3"
                    name="count"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    id="count"
                  />
                </div>
              )}

              {recievedUniqueFeature.length > 1 ? (
                <div
                  className={`flex ${
                    d_cat !== "laptop" && "hidden"
                  } items-center space-x-2`}
                >
                  <input
                    type="number"
                    min={1}
                    className="form-inputs w-1/3"
                    placeholder="RAM"
                    value={RAM2}
                    name="RAM"
                    id="RAM"
                    onChange={(e) => setRAM2(e.target.value)}
                  />
                  <input
                    type="text"
                    min={1}
                    className="form-inputs w-1/3"
                    value={SSD2}
                    placeholder="SSD"
                    onChange={(e) => setSSD2(e.target.value)}
                    name="SSD"
                    id="SSD"
                  />
                  <input
                    type="text"
                    min={1}
                    className="form-inputs w-1/3"
                    value={availableColors2}
                    onChange={(e) =>
                      setavailableColors2(e.target.value.split(","))
                    }
                    placeholder="Color"
                    name="Color"
                    id="Color"
                  />
                  <input
                    type="number"
                    value={count2}
                    onChange={(e) => setCount2(parseInt(e.target.value))}
                    min={0}
                    className="form-inputs w-1/3"
                    placeholder="count"
                    name="count"
                    id="count"
                  />
                  <input
                    type="number"
                    min={0}
                    onChange={(e) => setPriceAdd2(parseInt(e.target.value))}
                    value={priceAdd2}
                    className="form-inputs w-1/3"
                    placeholder="priceAdd"
                    name="priceAdd"
                    id="priceAdd"
                  />
                </div>
              ) : (
                ""
              )}
              {category === "C" && (
                <>
                  <input
                    // value={recievedUniqueFeature[0].available_sizes.join(',')}
                    type="text"
                    className="form-inputs"
                    placeholder="s,m,..."
                    onChange={(e) =>
                      setavailableSizes(e.target.value.split(","))
                    }
                    name="available_sizes"
                    value={availableSizes}
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      setavailableColors(e.target.value.split(","))
                    }
                    className="form-inputs"
                    placeholder="red,yellow,..."
                    name="available_colors"
                    value={availableColors}
                  />
                  <input
                    type="number"
                    // value={recievedUniqueFeature[0].count}
                    min={0}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="form-inputs"
                    placeholder="count"
                    value={count}
                    name="count"
                    id="count"
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
              <div className="flex items-center text-xs space-x-2 text-gray-100">
                <input
                  onClick={() => setFeatured(!featured)}
                  type="checkbox"
                  checked={featured === true}
                  className="cursor-pointer"
                />
                <p>Is this to be featured?</p>
              </div>
              <button
                className="max-w-fit bg-cyan-500 text-white rounded-lg py-1.5 px-8 hover:bg-cyan-600 transition-all duration-500"
                type="submit"
              >
                Edit
              </button>
              <div className="flex items-center space-x-4">
                <img src={imageUrl} className="h-40 w-40 object-cover" alt="" />
                <img
                  src={imageUrl2}
                  className="h-40 w-40 object-cover"
                  alt=""
                />
                <img
                  src={imageUrl3}
                  className="h-40 w-40 object-cover"
                  alt=""
                />
              </div>
            </form>
          </Fade>
        </div>
      )}
    </div>
  );
}

export default Product;
