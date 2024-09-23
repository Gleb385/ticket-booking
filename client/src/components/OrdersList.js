import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/order"); // Обратите внимание на правильный путь к API
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error("Received data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders List</h2>
      <ul>
        {orders.map(order =>
          <li key={order._id}>
            Order ID: {order._id} | Name:{" "}
            {order.userInfo ? order.userInfo.name : "No name"} | Email:{" "}
            {order.userInfo ? order.userInfo.email : "No email"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default OrdersList;
