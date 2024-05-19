import Order from '../Schema/OrderSchems.js';

// Create new order
export const createOrder = async (req, res) => {
    const user = req.user.user.id
  try {
    const {
      shippingAddress,
      orderItems,
      paymentInfo,
      subTotalPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    if (!user) {
        return res.status(400).json({ status:false , msg: 'Please login to place an order' });
    }
    if (!shippingAddress || !orderItems || !paymentInfo || !subTotalPrice || !shippingAddress || !totalPrice ) {
        return res.status(400).json({ status:false , msg: 'Please fill in all fields' });
    }

    const order = new Order({
      user,
      shippingAddress,
      paymentInfo,
      subTotalPrice,
      shippingPrice,
      totalPrice,
      orderItems
    });

    await order.save();
    return res.status(200).json({ status: true , msg : 'Order Successfull'})
  } catch (error) {
    res.status(400).json({status:false , msg: error.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order to delivered
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
