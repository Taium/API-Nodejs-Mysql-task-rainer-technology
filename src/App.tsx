import React from 'react';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './Components/PrivateRoute';
import Appointment from './pages/Appointment';
import ShowAppointments from 'pages/ShowAppointments';


function App() {
  return (
    <div >
      
      
       
        <Navbar />

                <Routes>
                <Route  path="/" element={<PrivateRoute />}>
                    <Route index element={<Home />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/appointmentlist" element={<ShowAppointments />} />

                </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    </Routes>

        
      
    
    </div>
  );
}

export default App;
