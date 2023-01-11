// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { Row, Col, Card, Image, Button, Form, ListGroup } from "react-bootstrap"
import Message from "../components/Message"
import { addToCart, removeFromCart } from "../actions/cartActions"

const CartScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const productId = id

  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart
  useEffect(() => {
    productId && dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping")
  }

  return (
    <Row>
      <Col md={8}>
        <h1>SHOPPING CART</h1>
        {cartItems.length === 0 ? (
          <div>
            <Message children="Your cart is empty." />
            <span>
              <Link to="/">Go Back</Link>
            </span>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>{item.name}</Col>
                  <Col md={2}>${item.price}</Col>
                  <Col className="qty-cart" md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn btn-dark w-100"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
