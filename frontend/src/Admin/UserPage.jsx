import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { users } from "../api";

const UserPage = () => {
    const [userData , setUserData] = useState([]);
    const fetch = async () => {
        try {
            const response = await users();
            setUserData(response?.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetch();
    },[])

  return (
    <div>
      <AdminNavbar />
      <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-36 mt-8">
        <h1 className="text-3xl font-bold my-4 text-center">User Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userData.map((user) => (
            <div key={user?._id} className="bg-white shadow-lg rounded-lg p-4">
                {user?.image ? (<img src={user?.image} alt={user?.fullName} className="w-24 h-24 mx-auto rounded-full mb-4 object-contain" />) : (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVhtFJc9v3hEBfhJiOhYMS_60ieEbiOjPJyxl8F2dIBw&s" alt={user?.fullName} className="w-24 h-24 mx-auto rounded-full mb-4 object-contain" />)}
              
              <div className="text-center">
                <h2 className="text-lg font-semibold">{user?.fullName}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-gray-500 text-sm">{new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
