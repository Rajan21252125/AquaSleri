import { useState, useEffect } from "react";
import { SLIDER_IMG } from "../constant/image";
import { FaRegArrowAltCircleLeft , FaRegArrowAltCircleRight } from "react-icons/fa";

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(current => current === SLIDER_IMG.length - 1 ? 0 : current + 1);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrent(current === SLIDER_IMG.length - 1 ? 0 : current + 1);
    };

    const previousSlide = () => {
        setCurrent(current === 0 ? SLIDER_IMG.length - 1 : current - 1);
    };

    const goToSlide = (index) => {
        setCurrent(index);
    };

    return (
        <div className="relative flex justify-center w-screen">
            <div className="overflow-hidden">
                <div className="flex transition ease-out duration-300 scroll-smooth" style={{transform : `translate(-${current * 100}%)`}}>
                    {SLIDER_IMG.map((img, index) => {
                        return <img key={index} src={img} alt="slider" className="min-w-[100%] h-60 object-contain md:h-auto bg-gradient-to-b  from-black/65" />;
                    })}
                </div>
            </div>
            <div className="absolute top-1/2 left-4 md:left-10 right-4 md:right-10 flex justify-between">
                <FaRegArrowAltCircleLeft className="text-lg md:text-3xl text-gray-400 hover:text-gray-800 cursor-pointer" onClick={previousSlide}/>
                <FaRegArrowAltCircleRight className="text-lg md:text-3xl text-gray-400 hover:text-gray-800 cursor-pointer" onClick={nextSlide}/>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {SLIDER_IMG.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 md:h-3 rounded-full ${current === index ? 'bg-white w-4 md:w-12' : 'bg-gray-400 w-1 md:w-3'} cursor-pointer transition ease-out duration-300`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
