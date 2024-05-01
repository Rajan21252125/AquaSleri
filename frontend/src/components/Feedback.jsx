/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Facebook from "../styles/Facebook";
import Insta from "../styles/Insta";
import Linkedin from "../styles/Linkedin";
import Mail from "../styles/Mail";
import { useSelector } from "react-redux";
import { addFeedback } from "../api";
import { toast } from "react-toastify";



const Feedback = () => {
  const {user} = useSelector((state) => state.userDetail);
  const [feedBackData , setFeedBackData] = useState({
    "name": user?.fullName,
    "email": user?.email,
    "subject": "",
    "message": ""
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedBackData({ ...feedBackData, [name]: value });
  };
  const handlSubmitForm = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await addFeedback(feedBackData);
      
      if (response?.data?.status === true) return toast.success(response?.data?.msg);
      return toast.error(response?.data?.msg);
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setFeedBackData({
        "name": user?.fullName,
        "email": user?.email,
        "subject": "",
        "message": ""
      })
      setLoading(false)
    }
  }
  return (
    <div className="my-6">
      <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-7xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
        <div>
          <h1 className="text-3xl font-extrabold">Let's Talk</h1>
          <p className="text-sm text-gray-400 mt-3">
            Have some big idea or brand to develop and need help? Then reach out
            we'd love to hear about your project and provide help.
          </p>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold">Email</h2>
            <ul className="mt-3">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <Mail />
                </div>
                <a
                  target="_blank"
                  href="mailto:aquasleri@gmail.com"
                  className="text-[#007bff] text-sm ml-3"
                >
                  <small className="block">Mail</small>
                  <strong>aquasleri@gmail.com</strong>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold">Socials</h2>
            <ul className="flex mt-3 space-x-4">
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="">
                  <Facebook />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="">
                  <Linkedin />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="">
                    <Insta />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form className="ml-auo space-y-4" onSubmit={handlSubmitForm}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={feedBackData.name}
            onChange={handleInputChange}
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={feedBackData.email}
            onChange={handleInputChange}
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={feedBackData.subject}
            onChange={handleInputChange}
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
          <textarea
            placeholder="Message"
            rows="6"
            name="message"
            value={feedBackData.message}
            onChange={handleInputChange}
            className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
          ></textarea>
          <button
            type="submit"
            className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
