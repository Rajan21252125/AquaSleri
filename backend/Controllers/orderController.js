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
    return res.status(200).json({ status: true , msg : 'Order Successfull' , order})
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

// Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const orders = await Order.find({ user: userId });
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({ message: 'No orders found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update order status
export const updateOrderStatus = async (req, res) => {
  const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      const { status } = req.body;
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided' });
      }
      
      order.orderStatus = status;
      if (status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      
      const updatedOrder = await order.save();
      res.json({status : 201 , msg : "Successfully Updated"});
    } else {
      res.status(404).json({ msg: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
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




// Get order by ID and check ownership
export const getOrderByProductId = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (order.user.toString() === req.user.user.id) {
        res.json(order);
      } else {
        res.status(403).json({ msg: 'You are not authorized to view this order' });
      }
    } else {
      res.status(404).json({ msg: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};




// add order id and shipment id 
export const addOrderShipmentId = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      console.log(data)
      order.shipment_id = data.shipment_id;
      order.order_id = data.order_id;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ msg: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};