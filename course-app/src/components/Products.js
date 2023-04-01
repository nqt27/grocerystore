import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Nav, Row } from 'react-bootstrap';
import Api, { endpoints } from '../configs/Api';
import { Pagination } from "react-bootstrap";
import { BsFillCartFill, BsInputCursorText } from 'react-icons/bs';
import { useParams, useSearchParams } from "react-router-dom";

const getItemFormLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]"); 

const Products = () => {
    const [product, setProduct] = useState([])
    const [cart, setCart] = useState(getItemFormLocalStorage)
    const [q] = useSearchParams() 

    useEffect(() => {
        const loadProduct = async () => {
            let query = ""
            let cateId = q.get("category_id")

            if (cateId !== null)
                query = `category_id=${cateId}`

            const kw = q.get("kw")
            if (kw !== null)
                query = `kw=${kw}`
            
            const res = await Api.get(`${endpoints['product']}?${query}`)
            setProduct(res.data)
        }
        loadProduct()
    }, [])

    // const getCartTotal = () => {
    //     return cart.reduce(
    //         (sum, { quantity }) => sum + quantity,  
    //         0
    //     );
    // }

    // useEffect(() => {
    //     console.log(getCartTotal())
    //     localStorage.setItem("cart", JSON.stringify(cart));
    // }, [cart])

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

    function Items({ currentItems }) {
        return (
            <>
                <div className=" text-text-dark text-center" style={{
                    margin: "10px auto",
                    borderRadius: "10px",
                    boxShadow: "4px 4px 20px 1px hsl(0deg 0% 55% / 40%)",
                    padding: "24px",
                }}>

                    <Row md={4} xs={12} style={{ margin: "10px" }}>
                        {currentItems && currentItems.map((item) => (
                            <Col>
                                <Card style={{ height: "500px", marginBottom: "20px" }}>
                                    <Card.Img variant="top" src={item.image} style={{ height: "300px", padding: "5px" }} />
                                    <Card.Body>
                                        <Card.Link href={`/product/${item.id}/`} style={{ fontSize: "24px", fontWeight: "bold", textDecoration: "none" }}>{item.name}</Card.Link>
                                        <Card.Text>{item.price} VND</Card.Text>
                                    </Card.Body>
                                    <Card.Footer style={{ background: "#fff" }}>
                                        <Button variant="danger" style={{ width: "100%", bottom: "0" }} onClick={() => addToCart(item)}><BsFillCartFill /> Thêm vào giỏ hàng </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </>
       )
    }
    function Paginate(props) {
        const page = []

        for (var i = 0; i < props.pageCount; i++) {
            page.push(i)
        }
        return (
            <Pagination style={{ marginTop: "10px", margin: "auto" }}>
                <Pagination.First onClick={() => props.onPageChange(0)} />
                {page.map(p => (
                    <Pagination.Item onClick={() => props.onPageChange(p)}>{p + 1}</Pagination.Item>
                ))}
                <Pagination.Last onClick={() => props.onPageChange(props.pageCount - 1)} />
            </Pagination>
        )
    }

    function PaginatedItems({ itemsPerPage }) {
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(product.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(product.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        const handlePageClick = (value) => {
            const newOffset = value * itemsPerPage % product.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} />
                {product.length > itemsPerPage ?
                    <Paginate pageCount={pageCount} onPageChange={handlePageClick} pageRangeDisplayed={5} itemOffset={itemOffset} />
                    : ''}
            </>
        )
    }
    return <PaginatedItems itemsPerPage={8}/>
}
export default Products;