import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateOutfitsform = ({ onClose, outfitId, category }) => {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    gender: "",
    category: "",
    description: "",
    sizes: "",
    stock: "",
    rent: "",
    mrp: "",
    deposit: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing outfit details
  useEffect(() => {
    const fetchOutfitDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://outfits-of-joy.onrender.com/outfits-of-joy/collection/${category}/${outfitId}`
        );
        const data = response.data;
        // Convert sizes array to comma-separated string
        const sizesString = data.sizes.join(",");

        // Set form data with fetched details
        setFormData({
          ...data,
          sizes: sizesString,
        });
      } catch (err) {
        setError("Failed to fetch outfit details. Please try again.");
        toast.error("Failed to fetch outfit details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOutfitDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [outfitId, category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedImages = [...formData.images];
    updatedImages[index] = file;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Convert numeric fields to numbers
    const numericFields = ["stock", "rent", "mrp", "deposit"];
    const updatedFormData = { ...formData };
    numericFields.forEach((field) => {
      updatedFormData[field] = parseInt(updatedFormData[field]);
    });

    // Convert sizes string to array
    updatedFormData.sizes = updatedFormData.sizes.split(",");

    // Append all form fields to the FormData object
    for (const key in updatedFormData) {
      if (key === "images") {
        updatedFormData[key].forEach((file) => data.append("images", file)); // Append image files
      } else {
        data.append(key, updatedFormData[key]); // Append other fields
      }
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `https://outfits-of-joy.onrender.com/outfits-of-joy/collection/${formData.category}/${formData._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Outfit updated successfully!");
      onClose();
    } catch (err) {
      setError("Failed to update outfit. Please try again.");
      toast.error("Failed to update outfit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute z-10 top-[30%] right-[15%]">
      <div
        className="bg-white rounded-lg p-6 w-[90%] sm:w-[600px] relative"
        style={{ boxShadow: "0 0 20px 20px rgba(0, 0, 0, 0.5)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold hover:text-red-500"
        >
          ✖
        </button>

        <h2 className="text-2xl font-joti text-center mb-4">Update Outfit</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Product ID and Title */}
          <div className="flex gap-4">
            <div className="w-1/4">
              <label className="block font-bree">Product ID:</label>
              <input
                type="text"
                name="_id"
                value={formData._id}
                onChange={handleChange}
                className="w-full focus:outline-none rounded-lg p-2"
                readOnly
                style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
              />
            </div>

            <div className="w-3/4">
              <label className="block font-bree">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full focus:outline-none rounded-lg p-2"
                required
                style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
              />
            </div>
          </div>

          {/* Gender and Category */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-bree">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full focus:outline-none rounded-lg p-2"
                required
                style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block font-bree">Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full focus:outline-none rounded-lg p-2"
                required
                style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="sherwani">Sherwani</option>
                <option value="indo-western">Indo-Western</option>
                <option value="tuxedo">Tuxedo</option>
                <option value="lehenga">Lehenga</option>
                <option value="anarkali">Anarkali</option>
                <option value="gown">Gown</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bree">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full focus:outline-none rounded-lg p-2"
              rows="3"
              required
              style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
            ></textarea>
          </div>

          {/* Sizes and Stock */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-bree">Sizes (comma-separated):</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                className="w-full rounded-lg p-2 focus:outline-none"
                required
                style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-bree">Stock:</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-lg p-2 focus:outline-none"
                required
                style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
              />
            </div>
          </div>

          {/* Rent and MRP */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-bree">Rent:</label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                className="w-full rounded-lg p-2 focus:outline-none"
                required
                style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-bree">MRP:</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full rounded-lg p-2 focus:outline-none"
                required
                style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
              />
            </div>
          </div>

          {/* Deposit */}
          <div>
            <label className="block font-bree">Deposit:</label>
            <input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              className="w-full rounded-lg p-2 focus:outline-none"
              required
              style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
            />
          </div>

          {/* Image Upload Fields */}
          <div className="space-y-3">
            <label className="block font-bree">Upload Images:</label>
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <label className="block font-bree">Image {index + 1}:</label>
                <input
                  type="file"
                  name={`image${index + 1}`}
                  onChange={(e) => handleImageChange(e, index)}
                  className="w-full rounded-lg p-2 focus:outline-none"
                  style={{ boxShadow: "0 9px 15px 6px rgba(0, 0, 0, 0.5)" }}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOutfitsform;