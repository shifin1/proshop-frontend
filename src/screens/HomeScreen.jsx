import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Product from "../components/Product"
import { Row, Col } from "react-bootstrap"
import { listProducts } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"
import Meta from "../components/Meta"

const Homescreen = () => {
  const { keyword, pageNumber } = useParams()
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products, loading, error, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <div className="carousel-container">
        {!keyword && <ProductCarousel />}
      </div>
      {keyword && (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  )
}

export default Homescreen
