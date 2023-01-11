import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Row, Col, Button, Image, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { prices } from "../actions/cartActions"
import { createOrder } from "../actions/orderActions"

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  //calculate Prices

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)

  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)

  useEffect(
    () => {
      dispatch(prices(itemsPrice, shippingPrice, taxPrice, totalPrice))

      if (success) {
        navigate(`/order/${order._id}`)
      }
    },
    // eslint-disable-next-line
    [
      dispatch,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      navigate,
      success,
    ]
  )

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.prices.itemsPrice,
        shippingPrice: cart.prices.shippingPrice,
        taxPrice: cart.prices.taxPrice,
        totalPrice: cart.prices.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Items</h4>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x {item.price} ={""} $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.prices.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.prices.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.prices.taxPrice}</Col>
                </Row>

                <Row>
                  <Col>Total</Col>
                  <Col>${cart.prices.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-dark w-100"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
