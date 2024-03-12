import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { removeUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // State for form inputs
  const [formData, setFormData] = useState({
    username: user?.fullName || "",
    password: "",
    image: user?.image || "",
  });

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Logout function
  const toggleLogout = () => {
    localStorage.removeItem("id");
    dispatch(removeUser());
    navigate("/");
  };

  // Drag and drop image
  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  // Function to handle clicking on the image
  const onImageClick = () => {
    // Trigger input file click event
    const inputElement = document.getElementById("imageUpload");
    inputElement.click();
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-lg shadow-md">
        {/* Edit profile form */}
        <form onSubmit={handleSubmit}>
          {/* Image upload */}
            <label className="block text-gray-700 font-bold mb-2">
              Image:
            </label>
          <div
            className={`mb-4 rounded-full h-48 w-full flex flex-col justify-center items-center cursor-pointer ${
              dragging ? "bg-gray-100" : ""
            }`}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            onClick={onImageClick} // Add onClick event handler
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-36 h-36 object-cover rounded-full"
              />
            ) : user?.image ? (
                <img
                src={user?.image}
                alt="Preview"
                className="w-36 h-36 object-cover rounded-full"
              />
            ) :  dragging ? (
              <span>Drop image</span>
            ) : (
              <span>Upload Image</span>
            )}
            <input
                className=""
                type="file"
                id="imageUpload"
                accept="image/*"
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setPreviewImage(URL.createObjectURL(file));
                  setFormData({ ...formData, image: file });
                }}
              />
          </div>
          {/* Username field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Username:
            </label>
            <input
              className="border rounded-md px-4 py-2 w-full"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {/* Password field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Password:
            </label>
            <input
              className="border rounded-md px-4 py-2 w-full"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {/* Submit button */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
      {/* Display email and phone number */}
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-700 font-bold">Email: {user?.email}</p>
        <p className="text-gray-700 font-bold">
          Phone Number: {user?.phone}
        </p>
      </div>
      {/* Logout button */}
      <div className="max-w-md mx-auto mt-8">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={toggleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
