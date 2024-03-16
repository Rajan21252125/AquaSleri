import { ABOUT } from "../constant/image";

const AboutUs = () => {
  return (
    <div className="mx-5 md:mx-20 lg:mx-40 mt-4 md:mt-10">
      <h2 className="md:mt-10 text-3xl md:text-5xl text-center">About Us</h2>
      <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-6 justify-center md:justify-evenly">
        <div className="md:w-1/2 mx-auto md:mx-0">
          <img src={ABOUT} alt="about" className="h-64 w-full md:h-auto md:w-96 rounded-lg" />
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 md:ml-8">
          <p className="text-sm lg:text-base md:text-lg text-gray-700">
            We, Aquasleri, located at Bhayandar East, Thane, Maharashtra, are focused on providing the best water purifier services to our customers. We are the right platform for you to come and get all types of services for water purifiers. Customer satisfaction is our first priority which keeps us at the top in this category. We maintain the highest standard of quality services to avoid any contamination. We have experienced and skilled technical team specialised in all brands of water purifier installation, service & repairs with exchange offer....
            <br />
            <span className="font-bold">Contact us today! </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
