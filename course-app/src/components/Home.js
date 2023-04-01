import React, { useState, useEffect } from "react";
import { Button, Card, Carousel, Col, Form, Nav, Row } from "react-bootstrap";
import { MdMail, MdFastfood } from "react-icons/md";
import { BsFillCartFill, BsFillGeoAltFill, BsFillTelephoneFill, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BiStoreAlt } from "react-icons/bi";
import Api, { endpoints } from '../configs/Api'
import Products from "./Products";

function Home() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const loadProduct = async () => {
            const res = await Api.get(endpoints['product'])
            setProduct(res.data)
        }
        loadProduct()  
    }, [])
 
    return (
        <>
            <Nav className="d-flex" style={{ justifyContent: "center", backgroundColor: "DodgerBlue" }}>
                <Nav.Link href="#home" style={{ color: "#FFF", fontWeight: "bold" }}>
                    Tin tức
                </Nav.Link>
                <Nav.Link href="#home" style={{ color: "#FFF", fontWeight: "bold" }}>
                    Tuyển dụng
                </Nav.Link>
                <Nav.Link href="#home" style={{ color: "#FFF", fontWeight: "bold" }}>
                    Liên hệ
                </Nav.Link>
                <Nav.Link href="#home" style={{ color: "#FFF", fontWeight: "bold" }}>
                    Về chúng tôi
                </Nav.Link>
            </Nav>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://atpmedia.vn/wp-content/uploads/2021/06/img_60c702f22fd1c.png"
                        alt="First slide"
                        height="500px"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://atpmedia.vn/wp-content/uploads/2021/06/img_60c702f22fd1c.png"
                        alt="Second slide"
                        height="500px"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://atpmedia.vn/wp-content/uploads/2021/06/img_60c702f22fd1c.png"
                        alt="Third slide"
                        height="500px"
                    />
                </Carousel.Item>
            </Carousel>
            <div className=" text-text-dark text-center" style={{
                margin: "10px auto",
                borderRadius: "10px",
                boxShadow: "4px 4px 20px 1px hsl(0deg 0% 55% / 40%)",
                padding: "24px",
            }}>
                <p style={{ fontSize: "100px" }}><MdFastfood /></p>
                <h2 style={{ fontWeight: "bold" }}>Thức ăn - Nước uống</h2>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://printgo.vn/uploads/media/792227/banner-quang-cao-tra-sua-9_1623309814.jpg"
                            alt="First slide"
                            height="500px"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.saokim.com.vn/storage/2019/01/Mau-thiet-ke-banner-nuoc-giai-khat-Tan-Do.jpg"
                            alt="Second slide"
                            height="500px"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://media.istockphoto.com/vectors/refreshing-soft-drink-banner-ads-vector-id1145763223"
                            alt="Third slide"
                            height="500px"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className=" text-text-dark text-center" style={{
                margin: "10px auto",
                borderRadius: "10px",
                boxShadow: "4px 4px 20px 1px hsl(0deg 0% 55% / 40%)",
                padding: "24px",
            }}>
                <p style={{ fontSize: "100px" }}> <BiStoreAlt /> </p>
                <h2 style={{ fontWeight: "bold" }}>Sản phẩm - Dịch vụ</h2>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://printgo.vn/uploads/media/792227/banner-quang-cao-tra-sua-9_1623309814.jpg"
                            alt="First slide"
                            height="500px"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.saokim.com.vn/storage/2019/01/Mau-thiet-ke-banner-nuoc-giai-khat-Tan-Do.jpg"
                            alt="Second slide"
                            height="500px"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://media.istockphoto.com/vectors/refreshing-soft-drink-banner-ads-vector-id1145763223"
                            alt="Third slide"
                            height="500px"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            <Products />

            <div style={{
                margin: "10px auto",
                borderRadius: "10px",
                boxShadow: "4px 4px 20px 1px hsl(0deg 0% 55% / 40%)",
                padding: "24px",
                backgroundColor: "DodgerBlue",
                color: "#FFF"
            }}>
                <Row className=" text-text-dark text-center">
                    <h2 style={{ fontWeight: "bold" }}>Liên Hệ</h2>
                    <p>Nếu bạn có bất kỳ thắc mắc nào, hãy gởi ngay về cho chúng tôi</p>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Địa chỉ Email</Form.Label>
                                <Form.Control type="email" placeholder="" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Câu hỏi của bạn:</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button variant="danger" type="submit" style={{ width: "100px" }}>
                                Gửi
                            </Button>
                        </Form>
                    </Col>
                    <Col className=" text-text-dark " >
                        <Nav className="flex-column">
                            <Nav.Link href="#home" style={{ color: "#FFF" }}>
                                <MdMail /> esocialmart@gmail.com
                            </Nav.Link>
                            <Nav.Link href="#home" style={{ color: "#FFF" }}>
                                <BsFillTelephoneFill /> 0123456789
                            </Nav.Link>
                            <Nav.Link href="#home" style={{ color: "#FFF" }}>
                                <BsFillGeoAltFill /> 371 Nguyễn Kiệm, phường 3, Gò Vấp, Thành phố Hồ Chí Minh
                            </Nav.Link>
                        </Nav>
                        <hr />
                        <Nav>
                            <Nav.Link href="https://www.facebook.com/profile.php?id=100010378384508" style={{ color: "#FFF" }}>
                                <BsFacebook /> </Nav.Link>
                            <Nav.Link href="#home">
                                <FcGoogle />
                            </Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Home;