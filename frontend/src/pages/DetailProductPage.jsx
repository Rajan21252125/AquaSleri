import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { addToCartApi } from '../api';

const DetailProductPage = () => {
    const { id } = useParams();
    const product = useSelector(state => state.product.products.find(product => product?._id === id));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useSelector((state) => state.userDetail);
  const navigate = useNavigate();


    const changeImage = (index) => {
        setCurrentImageIndex(index);
    };


    const handleCart = async (product) => {
        const cartData = [{
            productId: product._id,
            images : product.images,
            productName: product.name,
            price : product.discountedPrice
          }]
        if(!user?._id){
          toast.error("Please login first");
          navigate("/login")
          return;
        }
        try {
            const data = await addToCartApi(cartData)
            if (data?.data?.status === true) {
              // window.location.reload();
              toast.success(data?.data?.msg)
            }
          } catch (error) {
            toast.error(error?.response?.data?.msg)
          }

    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (product?.images) {
                const newIndex = (currentImageIndex + 1) % product.images.length;
                setCurrentImageIndex(newIndex);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImageIndex, product?.images]);

    return (
        <div className="container mx-auto">
            <Navbar />
            {product && ( // Check if product exists before rendering
                <div className="mt-8 mx-10 lg:mx-40 xl:mx-60">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <img src={product?.images[currentImageIndex]} alt={product?.name} className="w-96 h-96 object-contain" />
                            <div className="flex justify-center mt-2 space-x-2">
                                {product?.images?.map((image, index) => (
                                    <img key={index} src={image} alt={product?.name} className="w-12 h-12 cursor-pointer" onClick={() => changeImage(index)} />
                                ))}
                            </div>
                        </div>
                        <div className='mt-4 xl:w-1/2 text-center'>
                            <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
                            <p className="text-lg mb-4">{product?.description}</p>
                            <div className="flex flex-col space-y-4 justify-between items-center mb-4">
                                <div className='space-x-2 flex items-center'>
                                    <span className="text-xl font-bold">₹{product?.discountedPrice}</span>
                                    <span className="text-gray-500 line-through">₹{product?.realPrice}</span>
                                </div>
                                <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800" onClick={() => handleCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default DetailProductPage;
