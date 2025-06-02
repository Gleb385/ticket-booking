import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

import OrderForm from "./components/OrderForm";
import Home from "./components/home";
import Tickets from "./components/tickets";
import Order from "./components/order";
import OrdersList from "./components/OrdersList";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <FlightTakeoffIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Авиабилеты онлайн
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/tickets">
            Билеты
          </Button>
          <Button color="inherit" component={Link} to="/order">
            Заказ
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Мои заказы
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/orders" element={<OrdersList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
