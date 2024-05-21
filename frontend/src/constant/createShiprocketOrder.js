import axios from 'axios';

const createShiprocketOrder = async (orderData) => {
  const token = import.meta.env.VITE_SHIPROCKET_ID
  console.log(orderData)


  const shiprocketOrderData = {
    order_id: orderData?._id,
    order_date: new Date().toISOString(),
    pickup_location: "Primary",
    channel_id: "",
    comment: "Your comment",
    billing_customer_name: orderData?.shippingAddress?.fullName,
    billing_last_name: "",
    billing_address: orderData?.shippingAddress?.address1,
    billing_address_2: orderData?.shippingAddress?.address2 || "",
    billing_city: orderData?.shippingAddress?.city,
    billing_pincode: orderData?.shippingAddress?.zipCode,
    billing_state: orderData?.shippingAddress?.state,
    billing_country: "India",
    billing_email: orderData?.shippingAddress?.email,
    billing_phone: orderData?.shippingAddress?.phoneNumber,
    shipping_is_billing: true,
    order_items: orderData?.orderItems.map(item => ({
      name: item.name,
      sku: item.product,
      units: item.quantity,
      selling_price: item.price,
      discount: "",
      tax: "",
      hsn: "",
    })),
    payment_method: orderData?.paymentInfo.method === "COD" ? "COD" : "Prepaid",
    shipping_charges: orderData?.shippingPrice,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: orderData?.subTotalPrice,
    length: 10,
    breadth: 15,
    height: 20,
    weight: 2.5
  };

  try {
    const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', shiprocketOrderData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Shiprocket Order Response:', response.data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating Shiprocket order:', error);
    throw error;
  }
};



export default createShiprocketOrder;
