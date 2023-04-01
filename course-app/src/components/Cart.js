import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const getItemFormLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const Cart = () => {
    const [cart, setCart] = useState(getItemFormLocalStorage)
    const [user, dispatch] = useContext(UserContext)

    const getTotalSum = () => {
        return cart.reduce(
            (sum, { price, quantity }) => sum + price * quantity,
            0
        );
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    };

    const setQuantity = (product, amount) => {
        const newCart = [...cart];
        newCart.find(
            (item) => item.name === product.name
        ).quantity = amount;
        setCart(newCart);
    };

    const removeFromCart = (productToRemove) => {
        setCart(
            cart.filter((product) => product !== productToRemove)
        );
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])


    return (
        <>

            <div style={{
                margin: "20px auto",
                width: "80%",
            }}>
                {cart.length > 0 && (
                    <button onClick={clearCart}>Clear Cart</button>
                )}
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th colSpan={4}> Tên sản phẩm</th>
                            <th>Giá sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product, idx) => (
                            <tr key={idx}>
                                <td>
                                    <img className="active" src={product.image} style={{ maxWidth: "100%", height: "auto", objectFit: "cover", width: "60px" }} />
                                </td>
                                <td colSpan={3}>{product.name}</td>
                                <td>{product.price} VND</td>
                                <td style={{ width: "150px" }}>
                                    <input
                                        value={product.quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                product,
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                </td>
                                <td>{product.price * product.quantity} VND</td>
                                <td style={{ width: "50px" }}>
                                    <button onClick={() => removeFromCart(product)} >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div style={{
                    textAlign: "right"
                }}>
                    {user == null ?
                        <>
                            <p style={{
                                color: "red",
                                padding: "1rem 0",
                                fontSize: "1rem",
                                letterSpacing: "0.0625rem",
                                textDecoration: "none",

                            }} >Đăng nhập vào tài khoản trước khi đặt hàng !</p>
                            <Link to="/login" style={{
                                background: "#3e3e3f",
                                color: "#fff",
                                boder: "none",
                                padding: "1rem 1.5rem",
                                fontSize: "1rem",
                                textTransform: 'uppercase',
                                cursor: "pointer",
                                letterSpacing: "0.0625rem",
                                textDecoration: "none",

                            }}> ĐĂNG NHẬP</Link>
                        </> :
                        cart.length < 1 ? (<p style={{
                            color: "red",
                            padding: "1rem 0",
                            fontSize: "1rem",
                            letterSpacing: "0.0625rem",
                            textDecoration: "none",

                        }} >Bạn không có sản phẩm nào cần thanh toán</p>) :
                            <>
                                <p>Thành tiền: {getTotalSum()} VND</p>
                                <Link to="/payment" style={{
                                    background: "#3e3e3f",
                                    color: "#fff",
                                    boder: "none",
                                    padding: "1rem 1.5rem",
                                    fontSize: "1rem",
                                    textTransform: 'uppercase',
                                    cursor: "pointer",
                                    letterSpacing: "0.0625rem",
                                    textDecoration: "none",

                                }} >ĐẶT HÀNG</Link>
                            </>
                    }
                </div>
            </div >
        </>
    );
};

export default Cart;
