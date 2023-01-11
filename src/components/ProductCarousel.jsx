import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import Loader from "./Loader"
import Message from "./Message"
import { listTopProducts } from "../actions/productActions"

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" variant="dark" className="product-carousel">
      {products.map((product) => (
        <Carousel.Item key={product._id} interval={2000}>
          <Link to={`/products/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              className="carousel-img d-flex  "
              fluid
            />
          </Link>
          <Carousel.Caption>
            <h3>
              {product.name} (${product.price})
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
