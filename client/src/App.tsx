import React, {useEffect} from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./Components/PrivateRoute";
import Appointment from "./pages/Appointment";
import ShowAppointments from "pages/ShowAppointments";
import Admin from "pages/Admin";

function App() {
  // const [role , setRole] = React.useState<any>(localStorage.getItem("role"))

  // useEffect(()=>{
  //   setRole(localStorage.getItem("role"))
  // },[localStorage.getItem("role")])
  return (
    <div>
      <Navbar />

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/appointmentlist" element={<ShowAppointments />} />
          {/* {
            role == 1 &&  */}
          <Route path="/admin" element={<Admin />} />
          {/* } */}
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
