import "../static/details.css";
import "../static/comment.css";
import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { UserContext } from "../App";
import Api, { endpoints, authAxios } from '../configs/Api'

const getItemFormLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");


function Detail() {
    const [product, setProduct] = useState([])
    const [cart, setCart] = useState(getItemFormLocalStorage)
    const { productId } = useParams()

    const [comments, setComments] = useState([])
    const [content, setContent] = useState()
    const [user, dispatch] = useContext(UserContext)
    const nav = useNavigate()

    useEffect(() => {
        const loadProduct = async () => {
            const res = await Api.get(endpoints['product-detail'](productId))
            setProduct(res.data)
        }

        loadProduct()
    }, [productId])

    const addToCart = (product) => {
        let newCart = [...cart];
        let itemInCart = newCart.find(
            (item) => product.name === item.name
        );
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            itemInCart = {
                ...product,
                quantity: 1,
            };
            newCart.push(itemInCart);
        }
        setCart(newCart);
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    useEffect(() => {
        const loadComments = async () => {
            const res = await authAxios().get(endpoints['product-comments'](productId))
            setComments(res.data)
        }
        loadComments()
    }, [productId])

    const addComment = async (evt) => {
        evt.preventDefault()

        const resComment = await authAxios().post(endpoints['comments'], {
            content: content,
            product: productId,
            user: user.id,
        });
        setComments([...comments, resComment.data]);
    }

    return (
        <Container>
            <div className="grid product d-flex">
                <div className="column-xs-12">
                    <img className="active" src={product.image} style={{ maxWidth: "100%", height: "auto", objectFit: "cover", width: "400px" }} />
                </div>
                <div className="column-xs-12">
                    <h1 style={{ fontWeight: "bold" }}>{product.name}</h1>
                    <h2>{product.price} VND</h2>
                    <p>Giới thiệu: {product.description}</p>
                    <hr />
                    <div className="section form-group" style={{ paddingBottom: '20px' }}>
                        <label style={{ marginBottom: '10px' }}><strong>Quantity: </strong></label>
                        <div className="d-flex">
                            <input defaultValue="&#10134;" className="form-control" />
                            <input type="text" defaultValue={1} className="form-control quantity" />
                            <input defaultValue="&#10133;" className=" form-control" />
                        </div>
                    </div>

                    <button className="add-to-cart" onClick={() => addToCart(product)} >Thêm vào giỏ hàng</button>
                </div>
            </div><hr />

            <div style={{
                margin: "10px auto",
                borderRadius: "10px",
                boxShadow: "4px 4px 20px 1px hsl(0deg 0% 55% / 40%)",
                padding: "24px",
            }}>
                <p style={{
                    color: "#3e3e3f",
                    padding: "1rem 0",
                    fontSize: "1rem",
                    letterSpacing: "0.0625rem",
                }}>ĐÁNH GIÁ SẢN PHẨM: </p>

                {content == null ?
                    (
                        <p style={{
                            color: "#3e3e3f",
                            fontSize: "1rem",
                            letterSpacing: "0.0625rem",
                        }}> Vui lòng nhập đánh giá về sản phẩm! </p>
                    )
                    :
                    (" ")
                }

                <Form.Group style={{ borderRadius: "10px", marginBottom: "24px" }}>
                    <Form.Label style={{
                        color: "#3e3e3f",
                        fontSize: "1rem",
                        letterSpacing: "0.0625rem",
                        textDecoration: "none",
                    }}>Nhập đánh giá của bạn:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={content} onChange={(evt) => setContent(evt.target.value)} />
                </Form.Group>
                <Button type="submit" style={{
                    background: "#3e3e3f",
                    color: "#fff",
                    boder: "none",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    textTransform: 'uppercase',
                    cursor: "pointer",
                    letterSpacing: "0.0625rem",
                }}
                    onClick={addComment}
                >
                    Gửi
                </Button>

                {/* Hiện comment */}

                {comments.map(c => 
                    (
                        <div className="items">
                            <div className="ixChPW review-item-container ">
                                <div className="review-item">
                                    <div className="review-section header">
                                        <img className="review-avatar lazyloaded" src={c.user.avatar_path} alt="review-avatar" width="40" height="40" />
                                        <div className="review-title">
                                            <p className="gbHaVL name color--darkness"> {c.user.first_name} {c.user.last_name} </p>
                                        </div>
                                    </div>
                                    <div className="review-section body">
                                        <p className="base__Body02-sc-1tvbuqk-16 ewOEQO comment color--dark" style={{ textAlign: "left" }}>{c.content}</p>
                                    </div>
                                    <div className="review-section footer" style={{ marginTop: "0" }}>
                                        <p className="base__Caption-sc-1tvbuqk-18 gJvXJw rated-date color--light-disable">Đăng ngày {c.created_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </Container >
    )
}
export default Detail;