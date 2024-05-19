import Navbar from '../components/Navbar'
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from '../components/Footer';
import Payment from '../components/Payment';

const PaymentPage = () => {
  return (
    <div>
        <Navbar />
        <br />
        <br />
        <CheckoutSteps active={2} />
        <Payment />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default PaymentPage