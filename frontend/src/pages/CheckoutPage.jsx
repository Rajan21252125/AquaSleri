import Navbar from '../components/Navbar'
import CheckoutSteps from "../components/CheckoutSteps";
import Checkout from "../components/Checkout";
import Footer from '../components/Footer';

const CheckoutPage = () => {
  return (
    <div>
        <Navbar />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage