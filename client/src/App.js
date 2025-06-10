import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Импортируем Link
import OrderForm from "./components/OrderForm";
import Home from "./components/home";
import Tickets from "./components/tickets";
import Order from "./components/order";
import OrdersList from "./components/OrdersList";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Ticket Booking</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/orders" element={<OrdersList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
