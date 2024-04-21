import React, {Component} from 'react';
import {Outlet, Link} from "react-router-dom";
import Footer from "./Footer";
import api, {isAuthenticated} from "../api/axios";


class Navbar extends Component {

    render() {
        return (
            <>
                <header>
                    <nav>
                        <Link to="/"><a href="">HOME</a></Link>
                        <a href="">BOOKS</a>
                        <a href="">MY BOOKS</a>
                        {isAuthenticated()}
                        {isAuthenticated() ? 'User' : <Link to="/login">LOGIN</Link>}
                    </nav>
                </header>
                <Outlet/>
                <Footer/>
            </>
        );
    }

}

export default Navbar;