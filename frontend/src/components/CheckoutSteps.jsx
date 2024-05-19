/* eslint-disable react/prop-types */


const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center flex-wrap">
        <div className="flex items-center">
          <div className={`px-[20px] h-[38px] rounded-[20px] flex items-center justify-center cursor-pointer ${active === 1 ? "bg-gray-800" :  "!bg-gray-500"}`}>
            <span className="text-[#fff] text-[16px] font-[600]">Shipping</span>
          </div>
        </div>

        <div className="flex items-center">
          <div
            className={`${
              active > 2
                ? "w-[10px] md:w-[70px] h-[4px] !bg-gray-500"
                : "w-[10px] md:w-[70px] h-[4px] !bg-gray-500"
            }`}
          />
          <div
            className={`px-[20px] h-[38px] rounded-[20px] flex items-center justify-center cursor-pointer ${active === 2 ? "bg-gray-800" :  "!bg-gray-500"}`}
          >
            <span
              className={`text-[16px] font-[600] ${active > 1? "text-[#fff]": "!text-white"}`}
            >
              Payment
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`${
              active > 3
                ? "w-[10px] md:w-[70px] h-[4px] !bg-gray-500"
                : "w-[10px] md:w-[70px] h-[4px] !bg-gray-500"
            }`}
          />
          <div
            className={`px-[20px] h-[38px] rounded-[20px] flex items-center justify-center cursor-pointer ${active === 3 ? "bg-gray-800" :  "!bg-gray-500"}`}
          >
            <span
              className={`text-[16px] font-[600] ${active > 1? "text-[#fff]": "!text-white"}`}
            >
              Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
