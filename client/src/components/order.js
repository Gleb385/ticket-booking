import React, { useState } from "react";
import axios from "axios";

function Order() {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/order", {
        // Убедитесь, что URL правильный
        name: userInfo.name,
        email: userInfo.email
      })
      .then(response => {
        setMessage(response.data.message);
        // Очистка полей после успешного отправления
        setUserInfo({ name: "", email: "" });
      })
      .catch(error => {
        console.error("Error placing order:", error);
      });
  };

  return (
    <div>
      <h2>Order Tickets</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">Place Order</button>
      </form>
      {message &&
        <p>
          {message}
        </p>}
    </div>
  );
}

export default Order;
