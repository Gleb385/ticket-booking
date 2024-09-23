import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <ul>
        <li>
          <Link to="/tickets">View Tickets</Link>
        </li>
        <li>
          <Link to="/order">Order Tickets</Link>
        </li>
        <li>
          <Link to="/orders">View Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
