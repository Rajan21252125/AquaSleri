import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Service = () => {
  const services = [
    { name: "STP Plants", description: "Sewage treatment plants (STPs) are used to remove contaminants from wastewater, making it suitable for discharge or reuse." },
    { name: "ETP Plants", description: "Effluent treatment plants (ETPs) are designed to treat industrial wastewater and remove pollutants before discharge into the environment." },
    { name: "RO Plants", description: "Reverse osmosis (RO) plants use a membrane to remove ions, molecules, and larger particles from water, making it suitable for drinking or industrial use." },
    { name: "Water Treatment Plants", description: "Water treatment plants are facilities that treat raw water to remove impurities and contaminants, producing clean and safe drinking water." },
    { name: "Softener Plants", description: "Water softener plants remove calcium and magnesium ions from hard water, preventing scale buildup in pipes and appliances." },
    { name: "Rain Water Harvesting", description: "Rainwater harvesting systems collect and store rainwater for later use, reducing reliance on traditional water sources and mitigating runoff and erosion." },
    { name: "Ring Well", description: "Ring wells are constructed by drilling a borehole into the ground and installing a casing to prevent collapse. They provide access to groundwater for drinking or irrigation purposes." }
  ];

  return (
    <div>
      <Navbar />
      <div className="my-8 mx-4 lg:mx-40">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold mb-4">{service.name}</h2>
              <p className="text-gray-600">{service.description}</p>
              <button className="bg-gray-900 text-white py-2 px-4 mt-4 rounded hover:bg-gray-800 transition duration-300">Learn More</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
