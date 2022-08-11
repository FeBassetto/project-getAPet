import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext'


//layouts
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Container from "./layouts/Container/Container";

//pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

//components
import Message from "./components/Message/Message";



const Routing = () => {
    return (
        <Router>
            <UserProvider>
                <Header />
                <Message />
                <Container>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/register' element={<Register />} />
                    </Routes>
                </Container>
                <Footer />
            </UserProvider>

        </Router>
    )
}

export default Routing