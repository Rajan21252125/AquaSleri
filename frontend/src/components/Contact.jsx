import { GrMapLocation } from "react-icons/gr";
import { IoCallOutline, IoMailOpenOutline } from "react-icons/io5";
import { FiClock } from "react-icons/fi";


const Contact = () => {
  return (
    <div className="my-16 mx-0 lg:mx-28 px-6">
        <h1 className="text-3xl md:text-5xl text-center my-8">Contact Us</h1>
      <section className="mb-32">
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-center">
            <div className="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
              <div className="h-[300px] md:h-[500px] w-full">
                <iframe
                  src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
              <div className="flex flex-wrap py-12 md:pb-0 lg:pt-0">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block text-xl rounded-md bg-primary-100 p-4">
                        <GrMapLocation />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className=" mb-2 font-bold">
                      Our Office Address
                      </p>
                      <p className="text-neutral-500">
                      Shop No 13 Krishna Geeta Building,Near Om Shanti Chowk,Phase 3 Indralok, Bhayandar East, Thane, Maharashtra 401105
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-primary-100 p-4 text-xl">
                        <IoMailOpenOutline />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">
                      General Enquiries
                      </p>
                      <p className="text-neutral-500">
                      aquasleri@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:mb-0 xl:w-6/12 xl:px-12">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-primary-100 p-4 text-xl">
                        <IoCallOutline /> 
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">Call Us</p>
                      <p className="text-neutral-500">
                      +91-9136666179
                      </p>
                      <p className="text-neutral-500">
                      022-65555179
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                        <FiClock />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">
                        Our Timing
                      </p>
                      <p className="text-neutral-500">
                      Mon : Closed
                      </p>
                      <p className="text-neutral-500">
                      Tue - Sun : 10:00 AM - 08:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
