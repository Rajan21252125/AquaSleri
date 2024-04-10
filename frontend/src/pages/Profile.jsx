import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { removeUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa";
import { logout, updateUser, uploadImage } from "../api";
import { toast } from "react-toastify";






const Profile = () => {
  const { user } = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [show , setShow ] = useState(false);
  const [ loading , setLoading ] = useState(false);
  const [ imageError , setImageError ] = useState(false);



  // State for form inputs
  const [formData, setFormData] = useState({
    email: user?.email,
    fullName: user?.fullName || "",
    password: "",
    image: user?.image || "",
  });

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Function to toggle show password
  const toggleShowPassword = () => {
    setShow(!show);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await uploadImg();
    if(imageError) return
    try {
      const reponse = await updateUser(formData)
      setLoading(false);
      toast.success(reponse.data.msg);
      setFormData({fullName: user?.fullName, password: "", image: user?.image});
      navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      setLoading(false)
    }
    setLoading(false);
  };

  // Logout function
  const toggleLogout = () => {
    logout()
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


  const uploadImg = async () => {
    const data = new FormData();
    data.append("image", formData.image);
    if (!data) return;
    try {
      const response = await uploadImage(data);
      if (response.status !== 200) {
        setImageError(true);
        return;
      }
      setFormData({ ...formData, image: response.data.imageUrl })
      setImageError(false);
    } catch (error) {
      if (error?.response?.status === 400) return
      toast.error(error?.response?.data?.msg)
      setImageError(true);
    }

  }


  const typeOfUser = localStorage.getItem("typeOfUser");

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
          {/* fullName field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Email Id:
            </label>
            <input
              className="border rounded-md px-4 py-2 w-full"
              type="text"
              name="email"
              value={formData.email}
              readOnly  
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Full Name:
            </label>
            <input
              className="border rounded-md px-4 py-2 w-full"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          {/* Password field */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-bold mb-2">
              Password:
            </label>
            <input
              className={`border rounded-md px-4 py-2 w-full ${typeOfUser ? "cursor-not-allowed" : "" }`}
              type={show ? "text" : "password"}
              disabled={typeOfUser ? true : false}
              name="password"
              value={formData.password}
              onChange={!typeOfUser ? handleChange : null }
            />
            <span className="absolute right-4 top-10 cursor-pointer text-2xl" onClick={toggleShowPassword}>{show ? <FaRegEye /> : <FaRegEyeSlash /> }</span>
          </div>
          {/* Submit button */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            type="submit"
          >
            {loading ? "Loading...." : "Save Changes"}
          </button>
        </form>
      {/* Logout button */}
      <div className="my-2 mb-14">
        <button
          className="bg-red-500 text-white w-full cursor-pointer py-2 px-4 rounded-md hover:bg-red-600"
          onClick={toggleLogout}
        >
          Logout
        </button>
      </div>
      </div>
    </div>
  );
};

export default Profile;
