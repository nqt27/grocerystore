import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserAlt } from "react-icons/fa";
import { UserContext } from './../App';
import cookies from 'react-cookies';
import { BsCartFill } from "react-icons/bs";
import Api, { endpoints } from "../configs/Api";

const getItemFormLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const Header = () => {
    const [kw, setKw] = useState()
    const [cart, setCart] = useState(getItemFormLocalStorage)
    const [categories, setCategories] = useState([])
    const [user, dispatch] = useContext(UserContext)

    const logout = (evt) => {
        evt.preventDefault()
        cookies.remove('access_token')
        cookies.remove('current_user')
        dispatch({ "type": "logout" })
    }

    useEffect(() => {
        const loadCategories = async () => {
            let res = await Api.get(endpoints['category'])
            setCategories(res.data)
        }

        loadCategories()
    }, [])

    const getCartTotal = () => {
        return cart.reduce(
            (sum, { quantity }) => sum + quantity,  
            0
        );
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])


    let btn = (
        <NavDropdown.Item href="/login">Đăng Nhập</NavDropdown.Item>
    );
    if (user != null)
        btn = (
            <>
                <NavDropdown.Item href="javascript:;">
                    <img className="review-avatar lazyloaded" src={user.avatar_path} alt="avatar" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                    {user.username}
                </NavDropdown.Item>
                <NavDropdown.Item href="javascript:;" onClick={logout} >Đăng Xuất</NavDropdown.Item>
            </>
        );
    return (
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#E0FFFF", color: "#000" }}>
            <div className="container">
                <Link to="#" className="navbar-brand" style={{ fontSize: "30px", fontWeight: "bold" }}>eSocial-Mart </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Trang Chủ</Nav.Link>
                        <NavDropdown title="Sản phẩm">
                            {categories.map((c) => {
                                const url = `/products/?category_id=${c.id}`
                                return <NavDropdown.Item href={url} >{c.name}</NavDropdown.Item>
                            })}

                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            name="kw" value={kw}
                            onChange={evt => setKw(evt.target.value)}
                            placeholder="Search"
                            className="mr-10"
                            aria-label="Search" />
                        <Button type="submit" variant="primary"> Tìm </Button>
                    </Form>
                </Navbar.Collapse>
                <Nav style={{ marginLeft: "20px" }}>
                    <NavDropdown title={<FaUserAlt />} id="basic-nav-dropdown">
                        {btn}
                    </NavDropdown>
                </Nav>
                <Nav style={{ marginLeft: "20px" }}>
                    <Nav.Link href="/cart"><BsCartFill /> ({getCartTotal()}) </Nav.Link>
                </Nav>
            </div>
        </Navbar>
    )
}

export default Header

