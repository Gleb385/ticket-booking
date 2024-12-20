import React, { useState } from "react";
import axios from "axios";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
      .post("/api/order", {
        tickets: ["exampleTicketId"], // Используйте нужные данные билетов
        userInfo: { name, email, phone, address }
      })
      .then(response => {
        console.log("Axios response received:", response.data);
        setMessage(response.data.message);
        setName("");
        setEmail("");
        setAddress("");
        setPhone("");
        console.log("Form fields reset");
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
          Phone:
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
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
