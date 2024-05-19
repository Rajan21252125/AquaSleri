import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie";
import animationData from "../assets/animations/107043-success.json";
import CheckoutSteps from "../components/CheckoutSteps";

const OrderSuccessPage = () => {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <CheckoutSteps active={3} />
      <Success />
      <br />
        <br />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
