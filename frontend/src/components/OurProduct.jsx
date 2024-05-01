import { useSelector } from 'react-redux';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const OurProduct = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <div className="mt-10">
      <div>
        <h1 className="text-3xl md:text-5xl text-center relative pb-4">Our Product</h1>
        <div className='gap-8 mx-10 lg:mx-40 xl:mx-60 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4'>
          {!products ? <Loading /> : products.slice(0, 6).map((product) => ( 
            <div key={product._id} className="flex flex-col items-center">
              <Link to={"/product/"+product?._id}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-60 h-60 object-cover rounded-lg hover:scale-110 transition-all cursor-pointer"
                />
                </Link>
              <h2 className="text-base mt-2 text-center">{product.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProduct;
