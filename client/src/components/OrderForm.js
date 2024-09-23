import React, { useState } from "react";
import axios from "axios";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = e => {
    console.log("handleNameChange called with:", e.target.value);
    setName(e.target.value);
  };

  const handleEmailChange = e => {
    console.log("handleEmailChange called with:", e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit called with name:", name, "email:", email);
    axios
      .post("/api/order", { name, email })
      .then(response => {
        console.log("Axios response received:", response.data);
        setMessage(response.data.message);
        setName(""); // Очистка имени
        setEmail(""); // Очистка email
        console.log("Name and Email reset");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch(error => {
        console.error("Error placing order:", error);
      });
  };

  return (
    <div>
      <h2>Order Tickets</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            autoComplete="name"
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
            required
          />
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form>
      {message &&
        <p>
          {message}
        </p>}
    </div>
  );
};

export default OrderForm;
