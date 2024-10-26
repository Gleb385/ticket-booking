import React, { useState } from "react";
import axios from "axios";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState([]); // Initialize tickets state
  const [order, setOrder] = useState(null); // State to store order information

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

    // Use the tickets state for the API request
    axios
      .post("/api/order", {
        tickets, // Pass the tickets array
        userInfo: { name, email, phone, address }
      })
      .then(response => {
        console.log("Axios response received:", response.data);
        setMessage(response.data.message);
        setOrder(response.data.order); // Store order information
        setName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setTickets([]); // Reset tickets state
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

      {/* Display order information */}
      {order &&
        <div>
          <h3>
            Order ID: {order._id}
          </h3>
          <ul>
            {order.tickets.map(ticket =>
              <li key={ticket._id}>
                Ticket ID: {ticket._id}
              </li>
            )}
          </ul>
        </div>}
    </div>
  );
};

export default OrderForm;
