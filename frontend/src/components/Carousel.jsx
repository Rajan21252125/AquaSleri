import { useState, useEffect } from "react";
import { SLIDER_IMG } from "../constant/image";
import { FaRegArrowAltCircleLeft , FaRegArrowAltCircleRight } from "react-icons/fa";

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(current => current === SLIDER_IMG.length - 1 ? 0 : current + 1);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrent(current === SLIDER_IMG.length - 1 ? 0 : current + 1);
    };

    const previousSlide = () => {
        setCurrent(current === 0 ? SLIDER_IMG.length - 1 : current - 1);
    };

    return (
        <div className="relative">
            <div className="overflow-hidden w-screen">
                <div className="flex transition ease-out duration-300 scroll-smooth" style={{transform : `translate(-${current * 100}%)`}}>
                    {SLIDER_IMG.map((img, index) => {
                        return <img key={index} src={img} alt="slider" className="min-w-[100%] h-auto" />;
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
                        className={`h-2 w-2  md:h-4 md:w-4 rounded-full ${current === index ? 'bg-white' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;