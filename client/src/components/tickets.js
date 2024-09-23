import React, { useEffect, useState } from "react";
import axios from "axios";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tickets")
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map(ticket =>
          <li key={ticket.id}>
            {ticket.name}: ${ticket.price}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Tickets;
