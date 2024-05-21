/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { addMultiImage, deleteSingleImage, updateProduct } from "../api";
import { toast } from "react-toastify";
import Select from "react-select";
import { ImCross } from "react-icons/im";
import { MdDelete } from "react-icons/md";

const UpdateProduct = ({ data, setToggleShow }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: [],
    images: [],
    realPrice: "",
    discountedPrice: "",
  });
  const [loading, setLoading] = useState(false);

  const options = [
    { value: 'Water Purifier - Premium', label: 'Water Purifier - Premium' },
    { value: 'Water Purifier - Mid Range', label: 'Water Purifier - Mid Range' },
    { value: 'Water Purifier - Budget Friendly', label: 'Water Purifier - Budget Friendly' },
    { value: 'Spare Parts', label: 'Spare Parts' },
    { value: 'Universal Kits & sets', label: 'Universal Kits & sets' },
    { value: 'New Arrivals', label: 'New Arrivals' },
  ];

  const handleChange = (selectedOptions) => {
    const categories = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      category: categories,
    });
  };

  const handleTextChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name !== "images") return;
    const fileArray = Array.from(files);
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const selectedFiles = fileArray.filter((file) =>
      allowedTypes.includes(file.type)
    );
    if (selectedFiles.length > 10) {
      toast.error("You can only upload up to 10 images");
      return;
    } else if (selectedFiles.length < fileArray.length) {
      toast.warning("Only JPG, JPEG, or PNG files are allowed");
    }
    const imagePreviews = selectedFiles.map((file) => {
      const imageObjectURL = URL.createObjectURL(file);
      return { file, url: imageObjectURL };
    });
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        ...imagePreviews.slice(0, 10 - formData.images.length),
      ],
    });
  };
  
  useEffect(() => {
    if (data) {
      setFormData({
        name: data?.name,
        description: data?.description,
        category: data?.category,
        images: data?.images,
        realPrice: data?.realPrice,
        discountedPrice: data?.discountedPrice,
      });
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const newImages = formData.images.filter((image) => typeof image !== 'string');
      if (newImages.length > 0) {
        const imageUrls = await uploadMultiImage(newImages);
        formData.images = formData.images.filter((img) => typeof img === 'string');
        imageUrls.data.forEach((image) => {
          formData.images.push(image);
        })
      }
      const response = await updateProduct(formData, data?._id);
      if (response.status) {
        toast.success(response.data.msg);
        setToggleShow(false);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    } finally {
      setLoading(false);
    }
  };
  
  
  const uploadMultiImage = async (images) => {
    const form = new FormData();
    images.forEach((image) => {
      form.append("images", image.file);
    });
    try {
      const data = await addMultiImage(form);
      return data.data;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleDeleteImage = async (index) => {
    if (formData.images[index].url) {
      const newImages = formData.images.filter((image, idx) => idx !== index);
      setFormData({ ...formData, images: newImages });
      return;
    }
    const imageId = data._id;
    const imageUrl = formData.images[index];
    try {
      const res = await deleteSingleImage(imageId, imageUrl);
      toast.success(res.data.msg);
      if (!res.data.status) {
        toast.error(res.data.msg);
      }
      const newImages = formData.images.filter((image, idx) => idx !== index);
      setFormData({ ...formData, images: newImages });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-36 p-10 -top-10 border right-0 shadow-2xl absolute bg-white overflow-auto">
      <ImCross
        className="absolute right-10 text-red-600 cursor-pointer"
        onClick={() => setToggleShow(false)}
      />
      <h1 className="text-3xl font-bold my-4 text-center">Update Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="font-semibold mb-1">
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
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleTextChange}
              className="w-full px-3 py-2 border rounded-md h-32"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="font-semibold mb-1">
              Category
            </label>
            <Select
              isMulti
              id="category"
              name="category"
              options={options}
              value={options.filter((option) =>
                formData.category.includes(option.value)
              )}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md"
              placeholder="Enter product category"
            />
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label htmlFor="images" className="font-semibold mb-1">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="w-full px-3 py-2 border rounded-md"
              disabled={formData.images.length === 5}
            />
            <div className="flex flex-wrap">
              {formData?.images?.map((image, index) => (
                <div key={index} className="relative">
                  <MdDelete
                    className="absolute top-3 right-3 text-red-700 cursor-pointer bg-white rounded-md"
                    onClick={() => handleDeleteImage(index)}
                  />
                  <img
                    key={index}
                    src={image.url ? image.url : image}
                    alt={`Preview ${index + 1}`}
                    className="mt-2 mr-2 w-24 h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="realPrice" className="font-semibold mb-1">
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
          </div>
          <div className="mb-4">
            <label htmlFor="discountedPrice" className="font-semibold mb-1">
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
          </div>
        </div>
        <button
          type="submit"
          className="col-span-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading ...." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
