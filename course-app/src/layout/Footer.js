import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
    return (
        <>
            <div
                style={{
                    backgroundColor: "#E0FFFF",
                    margin: "auto",
                    width: "100%",
                }}
            >
                <div className="footer-copyright text-center py-3">
                    <Container fluid>
                        <h1 style={{ fontWeight: "bold" }}>eSocial-Mart </h1>
                        &copy; {new Date().getFullYear()} Copyright:{" "}
                        <a href="/"> eSocialMart.com</a>
                    </Container>
                </div>
            </div>
        </>
    )
}
export default Footer
