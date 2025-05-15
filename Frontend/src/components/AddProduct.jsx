import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Prepare the product object with correct data types
    const finalProduct = {
      ...product,
      price: parseFloat(product.price),
      stockQuantity: parseInt(product.stockQuantity),
      productAvailable: Boolean(product.productAvailable),
    };

    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(finalProduct)], { type: "application/json" })
    );

    try {
      const response = await axios.post("http://localhost:9090/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Error adding product: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label"><h6>Name</h6></label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label"><h6>Brand</h6></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Brand"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label"><h6>Description</h6></label>
            <input
              type="text"
              className="form-control"
              placeholder="Add product description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-5">
            <label className="form-label"><h6>Price (in ₹)</h6></label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: ₹1000"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>


          <div className="col-md-6">
            <label className="form-label"><h6>Category</h6></label>
            <select
              className="form-select"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Stock Quantity</h6></label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Release Date</h6></label>
            <input
              type="date"
              className="form-control"
              name="releaseDate"
              value={product.releaseDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Image</h6></label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct({ ...product, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Product Available
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
