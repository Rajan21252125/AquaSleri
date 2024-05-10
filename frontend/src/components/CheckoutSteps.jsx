/* eslint-disable react/prop-types */
import styles from "../styles/Styles";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center flex-wrap">
        <div className={`${styles.noramlFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>1.Shipping</span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[10px] md:w-[70px] h-[4px] bg-gray-800"
                : "w-[10px] md:w-[70px] h-[4px] bg-gray-500"
            }`}
          />
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 1
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-gray-500`
            }`}
          >
            <span
              className={`${
                active > 1
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-white`
              }`}
            >
              2.Payment
            </span>
          </div>
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 3
                ? "w-[10px] md:w-[70px] h-[4px] !bg-gray-500"
                : "w-[10px] md:w-[70px] h-[4px] bg-gray-500"
            }`}
          />
          <div
            className={`${
              active > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-gray-500`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-white`
              }`}
            >
              3.Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
