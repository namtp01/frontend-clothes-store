import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from '../../redux/actions/ProductActions'
import { Link, useParams } from 'react-router-dom'
import Loading from './../LoadingError/Loading'
import Message from './../LoadingError/Error'
import Categories from './Categories'
import Rating from './Rating'
import Pagination from './Pagination'

const ShopSection = (props) =>
{
  const { keyword, pagenumber, category } = props

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() =>
  {
    dispatch(listProduct(keyword, pagenumber, category))
  }, [dispatch, keyword, pagenumber, category])

  return (
    <>
      {/* <Slider /> */}

      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-flex w-100 h-100 position-relative" src="https://res.cloudinary.com/di6dc8jwa/image/upload/v1689742640/20230718_euGadtJO_rjbpf8.jpg" alt="First slide" />
            <div className="carousel-caption d-flex d-md-block">
              <h5 className="position-relative d-flex" style={{ color: "#FF6000" }}>Super Value Deals</h5>
              <p className="text-dark d-flex">On all products</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100 h-100" src="https://res.cloudinary.com/di6dc8jwa/image/upload/v1690798497/20230603_lKAvWiMj_x8qtae.jpg" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100 h-100" src="https://res.cloudinary.com/di6dc8jwa/image/upload/v1690798576/20230503_NYoZywA9_k9rpar.jpg" alt="Third slide" />
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <Categories />
      {/* <div className="banner-details"></div> */}
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {
                  loading ? (<div className="mb-5"><Loading /></div>) : error ? (<Message variant="alert-danger">{error}</Message>) :
                    (
                      <>
                        {products.map((product) => (
                          <div
                            className="shop col-lg-4 col-md-6 col-sm-6"
                            key={product._id}
                          >
                            <div className="border-product">
                              <Link to={`/products/${product._id}`}>
                                <div className="shopBack">
                                  <img src={product.image} alt={product.name} />
                                </div>
                              </Link>

                              <div className="shoptext">
                                <p>
                                  <Link to={`/products/${product._id}`}>
                                    {product.name}
                                  </Link>
                                </p>

                                <Rating
                                  value={product.rating}
                                  text={`${product.numReviews} reviews`}
                                />
                                <h3>${product.price}</h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )
                }
                {/* Pagination */}
                <Pagination pages={pages} page={page} keyword={keyword ? keyword : ""} category={category ? category : ""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopSection