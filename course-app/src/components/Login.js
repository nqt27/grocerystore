import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../App";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../static/login.css";
import Api, { authAxios, endpoints } from "../configs/Api";
import cookies from "react-cookies";

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [user, dispatch] = useContext(UserContext);
    const [err, setErr] = useState("");
    const nav = useNavigate();

    const login = async (event) => {
        event.preventDefault()

        try {
            let info = await Api.get(endpoints["oauth2-info"]);
            console.log(info)

            let res = await Api.post(endpoints["login"], {
                headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
                client_id: info.data.client_id,
                client_secret: info.data.client_secret,
                username: username,
                password: password,
                grant_type: "password",
            });
            console.log(res)

            cookies.save('access_token', res.data.access_token)
            const user = await authAxios().get(endpoints["current-user"]);
            cookies.save('current_user', user.data);
            console.log(user.data)

            dispatch({
                type: "login",
                payload: user.data,
            });
        } catch (error) {
            setErr("Sai tài khoản hoặc mật khẩu !!!!");
        }
    }

    if (user != null)
        return <Navigate to="/" />


    return (
        <Container>
            <Row style={{ with: "100vw", height: "100vh" }}>
                <Col
                    xs={6}
                    style={{
                        alignSelf: "center",
                        backgroundColor: "white",
                        minHeight: "50vw",
                        position: "relative",
                        margin: "auto"
                    }}
                >
                    <Container
                        style={{
                            width: "70%",
                            height: "50%",
                            alignSelf: "center",
                            marginTop: "10vh",
                        }}
                    >
                        <h2 className="text-center text-dark">Đăng Nhập</h2>
                        <div
                            className="nav-item me-auto"
                            style={{
                                textDecoration: "inherit",
                                color: "red",
                                padding: "10px",
                                textAlign: "center",
                                marginBottom: "5px",
                            }}
                        >
                            {err}
                        </div>
                        <Form onSubmit={login}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(evt) => setUsername(evt.target.value)}
                                    placeholder="Nhập tài khoản..."
                                    style={{ borderRadius: "20px" }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(evt) => setPassword(evt.target.value)}
                                    placeholder="Nhập mật khẩu..."
                                    style={{ borderRadius: "20px" }}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="Login-button">
                                Đăng nhập
                            </Button>
                        </Form>
                        <div
                            style={{
                                position: "absolute",
                                textAlign: "center",
                                width: "60%",
                                paddingTop: "10px",
                            }}
                        >
                            <p>Chưa có tài khoản?</p>
                            <Link to="/register" style={{ textDecoration: "none", fontWeight: "bold" }}>
                                ĐĂNG KÝ
                            </Link>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
