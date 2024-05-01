import CheckoutSteps from '../components/CheckoutSteps';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import Payment from "../components/Payment";

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
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