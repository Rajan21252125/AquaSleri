import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { addMultiImage, addProduct } from "../api";
import { toast } from "react-toastify";
import Select from 'react-select';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: [],
    images: [],
    realPrice: "",
    discountedPrice: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const options = [
    { value: 'Water Purifier', label: 'Water Purifier' },
    { value: 'Water Solution', label: 'Water Solution' },
    { value: 'New Arrival', label: 'New Arrival' },
  ];

  const handleChange = (selectedOptions) => {
    const categories = selectedOptions.map(option => option.value);
    setFormData({
      ...formData,
      category: categories
    });
  };
  
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      const fileArray = Array.from(files);
      if (formData.images.length + fileArray.length > 5) {
        toast.error("You can only upload up to 5 images");
        return;
      }
      setFormData({
        ...formData,
        images: [...formData.images, ...fileArray.slice(0, 5 - formData.images.length)],
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
    }
    if (!formData.description.trim()) {
      formErrors.description = "Description is required";
    }
    if (formData.category.length === 0) {
      formErrors.category = "Category is required";
    }
    if (!formData.images.length) {
      formErrors.images = "At least one image is required";
    } else {
      formData.images.forEach((image) => {
        if (!image.type.startsWith("image")) {
          formErrors.images = "Please upload PNG files only";
        }
      });
    }
    if (!formData.realPrice) {
      formErrors.realPrice = "Real price is required";
    }
    if (!formData.discountedPrice) {
      formErrors.discountedPrice = "Discounted price is required";
    }
    if (Object.keys(formErrors).length === 0) {
      try {
        setLoading(true);
        const imageUrls = await uploadMultiImage(formData.images);
        const productData = { ...formData, images: imageUrls.data };
        await addProduct(productData);
        toast.success("Product added successfully");
        resetForm();
      } catch (error) {
        console.error("Error adding product:", error);
        toast.error("Error adding product");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: [],
      images: [],
      realPrice: "",
      discountedPrice: "",
    });
    setErrors({});
  };

  const uploadMultiImage = async (images) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    try {
      const data = await addMultiImage(formData);
      return data.data;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-36 mt-8">
        <h1 className="text-3xl font-bold my-4 text-center">Add New Product</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleTextChange}
                placeholder="Enter product name"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleTextChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter product description"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block font-semibold mb-1">
                Category
              </label>
              <Select
                isMulti
                id="category"
                name="category"
                options={options}
                value={options.filter(option => formData.category.includes(option.value))}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md"
                placeholder="Enter product category"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="images" className="block font-semibold mb-1">
                Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleFileChange}
                accept="image"
                multiple
                className="w-full px-3 py-2 border rounded-md"
                disabled={formData.images.length === 5}
              />

              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}
              <div className="flex flex-wrap">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="mt-2 mr-2 w-24 h-24 object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="realPrice" className="block font-semibold mb-1">
                Real Price
              </label>
              <input
                type="number"
                id="realPrice"
                name="realPrice"
                value={formData.realPrice}
                onChange={handleTextChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter real price of the item."
              />
              {errors.realPrice && (
                <p className="text-red-500 text-sm">{errors.realPrice}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="discountedPrice"
                className="block font-semibold mb-1"
              >
                Discounted Price
              </label>
              <input
                type="number"
                id="discountedPrice"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleTextChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter discounted price of the item."
              />
              {errors.discountedPrice && (
                <p className="text-red-500 text-sm">{errors.discountedPrice}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="col-span-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Loading ...." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
