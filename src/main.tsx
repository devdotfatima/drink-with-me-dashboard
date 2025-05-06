import { BrowserRouter as Router, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./layout/App.tsx";
import Home from "./pages/home/index.tsx";
import Login from "./pages/Auth/login/index.tsx";
import { AuthProvider } from "./Providers/AuthProvider.tsx";
// import ProtectedRoute from "./pages/Auth/ProtectedRoute/index.tsx";
import { Users } from "./pages/Users/index.tsx";
import Events from "./pages/Events/index.tsx";
import Venues from "./pages/Venues/index.tsx";
import User from "./pages/Users/User/index.tsx";
import Promotions from "./pages/Deals/index";
import EventDetail from "./pages/Events/Event/index.tsx";
import Venue from "./pages/Venues/Venue/index.tsx";
import AddEditVenue from "./pages/Venues/Venue/AddEditVenue.tsx";
import AddEditEvent from "./pages/Events/Event/AddEditEvent.tsx";
import Bookings from "./pages/Bookings/index.tsx";
import Booking from "./pages/Bookings/Booking/index.tsx";
import Deals from "./pages/Deals/index";
import Policies from "./pages/Policies/index.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            element={
              // <ProtectedRoute>
                <App />
              // </ProtectedRoute>
            }
          >
            <Route index element={<Home />} path="/" />
           
            <Route index element={<Users />} path="/users" />
            <Route index element={<User />} path="/users/:id" />

            <Route index element={<Events />} path="/events" />
            <Route index element={<EventDetail />} path="/events/:id" />
            <Route path="/events/add" element={<AddEditEvent />} />
            <Route path="/events/edit/:id" element={<AddEditEvent />} />

            <Route index element={<Venues />} path="/venues" />
            <Route index element={<Venue />} path="/venues/:id" />
            <Route path="/venues/add" element={<AddEditVenue />} />
            <Route path="/venues/edit/:id" element={<AddEditVenue />} />


            <Route index element={<Bookings />} path="/bookings" />
            <Route index element={<Booking />} path="/bookings/:id" />


            <Route index element={<Deals />} path="/deals" />

            <Route index element={<Promotions />} path="/promotions" />
            <Route index element={<Policies />} path="/policies" />

            
          </Route>
          <Route index element={<Login />} path="/login" />
        </Routes>
      </Router>
    </AuthProvider>
  </QueryClientProvider>
);
